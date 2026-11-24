
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import FormField from '../../components/FormField/FormField.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import styles from './LoginPage.module.css'

// Тестовий акаунт DummyJSON
const DEMO_USER = { username: 'emilys', password: 'emilyspass' }

function LoginPage() {
  const { isAuth, login, expired } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from ?? '/profile'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Нові стани
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)

  if (isAuth) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!username.trim() || !password) {
      setError('Введіть логін і пароль')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await login(username.trim(), password, remember)
      navigate(from, { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function fillDemo() {
    setUsername(DEMO_USER.username)
    setPassword(DEMO_USER.password)
    setError('')
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Вхід</h1>

        <p className={styles.subtitle}>
          Увійдіть, щоб оформити замовлення і бачити свій профіль.
        </p>

        {expired && (
          <p className={styles.error} role="alert">
            Сесія завершилась — увійдіть ще раз
          </p>
        )}

        <FormField
          id="username"
          label="Логін"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />

        <FormField
          id="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
        >
          {showPassword ? 'Сховати пароль' : 'Показати пароль'}
        </button>

        <label>
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          Запам'ятати мене
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={styles.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Входимо...' : 'Увійти'}
        </button>

        <div className={styles.demo}>
          Тестовий акаунт: <code>{DEMO_USER.username}</code> /{' '}
          <code>{DEMO_USER.password}</code>

          <button
            type="button"
            className={styles.demoButton}
            onClick={fillDemo}
          >
            Заповнити
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
