import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL
// eslint-disable-next-line node/prefer-global/process
  = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

const socket = io(URL as any, {
  autoConnect: false,
  withCredentials: true,
  auth: {
    token: 'test token',
  },
})

export { socket }
