
import React, { useState, useEffect } from "react"
import { Chat } from "./Chat"
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
        ? <Chat />
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
    </Box>
  )
}