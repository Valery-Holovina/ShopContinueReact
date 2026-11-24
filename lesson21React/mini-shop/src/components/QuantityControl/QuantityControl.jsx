import styles from './QuantityControl.module.css'

// Кнопки «−  2  +» для зміни кількості
function QuantityControl({ quantity, max, onDecrease, onIncrease }) {
  return (
    <div className={styles.control}>
      <button type="button" className={styles.button} onClick={onDecrease} aria-label="Зменшити кількість">
        −
      </button>
      <span className={styles.value} aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className={styles.button}
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Збільшити кількість"
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl
