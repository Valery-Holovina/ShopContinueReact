import { useState } from 'react'
import { Link } from 'react-router'
import FormField from '../../components/FormField/FormField.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { useCart } from '../../hooks/useCart.js'
import { formatPrice } from '../../utils/format.js'
import { validateCheckout } from '../../utils/validateCheckout.js'
import styles from './CheckoutPage.module.css'

const DELIVERY_OPTIONS = [
  { value: 'nova-poshta', label: 'Нова пошта (відділення)' },
  { value: 'courier', label: "Кур'єр за адресою" },
]

function CheckoutPage() {
  const { user } = useAuth()
  const { items, totalCount, totalPrice, clearCart } = useCart()

  // Усі поля форми — в одному об'єкті. Ім'я одразу підставляємо з профілю.
  const [form, setForm] = useState({
    fullName: `${user.firstName} ${user.lastName}`,
    phone: '',
    city: '',
    delivery: 'nova-poshta',
    address: '',
    comment: '',
  })
  const [errors, setErrors] = useState({})
  const [orderNumber, setOrderNumber] = useState(null)

  // Одна функція для всіх полів: name поля = ключ в об'єкті form
  function handleChange(event) {
    const { name, value } = event.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validateCheckout(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return // є помилки — не відправляємо

    // Справжнього сервера замовлень немає — просто генеруємо номер
    setOrderNumber(Date.now().toString().slice(-6))
    clearCart()
  }

  // Замовлення оформлено — показуємо подяку
  if (orderNumber) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>🎉</span>
        <h1>Дякуємо за замовлення!</h1>
        <p>
          Номер замовлення: <b>№{orderNumber}</b>
        </p>
        <p>
          {form.fullName}, ми зателефонуємо на номер {form.phone}, щоб підтвердити доставку.
        </p>
        <Link to="/" className={styles.button}>
          Повернутися до каталогу
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={styles.success}>
        <h1>Кошик порожній</h1>
        <p>Щоб оформити замовлення, спочатку додайте товари.</p>
        <Link to="/" className={styles.button}>
          До каталогу
        </Link>
      </div>
    )
  }

  return (
    <>
      <h1 className={styles.title}>Оформлення замовлення</h1>
      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <FormField id="fullName" name="fullName" label="Ім'я та прізвище" value={form.fullName} onChange={handleChange} error={errors.fullName} />
          <FormField id="phone" name="phone" label="Телефон" type="tel" placeholder="+380671234567" value={form.phone} onChange={handleChange} error={errors.phone} />
          <FormField id="city" name="city" label="Місто" value={form.city} onChange={handleChange} error={errors.city} />

          <fieldset className={styles.delivery}>
            <legend>Доставка</legend>
            {DELIVERY_OPTIONS.map((option) => (
              <label key={option.value} className={styles.radio}>
                <input
                  type="radio"
                  name="delivery"
                  value={option.value}
                  checked={form.delivery === option.value}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}
          </fieldset>

          <FormField
            id="address"
            name="address"
            label={form.delivery === 'courier' ? 'Вулиця, будинок, квартира' : 'Номер відділення'}
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />

          <label className={styles.commentLabel} htmlFor="comment">
            Коментар (необов'язково)
          </label>
          <textarea id="comment" name="comment" className={styles.comment} rows={3} value={form.comment} onChange={handleChange} />

          <button type="submit" className={styles.submit}>
            Підтвердити замовлення
          </button>
        </form>

        <aside className={styles.summary}>
          <h2>Ваше замовлення</h2>
          <ul className={styles.items}>
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.title} × {item.quantity}
                </span>
                <b>{formatPrice(item.price * item.quantity)}</b>
              </li>
            ))}
          </ul>
          <p className={styles.total}>
            <span>Разом ({totalCount} шт.)</span>
            <b>{formatPrice(totalPrice)}</b>
          </p>
        </aside>
      </div>
    </>
  )
}

export default CheckoutPage
