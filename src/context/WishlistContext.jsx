import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])

  function toggleWishlist(product, variant) {
    setItems(prev => {
      const existing = prev.find(
        item =>
          item.productId === product.id &&
          item.variantLabel === variant.label
      )
      if (existing) {
        return prev.filter(item => item !== existing)
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          img: variant.img,
          variantLabel: variant.label,
          swatch: variant.swatch,
          allVariants: product.variants,
        },
      ]
    })
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