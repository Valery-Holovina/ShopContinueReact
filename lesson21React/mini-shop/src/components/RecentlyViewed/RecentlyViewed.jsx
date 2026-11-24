
import { useState } from 'react'
import ProductGrid from '../ProductGrid/ProductGrid.jsx'
import { getRecentlyViewed } from '../../utils/recentlyViewed.js'
import styles from './RecentlyViewed.module.css'

function RecentlyViewed() {
  const [products] = useState(() => getRecentlyViewed())

  if (products.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Нещодавно переглянуті</h2>

      <ProductGrid products={products} />
    </section>
  )
}

export default RecentlyViewed
