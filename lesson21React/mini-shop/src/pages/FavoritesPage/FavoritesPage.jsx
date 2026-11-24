
import { Link } from 'react-router'
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx'
import { useFavorites } from '../../hooks/useFavorites.js'
import styles from './FavoritesPage.module.css'

function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>
        ♡ Обране ({favorites.length})
      </h1>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>♡</span>
          <h2>Тут поки порожньо</h2>
          <p>Додавайте товари в обране, натискаючи на сердечко.</p>
          <Link to="/" className={styles.button}>
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <ProductGrid products={favorites} />
      )}
    </section>
  )
}

export default FavoritesPage
