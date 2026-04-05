import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  function addItem(product, variant, size) {
    setItems(prev => {
      const existing = prev.find(
        item =>
          item.productId === product.id &&
          item.variantLabel === variant.label &&
          item.size === size
      )
      if (existing) {
        return prev.map(item =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          img: variant.img,
          variantLabel: variant.label,
          swatch: variant.swatch,
          size,
          quantity: 1,
        },
      ]
    })
    setIsOpen(true)
  }

  function removeItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function updateQuantity(index, delta) {
    setItems(prev =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, totalItems }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}