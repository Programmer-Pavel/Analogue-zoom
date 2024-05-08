import React, { useEffect, useState } from 'react'
import { useSocketIo } from '../../hooks/useSocketIo'
import { useAuth } from '../../hooks/useAuth'
import Box from '@mui/material/Box'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export const Messages = ({ choosedUserId }: { choosedUserId: number | null }) => {
    const [sendMessageInputValue, setSendMessageInputValue] = useState('')
    const [allMessages, setAllMessages] = useState<any>([])

    const { socketConnection }  = useSocketIo()
    const { infoFromToken } = useAuth()

    useEffect(() => {
        socketConnection?.emit("getMessages", choosedUserId);

        function onGetMessages(messagesFromServer: any) {
            setAllMessages(messagesFromServer);
        }

        function onGetNewMessage(newMessage: any) {
            if(choosedUserId === newMessage.toUserId || choosedUserId === newMessage.userId)
                setAllMessages((lastState: any) => [...lastState, newMessage]);
        }
  
        socketConnection?.on('messages', onGetMessages);
  
        socketConnection?.on('newMessage', onGetNewMessage);

        return () => {
            socketConnection?.off('messages', onGetMessages);
            socketConnection?.off('newMessage', onGetNewMessage);
        };
    }, [choosedUserId])

    const onSendMessageInputChange = (e: any) => {
        console
        setSendMessageInputValue(e.target.value)
    }

    const onSendMessageInput = () => {
        if(sendMessageInputValue) {
            socketConnection?.emit('userMessageSend', {
                message: sendMessageInputValue,
                toUserId: choosedUserId
            })
        }
        setSendMessageInputValue('')
    }

    const uploadFile = (e: any) => {
        socketConnection?.emit("uploadFile", {
            fileName: e.target.files[0].name,
            file: e.target.files[0]
        });
    }

    return (
        <Box
            height='100%'
            display='flex' 
            flexDirection='column' 
            justifyContent='space-between'
        >
            <Box display='flex' flexDirection='column' gap='5px'>
                {
                    allMessages.map((el: any, index: number) => {
                        const isMe = infoFromToken.userId === el.userId
                        return (
                            <Box 
                                key={index} 
                                display='flex' 
                                justifyContent={ isMe ? 'flex-end' : 'flex-start' }
                            >
                                <Box 
                                    border='1px solid black' 
                                    borderRadius={ isMe ? '10% 10% 0% 10%' : '10% 10% 10% 0%' }
                                    p='5px'
                                    bgcolor={ isMe ? '#ACE1AF' : '#B2FFFF'}
                                >
                                    { isMe ? 'I' : `user ${el.userId}` }: { el.message }
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
            <Box display='flex' gap='5px' mt='10px'>
                <TextField
                    autoComplete=''
                    fullWidth 
                    variant="outlined" 
                    placeholder='write a message...' 
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
                                    <VisuallyHiddenInput type="file" onChange={uploadFile}/>
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
        </Box>
    )
}