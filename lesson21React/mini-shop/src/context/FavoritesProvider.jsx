
import { useEffect, useState } from 'react'
import { FavoritesContext } from './favorites-context.js'

function loadFavorites(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? []
  } catch {
    return []
  }
}

function FavoritesProvider({ children, storageKey }) {
  const [favorites, setFavorites] = useState(
    () => loadFavorites(storageKey)
  )

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites))
    } catch {
      // Сховище недоступне
    }
  }, [favorites, storageKey])

  function toggleFavorite(product) {
    setFavorites((prevFavorites) => {
      const alreadyFavorite = prevFavorites.some(
        (item) => item.id === product.id
      )

      if (alreadyFavorite) {
        return prevFavorites.filter(
          (item) => item.id !== product.id
        )
      }

      return [...prevFavorites, product]
    })
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id)
  }

  function removeFavorite(id) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    )
  }

  const value = {
    favorites,
    favoritesCount: favorites.length,
    toggleFavorite,
    isFavorite,
    removeFavorite,
  }

  return (
    <FavoritesContext value={value}>
      {children}
    </FavoritesContext>
  )
}

export default FavoritesProvider
