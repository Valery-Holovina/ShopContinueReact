
import { useAuth } from '../hooks/useAuth.js'
import FavoritesProvider from './FavoritesProvider.jsx'

function UserFavoritesProvider({ children }) {
  const { user } = useAuth()

  const storageKey = user
    ? `mini-shop-favorites-${user.id}`
    : 'mini-shop-favorites'

  return (
    <FavoritesProvider key={storageKey} storageKey={storageKey}>
      {children}
    </FavoritesProvider>
  )
}

export default UserFavoritesProvider
