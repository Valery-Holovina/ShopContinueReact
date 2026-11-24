
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
 
export function formatPrice(value) {
  return priceFormatter.format(value)
}
 
export function getOldPrice(price, discountPercentage) {
  return price / (1 - discountPercentage / 100)
}
export function formatDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('uk-UA')
}