
import React, { useState, useEffect } from "react"
import { socket } from "../../../socket"
import { ChatTest } from "./ChatTest"
import { UsersList } from "./users-list/UsersList"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

export const ConnectSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const onConnectChat = () => {
    socket.connect()
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
      {/* <div>
        is connected:
        {isConnected ? 'true' : 'false'}
      </div>
      <button onClick={() => socket.connect()}>connect</button>
      <button onClick={() => socket.disconnect()}>disconnect</button>
      <br />
      <br />

      <ChatTest /> */}
    </Box>
  )
}