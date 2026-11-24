
import { useCallback, useEffect, useState } from 'react'
import { loginRequest } from '../api/auth.js'
import { AuthContext } from './auth-context.js'

const STORAGE_KEY = 'mini-shop-auth'

// Читаємо збережений вхід з localStorage або sessionStorage
function loadAuth() {
  try {
    const savedAuth =
      localStorage.getItem(STORAGE_KEY) ??
      sessionStorage.getItem(STORAGE_KEY)

    if (!savedAuth) return null

    const auth = JSON.parse(savedAuth)

    // Для старих збережених входів remember за замовчуванням true
    return {
      ...auth,
      remember: auth.remember ?? true,
    }
  } catch {
    return null
  }
}

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadAuth)
  const [expired, setExpired] = useState(false)

  // Зберігаємо вхід у відповідному сховищі
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(STORAGE_KEY)

      if (auth) {
        const storage = auth.remember
          ? localStorage
          : sessionStorage

        storage.setItem(STORAGE_KEY, JSON.stringify(auth))
      }
    } catch {
      // Сховище недоступне — вхід не збережеться
    }
  }, [auth])

  // remember = true за замовчуванням
  async function login(username, password, remember = true) {
    const data = await loginRequest(username, password)

    const user = {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image,
    }

    setAuth({
      user,
      token: data.accessToken,
      remember,
    })

    // Прибираємо повідомлення про завершення сесії
    setExpired(false)
  }

  const logout = useCallback((reason) => {
  setAuth(null)
  setExpired(reason === 'expired')
}, [])

  const value = {
    user: auth?.user ?? null,
    token: auth?.token ?? null,
    isAuth: Boolean(auth),
    expired,
    login,
    logout,
  }

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider
