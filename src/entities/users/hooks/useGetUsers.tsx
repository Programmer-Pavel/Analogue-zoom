import { useAuth } from '@entities/session'
import { useSocketIo } from '@shared/hooks'
import { useEffect, useState } from 'react'

export function useGetUsers() {
  const [users, setUsers] = useState([])
  const { socketConnection, isConnected } = useSocketIo()
  const { infoFromToken } = useAuth()

  useEffect(() => {
    if (isConnected) {
      socketConnection?.emit('getUsers')

      function onGetUsers(usersFromServer: any) {
        if (infoFromToken) {
          const usersWithoutCurrentUser = usersFromServer.filter(
            (el: any) => el.id !== infoFromToken.userId,
          )
          setUsers(usersWithoutCurrentUser)
        }
      }

      socketConnection?.on('users', onGetUsers)

      return () => {
        socketConnection?.off('users', onGetUsers)
      }
    }
  }, [isConnected])

  return { users }
}
