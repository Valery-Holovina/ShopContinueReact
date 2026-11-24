
const STORAGE_KEY = 'mini-shop-recent'

export function getRecentlyViewed() {
  const saved = localStorage.getItem(STORAGE_KEY)

  return saved ? JSON.parse(saved) : []
}

export function addRecentlyViewed(product) {
  const withoutCurrent = getRecentlyViewed().filter(
    (item) => item.id !== product.id
  )

  const next = [product, ...withoutCurrent].slice(0, 4)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}
