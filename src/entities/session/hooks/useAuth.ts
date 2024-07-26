import { parseJwt } from '@shared/lib'
import { useAuthStore } from '../model/session-store'

export function useAuth() {
  const token = useAuthStore(state => state.token)
  const tokenInfo = parseJwt(token)

  return {
    isAuth: !!token,
    token,
    infoFromToken: tokenInfo,
  }
}
