import { createContext, useContext, useState, useEffect } from 'react'
import { getCart, addToCart, updateCartItem, removeFromCart } from '../lib/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { user, token } = useAuth()
  

  // Load cart from database when user logs in
  useEffect(() => {
    if (user && token) {
      getCart(token)
        .then(data => {
          const formatted = data.map(entry => ({
            id: entry.id,
            productId: entry.product_id,
            name: entry.products.name,
            price: entry.products.price,
            variantLabel: entry.variant_label,
            img: entry.products.product_variants.find(
              v => v.label === entry.variant_label
            )?.img || '',
            swatch: entry.products.product_variants.find(
              v => v.label === entry.variant_label
            )?.swatch || '',
            size: entry.size,
            quantity: entry.quantity,
          }))
          setItems(formatted)
        })
        .catch(err => console.error('Failed to load cart:', err))
    } else {
      setItems([])
    }
  }, [user, token])

  async function addItem(product, variant, size) {
    if (!user) return
      const existing = items.find(
        item =>
          item.productId === product.id &&
          item.variantLabel === variant.label &&
          item.size === (size || '')
    )

    if (existing) {
      const newQty = existing.quantity + 1
      setItems(prev =>
        prev.map(item =>
          item === existing ? { ...item, quantity: newQty } : item
        )
      )
      if (user && token) {
        try {
          await updateCartItem(token, existing.id, newQty)
        } catch (err) {
          console.error('Failed to update cart:', err)
        }
      }
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        variantLabel: variant.label,
        img: variant.img,
        swatch: variant.swatch,
        size: size || '',
        quantity: 1,
      }

      setItems(prev => [...prev, newItem])
      setIsOpen(true)

      if (user && token) {
        try {
          const saved = await addToCart(
            token,
            product.id,
            variant.label,
            size || '',
            1
          )
          // Update item with database id for future updates
          setItems(prev =>
            prev.map(item =>
              item.productId === product.id &&
              item.variantLabel === variant.label &&
              item.size === (size || '') &&
              !item.id
                ? { ...item, id: saved.id }
                : item
            )
          )
        } catch (err) {
          console.error('Failed to add to cart:', err)
        }
      }
    }

    setIsOpen(true)
  }

  async function removeItem(index) {
    const item = items[index]
    setItems(prev => prev.filter((_, i) => i !== index))

    if (user && token && item.id) {
      try {
        await removeFromCart(token, item.id)
      } catch (err) {
        console.error('Failed to remove from cart:', err)
      }
    }
  }

  async function updateQuantity(index, delta) {
    const item = items[index]
    const newQty = item.quantity + delta

    if (newQty <= 0) {
      removeItem(index)
      return
    }

    setItems(prev =>
      prev.map((it, i) =>
        i === index ? { ...it, quantity: newQty } : it
      )
    )

    if (user && token && item.id) {
      try {
        await updateCartItem(token, item.id, newQty)
      } catch (err) {
        console.error('Failed to update cart:', err)
      }
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, setItems, isOpen, setIsOpen, addItem, removeItem, updateQuantity, totalItems }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}