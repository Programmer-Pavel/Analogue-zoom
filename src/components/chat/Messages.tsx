import React, { useEffect, useState } from 'react'
import { useSocketIo } from '../../hooks/useSocketIo'
import { useAuth } from '../../hooks/useAuth'

export const Messages = ({ choosedUserId }: { choosedUserId: number | null }) => {
    const [sendMessageInputValue, setSendMessageInputValue] = useState('')
    const [allMessages, setAllMessages] = useState<any>([])

    const { socketConnection }  = useSocketIo()
    const { infoFromToken } = useAuth()

    useEffect(() => {
        socketConnection.emit("getMessages", choosedUserId);

        function onGetMessages(messagesFromServer: any) {
            setAllMessages(messagesFromServer);
        }

        function onGetNewMessage(newMessage: any) {
            if(choosedUserId === newMessage.toUserId || choosedUserId === newMessage.userId)
                setAllMessages((lastState: any) => [...lastState, newMessage]);
        }
  
        socketConnection.on('messages', onGetMessages);
  
        socketConnection.on('newMessage', onGetNewMessage);

        return () => {
            socketConnection.off('messages', onGetMessages);
            socketConnection.off('newMessage', onGetNewMessage);
        };
    }, [choosedUserId])

    const onSendMessageInputChange = (e: any) => {
        setSendMessageInputValue(e.target.value)
    }

    const onSendMessageInput = () => {
        socketConnection.emit('userMessageSend', {
           message: sendMessageInputValue,
           toUserId: choosedUserId
        })
        setSendMessageInputValue('')
    }

    return <div style={{ marginLeft: '10px' }}>
        {
            allMessages.map((el: any, index: number) => (
                <div key={index}> { infoFromToken.userId === el.userId ? 'I' : `user ${el.userId}` }: {el.message}</div>
            ))
        }
        <div>
            <input value={sendMessageInputValue} onChange={onSendMessageInputChange}/>
            <button style={{ width: '100px', marginTop: '15px' }} onClick={onSendMessageInput}>send</button>
        </div>
    </div>
}