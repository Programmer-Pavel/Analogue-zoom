import React, { useEffect, useState } from 'react'
import { useSocketIo } from '../../hooks/useSocketIo'

export const ChatTest = () => {
    const [sendMessageInputValue, setSendMessageInputValue] = useState('')
    const [allMessages, setAllMessages] = useState([])

    const { socketConnection }  = useSocketIo()

    useEffect(() => {
        function onGetMessages(messagesFromServer: any) {
            setAllMessages(messagesFromServer);
        }
  
        socketConnection.on('messages', onGetMessages);
      
        return () => {
            socketConnection.off('messages', onGetMessages);
        };
    }, [])

    const onSendMessageInputChange = (e: any) => {
        setSendMessageInputValue(e.target.value)
    }

    const onSendMessageInput = () => {
        socketConnection.emit('userMessageSend', sendMessageInputValue)
        setSendMessageInputValue('')
    }

    return <div style={{ marginLeft: '10px' }}>
        {
            allMessages.map((el: any, index: number) => (
                <div key={index}> { socketConnection.id === el.id ? 'I' : `user ${el.id}`}: {el.message}</div>
            ))
        }
        <div>
            <input value={sendMessageInputValue} onChange={onSendMessageInputChange}/>
            <button style={{ width: '100px', marginTop: '15px' }} onClick={onSendMessageInput}>send</button>
        </div>
    </div>
}