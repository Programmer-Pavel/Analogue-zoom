import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { styled } from '@mui/material/styles'
import { useAuth } from '../../hooks/useAuth'
import { useSocketIo } from '../../hooks/useSocketIo'
import { ChoosedFilesModalShow } from './ChoosedFilesModal'
import { TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';

const filesToObjectUrl = (copyMessage: any) => {
  const fileUrls = copyMessage.files?.map((el: any) => {
    const blob = new Blob([el], { type: 'application/octet-stream' });
    const fileUrl = URL.createObjectURL(blob);
    return fileUrl
  })

  copyMessage["fileUrls"] = fileUrls
}

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export function Messages({
  choosedUserId,
}: {
  choosedUserId: number | null
}) {
  const [sendMessageInputValue, setSendMessageInputValue]
    = useState<string>('')
  const [allMessages, setAllMessages] = useState<any>([])
  const [choosedFilesModalShow, setChoosedFilesModalShow] = useState<boolean>(false)
  const [file, setFile] = useState<any>()

  const { socketConnection } = useSocketIo()
  const { infoFromToken } = useAuth()

  const fileUploadRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    socketConnection?.emit('getMessages', choosedUserId)

    function onGetMessages(messagesFromServer: any) {
      const messagesWithFilesUrl = messagesFromServer.map((el: any) => {
        if(el.files) {
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

        if(newMessage.files) {
          filesToObjectUrl(copyMessage)
        }
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

  const onSendMessageInputChange = (e: any) => {
    setSendMessageInputValue(e.target.value)
  }

  const handleCloseChoosedFilesModal = () => {
    setChoosedFilesModalShow(false)
    if (fileUploadRef.current)
      fileUploadRef.current.value = ''
  }

  const onSendMessageInput = () => {
    if (sendMessageInputValue) {
      socketConnection?.emit('userMessageSend', {
        message: sendMessageInputValue,
        toUserId: choosedUserId,
      })
    }
    setSendMessageInputValue('')
  }

  const uploadFile = (e: any) => {
    if (e.target.files.length) {
      setChoosedFilesModalShow(true)
      const uploadedfile = e.target.files[0]
      const imageUrl = URL.createObjectURL(uploadedfile)
      const file = {
        src: imageUrl,
        name: uploadedfile.name,
        type: uploadedfile.type,
        file: uploadedfile,
        toUserId: choosedUserId,
      }
      setFile(file)
    }
  }

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" gap="5px" overflow='auto' pr='10px'>
        {allMessages.map((el: any, index: number) => {
          const isMe = infoFromToken.userId === el.userId
          return (
            <Box
              key={index}
              display="flex"
              justifyContent={isMe ? 'flex-end' : 'flex-start'}
            >
              <Box
                border="1px solid black"
                borderRadius={isMe ? '4% 4% 0% 4%' : '4% 4% 4% 0%'}
                p="10px"
                bgcolor={isMe ? '#ACE1AF' : '#B2FFFF'}
              >
                {isMe ? 'I' : `user ${el.userId}`}
                :
                <Box display='flex' gap='8px' mb='4px'>
                  { 
                    el.fileUrls?.map((el: any) => (
                       <Avatar key={el} sx={{ width: 200, height: 200 }} variant="rounded" src={el} />
                    ))
                  }
                </Box>
                <Typography variant="body1" gutterBottom ml='5px'>
                  {el.message}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
      <Box display="flex" gap="5px" mt="10px">
        <TextField
          autoComplete=""
          fullWidth
          variant="outlined"
          placeholder="write a message..."
          value={sendMessageInputValue}
          onChange={onSendMessageInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  size="large"
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                >
                  <AttachFileIcon />
                  <VisuallyHiddenInput
                    ref={fileUploadRef}
                    type="file"
                    onChange={uploadFile}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          sx={{ width: '150px' }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onSendMessageInput}
        >
          Send
        </Button>
      </Box>

      {choosedFilesModalShow && (
        <ChoosedFilesModalShow
          handleCloseChoosedFilesModal={handleCloseChoosedFilesModal}
          choosedFilesModalShow={choosedFilesModalShow}
          file={file}
          choosedUserId={choosedUserId}
        />
      )}
    </Box>
  )
}
