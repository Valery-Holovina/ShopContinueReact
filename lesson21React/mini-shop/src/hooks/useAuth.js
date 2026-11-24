import { useContext } from 'react'
import { AuthContext } from '../context/auth-context.js'

// Доступ до даних входу з будь-якого компонента: const { user, isAuth } = useAuth()
export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('useAuth можна використовувати лише всередині <AuthProvider>')
  }
  return auth
}
