import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext(null)

const socket = io('http://localhost:5000')

function ContextProvider({ children }) {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        myVideo.current?.srcObject = currentStream
      })

    socket.on('me', id => setMe(id))

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({
        isReceivedCall: true,
        from,
        name: callerName,
        signal,
      })
    })
  }, [])

  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = (_id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    // peer.on('signal', (data) => {
    //   socket.emit('calluser', { userToCall: id, signalData, data, from: me, name })
    // })

    peer.on('stream', (currentStream) => {
      userVideo.current?.srcObject = currentStream
    })

    socket.on('callaccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current?.destroy()
    window.location.reload()
  }

  const value = useMemo(() => {
    return {
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }
  }, [])

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

export {
  ContextProvider,
  SocketContext,
}
