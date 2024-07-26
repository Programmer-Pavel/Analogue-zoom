import { useSocketIo } from '@shared/hooks'
import { useEffect, useState } from 'react'
import { filesToObjectUrl } from '../lib'

export function useGetMessages(choosedUserId: number | null) {
  const [allMessages, setAllMessages] = useState<any>([])

  const { socketConnection } = useSocketIo()

  useEffect(() => {
    socketConnection?.emit('getMessages', choosedUserId)

    function onGetMessages(messagesFromServer: any) {
      const messagesWithFilesUrl = messagesFromServer.map((el: any) => {
        if (el.files) {
          const copyMessage = { ...el }
          filesToObjectUrl(copyMessage)
          return copyMessage
        }
        return el
      })
      setAllMessages(messagesWithFilesUrl)
    }

    function onGetNewMessage(newMessage: any) {
      if (
        choosedUserId === newMessage.toUserId
        || choosedUserId === newMessage.userId
      ) {
        const copyMessage = { ...newMessage }

        if (newMessage.files)
          filesToObjectUrl(copyMessage)

        setAllMessages((lastState: any) => [...lastState, copyMessage])
      }
    }

    socketConnection?.on('messages', onGetMessages)

    socketConnection?.on('newMessage', onGetNewMessage)

    return () => {
      socketConnection?.off('messages', onGetMessages)
      socketConnection?.off('newMessage', onGetNewMessage)
    }
  }, [choosedUserId])

  return { allMessages }
}
