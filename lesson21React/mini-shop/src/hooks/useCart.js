import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

// Зручний доступ до кошика з будь-якого компонента: const { items } = useCart()
export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) {
    throw new Error('useCart можна використовувати лише всередині <CartProvider>')
  }
  return cart
}
