import { Link } from 'react-router'
import { formatPrice } from '../../utils/format.js'
import styles from './CartSummary.module.css'

// Підсумок замовлення праворуч від списку товарів
function CartSummary({ totalCount, totalPrice, onClear }) {
  return (
    <aside className={styles.summary}>
      <h2 className={styles.heading}>Разом</h2>
      <dl className={styles.list}>
        <div>
          <dt>Товарів</dt>
          <dd>{totalCount} шт.</dd>
        </div>
        <div className={styles.total}>
          <dt>До сплати</dt>
          <dd>{formatPrice(totalPrice)}</dd>
        </div>
      </dl>
        <Link to="/checkout" className={styles.checkout}>
        Оформити замовлення
      </Link>
      <button type="button" className={styles.clear} onClick={onClear}>
        Очистити кошик
      </button>
    </aside>
  )
}

export default CartSummary
