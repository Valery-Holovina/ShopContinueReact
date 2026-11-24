
import { Link, NavLink } from 'react-router'
import { useCart } from '../../hooks/useCart.js'
import UserMenu from '../UserMenu/UserMenu.jsx'
import { useFavorites } from '../../hooks/useFavorites.js'
import styles from './Header.module.css'

function getLinkClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

function Header() {
  const { totalCount } = useCart()
  const { favoritesCount } = useFavorites()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          🐻 <span>Міні-магазин</span>
        </Link>

        <nav className={styles.nav} aria-label="Головне меню">
          <NavLink to="/" end className={getLinkClass}>
            Каталог
          </NavLink>

          <NavLink to="/favorites" className={getLinkClass}>
            ♡ Обране
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={getLinkClass}>
            🛒 Кошик
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </NavLink>
           <UserMenu getLinkClass={getLinkClass} />
        </nav>
      </div>
    </header>
  )
}

export default Header


