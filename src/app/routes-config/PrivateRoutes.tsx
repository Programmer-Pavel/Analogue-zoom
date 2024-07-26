import { useAuth } from '@entities/session'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function PrivateRoutes() {
  const location = useLocation()
  const { isAuth } = useAuth()

  return isAuth
    ? (
      <Outlet />
      )
    : (
      <Navigate to="/login" state={{ from: location }} replace />
      )
}
