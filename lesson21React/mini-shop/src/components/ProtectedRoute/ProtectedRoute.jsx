import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../hooks/useAuth.js'

// «Охоронець» для приватних сторінок.
// Увійшов — показуємо сторінку (Outlet). Ні — відправляємо на /login
// і запам'ятовуємо, куди користувач хотів потрапити (state.from).
function ProtectedRoute() {
  const { isAuth } = useAuth()
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export default ProtectedRoute
