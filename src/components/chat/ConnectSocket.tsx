
import React, { useState, useEffect } from "react"
import { ChatTest } from "./ChatTest"
import { UsersList } from "./users-list/UsersList"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useSocketIo } from "../../hooks/useSocketIo"

export const ConnectSocket = () => {
  const { socketConnection }  = useSocketIo()

  const [isConnected, setIsConnected] = useState(socketConnection.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socketConnection.on('connect', onConnect)
    socketConnection.on('disconnect', onDisconnect)

    return () => {
      socketConnection.off('connect', onConnect)
      socketConnection.off('disconnect', onDisconnect)
    }
  }, [])

  const onConnectChat = () => {
    socketConnection.connect()
  }

  return (
    <Box height='100%'>
      {
        isConnected 
        ? <UsersList />
        : <Box
            display="flex"
            alignItems='center'
            justifyContent='center'
            height='100%'
          >
            <Button variant="contained" onClick={onConnectChat}>
              Подключиться к чату
            </Button>
        </Box>
      }
      <div>
        is connected:
        {isConnected ? 'true' : 'false'}
      </div>
      <br />
      <br />

      <ChatTest />
    </Box>
  )
}