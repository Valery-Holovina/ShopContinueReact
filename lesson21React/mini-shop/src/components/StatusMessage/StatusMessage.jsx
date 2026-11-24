import styles from './StatusMessage.module.css'
 
// Універсальне повідомлення: завантаження, помилка або «порожньо».
// Кнопка показується, лише якщо передано actionLabel та onAction.
function StatusMessage({ icon = 'ℹ️', title, children, actionLabel, onAction, isError = false }) {
  return (
    <div className={`${styles.box} ${isError ? styles.error : ''}`} role={isError ? 'alert' : 'status'}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <p className={styles.title}>{title}</p>
      {children && <p className={styles.text}>{children}</p>}
      {actionLabel && onAction && (
        <button type="button" className={styles.button} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
 
export default StatusMessage