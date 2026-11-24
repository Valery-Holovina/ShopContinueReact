import { NavLink } from 'react-router'
import { useAuth } from '../../hooks/useAuth.js'
import styles from './UserMenu.module.css'

// Правий кут шапки: «Увійти» для гостя, аватар та ім'я для користувача
function UserMenu({ getLinkClass }) {
  const { user } = useAuth()

  if (!user) {
    return (
      <NavLink to="/login" className={getLinkClass}>
        👤 Увійти
      </NavLink>
    )
  }

  return (
    <NavLink to="/profile" className={getLinkClass}>
      <img className={styles.avatar} src={user.image} alt="" />
      <span className={styles.name}>{user.firstName}</span>
    </NavLink>
  )
}

export default UserMenu
