
import { useEffect, useState } from 'react'
import { CartContext } from './cart-context.js'

// Читаємо кошик із localStorage
function loadCart(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? []
  } catch {
    return []
  }
}

function CartProvider({ children, storageKey }) {
  const [items, setItems] = useState(() => loadCart(storageKey))

  // Зберігаємо кошик за відповідним ключем
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items))
    } catch {
      // Сховище недоступне
    }
  }, [items, storageKey])

  const totalCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  function getQuantity(id) {
    return items.find((item) => item.id === id)?.quantity ?? 0
  }

  function addToCart(product) {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id)

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      }

      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity: 1,
      }

      return [...prevItems, newItem]
    })
  }

  function decreaseQuantity(id) {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(id) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    )
  }

  function clearCart() {
    setItems([])
  }

  const value = {
    items,
    totalCount,
    totalPrice,
    getQuantity,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext value={value}>
      {children}
    </CartContext>
  )
}

export default CartProvider

