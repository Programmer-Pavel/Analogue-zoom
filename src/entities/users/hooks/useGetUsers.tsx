import { useEffect, useState } from 'react'
import { useSocketIo } from '../../../shared/hooks/useSocketIo'
import { useAuth } from '../../session'

export function useGetUsers() {
  const [users, setUsers] = useState([])
  const { socketConnection, isConnected } = useSocketIo()
  const { infoFromToken } = useAuth()

  useEffect(() => {
    if (isConnected) {
      socketConnection?.emit('getUsers')

      // @ts-expect-error fix
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
