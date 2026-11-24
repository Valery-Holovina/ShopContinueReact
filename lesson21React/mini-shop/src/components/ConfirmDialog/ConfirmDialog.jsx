
import styles from './ConfirmDialog.module.css'

function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
    >
      <div
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <h2 id="dialog-title">Очистити кошик?</h2>

        <p>Ви впевнені, що хочете видалити всі товари з кошика?</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Скасувати
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            Так, очистити
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
