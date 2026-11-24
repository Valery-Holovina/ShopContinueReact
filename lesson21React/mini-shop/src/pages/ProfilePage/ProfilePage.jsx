
import { useEffect } from 'react'
import { Link } from 'react-router'
import { ME_URL } from '../../api/endpoints.js'
import StatusMessage from '../../components/StatusMessage/StatusMessage.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useFetch } from '../../hooks/useFetch.js'
import { formatDate } from '../../utils/format.js'
import styles from './ProfilePage.module.css'

function ProfilePage() {
  const { token, logout } = useAuth()

  const {
    data: profile,
    isLoading,
    error,
    isUnauthorized,
    reload,
  } = useFetch(ME_URL, token)

  // Автоматично виходимо, якщо токен недійсний
  useEffect(() => {
    if (isUnauthorized) {
      logout('expired')
    }
  }, [isUnauthorized, logout])

  if (isLoading) {
    return <StatusMessage icon="⏳" title="Завантажуємо профіль..." />
  }

  if (error) {
    return (
      <StatusMessage
        icon="⚠️"
        title="Не вдалося завантажити профіль"
        actionLabel="Спробувати ще раз"
        onAction={reload}
        isError
      >
        {error}.{' '}
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => logout()}
        >
          Увійти знову
        </button>
      </StatusMessage>
    )
  }

  return (
    <article className={styles.profile}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={profile.image}
          alt={profile.firstName}
        />

        <div>
          <h1 className={styles.name}>
            {profile.firstName} {profile.lastName}
          </h1>
          <p className={styles.username}>@{profile.username}</p>
        </div>

        <button
          type="button"
          className={styles.logout}
          onClick={logout}
        >
          Вийти
        </button>
      </div>

      <dl className={styles.info}>
        <div>
          <dt>Email</dt>
          <dd>{profile.email}</dd>
        </div>

        <div>
          <dt>Телефон</dt>
          <dd>{profile.phone}</dd>
        </div>

        <div>
          <dt>Дата народження</dt>
          <dd>{formatDate(profile.birthDate)}</dd>
        </div>

        {profile.address && (
          <div>
            <dt>Адреса</dt>
            <dd>
              {profile.address.city}, {profile.address.country}
            </dd>
          </div>
        )}
      </dl>

      <div className={styles.actions}>
        <Link to="/cart" className={styles.action}>
          🛒 Мій кошик
        </Link>

        <Link to="/" className={styles.action}>
          🛍️ До каталогу
        </Link>
      </div>
    </article>
  )
}

export default ProfilePage
