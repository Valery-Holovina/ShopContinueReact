import styles from './FormField.module.css'

// Поле форми з підписом і текстом помилки.
// Усі інші props (value, onChange, type, placeholder…) передаються прямо в <input>.
function FormField({ label, error, id, ...inputProps }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        aria-invalid={Boolean(error)}
        {...inputProps}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default FormField
