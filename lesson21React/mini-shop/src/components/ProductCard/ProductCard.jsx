
import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart.js'
import { useFavorites } from '../../hooks/useFavorites.js'
import { formatPrice } from '../../utils/format.js'
import styles from './ProductCard.module.css'

// Картка товару в каталозі
function ProductCard({ product }) {
  const { addToCart, getQuantity } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const quantity = getQuantity(product.id)
  const isMaxReached = quantity >= product.stock
  const favorite = isFavorite(product.id)

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />

        {product.discountPercentage >= 10 && (
          <span className={styles.sale}>
            −{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>

      <button
        type="button"
        className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
        onClick={() => toggleFavorite(product)}
        aria-label={favorite ? 'Видалити з обраного' : 'Додати в обране'}
        aria-pressed={favorite}
      >
       {favorite ? '❤️' : '♡'}
      </button>

      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>

        <Link to={`/product/${product.id}`} className={styles.title}>
          {product.title}
        </Link>

        <span className={styles.rating}>
          ★ {product.rating.toFixed(1)}
        </span>

        <div className={styles.footer}>
          <span className={styles.price}>
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            className={styles.button}
            onClick={() => addToCart(product)}
            disabled={isMaxReached}
          >
            {quantity > 0 ? `У кошику: ${quantity}` : 'У кошик'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard


