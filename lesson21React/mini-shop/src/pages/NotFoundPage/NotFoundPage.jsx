import { Link } from 'react-router'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <div className={styles.page}>
      <span className={styles.code}>404</span>
      <h1>Сторінку не знайдено</h1>
      <p>Можливо, адреса введена з помилкою.</p>
      <Link to="/" className={styles.link}>
        На головну
      </Link>
    </div>
  )
}

export default NotFoundPage
