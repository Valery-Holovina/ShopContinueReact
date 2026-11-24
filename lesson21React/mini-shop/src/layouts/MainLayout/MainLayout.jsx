import { Outlet } from 'react-router'
import Header from '../../components/Header/Header.jsx'
import styles from './MainLayout.module.css'

// Спільний каркас усіх сторінок: шапка зверху, підвал знизу,
// а посередині (Outlet) — сторінка, що відповідає адресі.
function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Міні-магазин · навчальний проєкт L19 · дані: DummyJSON</footer>
    </div>
  )
}

export default MainLayout
