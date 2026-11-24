
import { useState } from 'react'
import { Link } from 'react-router'
import CartItem from '../../components/CartItem/CartItem.jsx'
import CartSummary from '../../components/CartSummary/CartSummary.jsx'
import { useCart } from '../../hooks/useCart.js'
import {
  PROMO_CODES,
  FREE_DELIVERY_FROM,
  DELIVERY_PRICE,
} from '../../data/promoCodes.js'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx'
import styles from './CartPage.module.css'

function CartPage() {
  const { items, totalCount, totalPrice, clearCart } = useCart()

  const [code, setCode] = useState('')
  const [appliedCode, setAppliedCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  function handleConfirmClear() {
    clearCart()
    setIsConfirmOpen(false)
  }

  function handleApplyPromo(event) {
    event.preventDefault()

    const normalizedCode = code.trim().toUpperCase()

    if (PROMO_CODES[normalizedCode]) {
      setAppliedCode(normalizedCode)
      setPromoMessage(
        `Промокод застосовано! Знижка ${PROMO_CODES[normalizedCode]}%.`
      )
    } else {
      setAppliedCode('')
      setPromoMessage('Такого промокоду немає.')
    }
  }

  const discount = appliedCode
    ? (totalPrice * PROMO_CODES[appliedCode]) / 100
    : 0

  const afterDiscount = totalPrice - discount

  const delivery =
    afterDiscount >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE

  const toPay = afterDiscount + delivery

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_FROM - afterDiscount
  )

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🛒</span>
        <h1>Кошик порожній</h1>
        <p>Додайте товари з каталогу — вони з'являться тут.</p>
        <Link to="/" className={styles.button}>
          До каталогу
        </Link>
      </div>
    )
  }

  return (
    <>
      <h1 className={styles.title}>Кошик</h1>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        <div>
          <CartSummary
            totalCount={totalCount}
            totalPrice={totalPrice}
            onClear={() => setIsConfirmOpen(true)}
          />

          <section className={styles.promoSection}>
            <h3>Промокод</h3>

            <form onSubmit={handleApplyPromo}>
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Введіть промокод"
              />

              <button type="submit">
                Застосувати
              </button>
            </form>

            {promoMessage && <p>{promoMessage}</p>}
          </section>

          <section className={styles.orderSummary}>
            <h3>Підсумок замовлення</h3>

            <p>Товари: ${totalPrice.toFixed(2)}</p>
            <p>Знижка: -${discount.toFixed(2)}</p>

            <p>
              Доставка: {delivery === 0
                ? 'Безкоштовно'
                : `$${delivery.toFixed(2)}`}
            </p>

            {delivery > 0 && (
              <p>
                До безкоштовної доставки:
                ${remainingForFreeDelivery.toFixed(2)}
              </p>
            )}

            <h3>До сплати: ${toPay.toFixed(2)}</h3>
          </section>
        </div>
      </div>

      {isConfirmOpen && (
        <ConfirmDialog
          onConfirm={handleConfirmClear}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </>
  )
}

export default CartPage


