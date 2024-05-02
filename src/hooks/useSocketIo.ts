import { Socket, io } from "socket.io-client";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

// "undefined" means the URL will be computed from the `window.location` object
const URL
// eslint-disable-next-line node/prefer-global/process
  = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

let socketConnection: Socket

export const useSocketIo = () => {
  const { token } = useAuth();

  useEffect(() => {
    if(token && !socketConnection) {
        socketConnection = io(URL as any, {
            autoConnect: false,
            withCredentials: true,
            auth: {
               token: token
            }
        })
    }
  }, [])
  
  return {
    socketConnection
  };
};