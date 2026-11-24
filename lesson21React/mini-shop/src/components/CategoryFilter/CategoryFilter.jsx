import styles from './CategoryFilter.module.css'

// Випадний список категорій. Порожнє значення '' означає «Усі категорії».
function CategoryFilter({ categories, value, onChange }) {
  return (
    <label className={styles.filter}>
      <span className={styles.label}>Категорія</span>
      <select className={styles.select} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Усі категорії</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CategoryFilter
