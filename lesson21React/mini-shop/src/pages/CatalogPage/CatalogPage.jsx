import { useSearchParams } from 'react-router'
import { CATEGORIES_URL, getProductsUrl } from '../../api/endpoints.js'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx'
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx'
import StatusMessage from '../../components/StatusMessage/StatusMessage.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import styles from './CatalogPage.module.css'
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed.jsx'

function CatalogPage() {
  // Категорія зберігається в адресі: /?category=beauty
  // Тому після повернення з картки товару фільтр не скидається.
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? ''

  const products = useFetch(getProductsUrl(category))
  const categories = useFetch(CATEGORIES_URL)

  function handleCategoryChange(newCategory) {
    setSearchParams(newCategory ? { category: newCategory } : {})
  }

  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>Каталог товарів</h1>
          {products.data && !products.isLoading && (
            <p className={styles.count}>
              Показано {products.data.products.length} з {products.data.total}
            </p>
          )}
        </div>

        {categories.data && (
          <CategoryFilter categories={categories.data} value={category} onChange={handleCategoryChange} />
        )}
      </section>

      {products.isLoading && <StatusMessage icon="⏳" title="Завантажуємо товари..." />}

      {products.error && (
        <StatusMessage
          icon="⚠️"
          title="Не вдалося завантажити товари"
          actionLabel="Спробувати ще раз"
          onAction={products.reload}
          isError
        >
          {products.error}. Перевірте інтернет-з'єднання.
        </StatusMessage>
      )}

      {!products.isLoading && !products.error && products.data?.products.length === 0 && (
        <StatusMessage icon="📭" title="У цій категорії поки немає товарів" />
      )}

      {!products.isLoading && !products.error && products.data?.products.length > 0 && (
        <ProductGrid products={products.data.products} />
      )}
      <RecentlyViewed />
    </>
  )
}

export default CatalogPage

