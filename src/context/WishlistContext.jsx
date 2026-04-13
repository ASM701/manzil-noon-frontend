import { createContext, useContext, useState, useEffect } from 'react'
import { getWishlist, addToWishlist, removeFromWishlist } from '../lib/api'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])
  const { user, token } = useAuth()

  // Load wishlist from database when user logs in
  useEffect(() => {
    if (user && token) {
      getWishlist(token)
        .then(data => {
          const formatted = data.map(entry => ({
            productId: entry.product_id,
            name: entry.products.name,
            price: entry.products.price,
            category: entry.products.category,
            variantLabel: entry.variant_label,
            img: entry.products.product_variants.find(
              v => v.label === entry.variant_label
            )?.img || '',
            swatch: entry.products.product_variants.find(
              v => v.label === entry.variant_label
            )?.swatch || '',
            allVariants: entry.products.product_variants,
          }))
          setItems(formatted)
        })
        .catch(err => console.error('Failed to load wishlist:', err))
    } else {
      setItems([])
    }
  }, [user, token])

  async function toggleWishlist(product, variant) {
  if (!user) {
    window.location.href = '/login'
    return
  }
  const existing = items.find(
    item =>
      item.productId === product.id &&
      item.variantLabel === variant.label
  )

    if (existing) {
      // Remove from state immediately
      setItems(prev => prev.filter(item => item !== existing))

      // Remove from database if logged in
      if (user && token) {
        try {
          await removeFromWishlist(token, product.id, variant.label)
        } catch (err) {
          console.error('Failed to remove from wishlist:', err)
        }
      }
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        variantLabel: variant.label,
        img: variant.img,
        swatch: variant.swatch,
        allVariants: product.product_variants || product.variants || [],
      }

      // Add to state immediately
      setItems(prev => [...prev, newItem])

      // Save to database if logged in
      if (user && token) {
        try {
          await addToWishlist(token, product.id, variant.label)
        } catch (err) {
          console.error('Failed to add to wishlist:', err)
        }
      }
    }
  }

  function isWishlisted(productId, variantLabel) {
    return items.some(
      item => item.productId === productId && item.variantLabel === variantLabel
    )
  }

  const totalItems = items.length

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, isWishlisted, totalItems }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}