
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getProductUrl } from '../../api/endpoints.js'
import QuantityControl from '../../components/QuantityControl/QuantityControl.jsx'
import StatusMessage from '../../components/StatusMessage/StatusMessage.jsx'
import { useCart } from '../../hooks/useCart.js'
import { useFetch } from '../../hooks/useFetch.js'
import { formatPrice, getOldPrice } from '../../utils/format.js'
import { addRecentlyViewed } from '../../utils/recentlyViewed.js'
import styles from './ProductPage.module.css'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, isLoading, error, reload } = useFetch(getProductUrl(id))
  const { addToCart, decreaseQuantity, getQuantity } = useCart()

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product)
    }
  }, [product])

  if (isLoading) {
    return <StatusMessage icon="⏳" title="Завантажуємо товар..." />
  }

  if (error) {
    return (
      <StatusMessage
        icon="⚠️"
        title="Не вдалося відкрити товар"
        actionLabel="Спробувати ще раз"
        onAction={reload}
        isError
      >
        {error}. <Link to="/">Повернутися до каталогу</Link>
      </StatusMessage>
    )
  }

  const quantity = getQuantity(product.id)

  return (
    <>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <article className={styles.product}>
        <div className={styles.imageBox}>
          <img
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className={styles.info}>
          <Link
            to={`/?category=${product.category}`}
            className={styles.category}
          >
            {product.category}
          </Link>

          <h1 className={styles.title}>{product.title}</h1>

          {product.brand && (
            <p className={styles.brand}>Бренд: {product.brand}</p>
          )}

          <p className={styles.rating}>★ {product.rating.toFixed(1)}</p>

          <div className={styles.prices}>
            <span className={styles.price}>
              {formatPrice(product.price)}
            </span>

            {product.discountPercentage > 0 && (
              <>
                <span className={styles.oldPrice}>
                  {formatPrice(
                    getOldPrice(product.price, product.discountPercentage)
                  )}
                </span>

                <span className={styles.discount}>
                  −{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <ul className={styles.facts}>
            <li>📦 На складі: {product.stock} шт.</li>

            {product.shippingInformation && (
              <li>🚚 {product.shippingInformation}</li>
            )}

            {product.warrantyInformation && (
              <li>🛡️ {product.warrantyInformation}</li>
            )}
          </ul>

          {quantity === 0 ? (
            <button
              type="button"
              className={styles.addButton}
              onClick={() => addToCart(product)}
            >
              Додати в кошик
            </button>
          ) : (
            <div className={styles.inCart}>
              <QuantityControl
                quantity={quantity}
                max={product.stock}
                onDecrease={() => decreaseQuantity(product.id)}
                onIncrease={() => addToCart(product)}
              />

              <Link to="/cart" className={styles.cartLink}>
                Перейти в кошик →
              </Link>
            </div>
          )}
        </div>
      </article>
    </>
  )
}

export default ProductPage


