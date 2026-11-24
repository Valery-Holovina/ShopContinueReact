import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart.js'
import { formatPrice } from '../../utils/format.js'
import QuantityControl from '../QuantityControl/QuantityControl.jsx'
import styles from './CartItem.module.css'

// Один рядок у кошику
function CartItem({ item }) {
  const { addToCart, decreaseQuantity, removeFromCart } = useCart()

  return (
    <li className={styles.item}>
      <img className={styles.image} src={item.thumbnail} alt={item.title} />

      <div className={styles.info}>
        <Link to={`/product/${item.id}`} className={styles.title}>
          {item.title}
        </Link>
        <span className={styles.price}>{formatPrice(item.price)} / шт.</span>
      </div>

      <div className={styles.quantity}>
        <QuantityControl
          quantity={item.quantity}
          max={item.stock}
          onDecrease={() => decreaseQuantity(item.id)}
          onIncrease={() => addToCart(item)}
        />
      </div>

      <span className={styles.total}>{formatPrice(item.price * item.quantity)}</span>

      <button
        type="button"
        className={styles.remove}
        onClick={() => removeFromCart(item.id)}
        aria-label={`Видалити ${item.title}`}
      >
        ✕
      </button>
    </li>
  )
}

export default CartItem
