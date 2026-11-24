
// Усі адреси API в одному місці.
// Документація: https://dummyjson.com/docs/products і https://dummyjson.com/docs/auth
const BASE_URL = 'https://dummyjson.com'

// Скільки товарів показуємо в каталозі
export const PRODUCTS_LIMIT = 24

export const CATEGORIES_URL = `${BASE_URL}/products/categories`

// Вхід (POST) і дані поточного користувача (GET з токеном)
export const LOGIN_URL = `${BASE_URL}/auth/login`
export const ME_URL = `${BASE_URL}/auth/me`

// Список товарів: усіх або лише однієї категорії
export function getProductsUrl(category) {
  if (category) {
    return `${BASE_URL}/products/category/${category}?limit=${PRODUCTS_LIMIT}`
  }
  return `${BASE_URL}/products?limit=${PRODUCTS_LIMIT}`
}

// Один товар за його id
export function getProductUrl(id) {
  return `${BASE_URL}/products/${id}`
}
