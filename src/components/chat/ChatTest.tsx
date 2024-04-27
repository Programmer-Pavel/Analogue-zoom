import React, { useEffect, useState } from 'react'
import { socket } from '../../../socket'

export const ChatTest = () => {
    const [sendMessageInputValue, setSendMessageInputValue] = useState('')
    const [allMessages, setAllMessages] = useState([])

    useEffect(() => {
        function onGetMessages(messagesFromServer: any) {
            setAllMessages(messagesFromServer);
        }
  
        socket.on('messages', onGetMessages);
      
        return () => {
            socket.off('messages', onGetMessages);
        };
    }, [])

    const onSendMessageInputChange = (e: any) => {
        setSendMessageInputValue(e.target.value)
    }

    const onSendMessageInput = () => {
        socket.emit('userMessageSend', sendMessageInputValue)
        setSendMessageInputValue('')
    }

    return <div style={{ marginLeft: '10px' }}>
        {
            allMessages.map((el: any, index: number) => (
                <div key={index}> { socket.id === el.id ? 'I' : `user ${el.id}`}: {el.message}</div>
            ))
        }
        <div>
            <input value={sendMessageInputValue} onChange={onSendMessageInputChange}/>
            <button style={{ width: '100px', marginTop: '15px' }} onClick={onSendMessageInput}>send</button>
        </div>
    </div>
}