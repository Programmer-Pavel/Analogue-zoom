import { Socket, io } from "socket.io-client";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

// "undefined" means the URL will be computed from the `window.location` object
const URL
// eslint-disable-next-line node/prefer-global/process
  = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

let socketConnection: Socket | undefined

export const useSocketIo = () => {
  const { token } = useAuth();

  const [isConnected, setIsConnected] = useState(socketConnection?.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socketConnection?.on('connect', onConnect)
    socketConnection?.on('disconnect', onDisconnect)

    return () => {
      socketConnection?.off('connect', onConnect)
      socketConnection?.off('disconnect', onDisconnect)
    }
  }, [])

  useEffect(() => {
    if(token && !socketConnection) {
        socketConnection = io(URL as any, {
            // autoConnect: false,
            withCredentials: true,
            auth: {
               token: token
            }
        })
    }
  }, [token])
  
  return {
    socketConnection,
    isConnected
  };
};