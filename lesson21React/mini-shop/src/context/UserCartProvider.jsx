
import { useAuth } from '../hooks/useAuth.js'
import CartProvider from './CartProvider.jsx'

function UserCartProvider({ children }) {
  const { user } = useAuth()

  const storageKey = user
    ? `mini-shop-cart-${user.id}`
    : 'mini-shop-cart'

  return (
    <CartProvider key={storageKey} storageKey={storageKey}>
      {children}
    </CartProvider>
  )
}

export default UserCartProvider
