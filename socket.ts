import process from 'node:process'
import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL
  = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000'

const socket = io(URL as any, {
  autoConnect: false,
})

export { socket }
