import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const [activeVariant, setActiveVariant] = useState(0)
  const navigate = useNavigate()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const variants = product.product_variants || []
  const variant = variants[activeVariant]

  if (!variant) return null

  const wishlisted = isWishlisted(product.id, variant.label)

  return (
    <div className={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
      <div className={styles.imgWrap}>
        <img src={variant.img} alt={`${product.name} - ${variant.label}`} loading="lazy" />

        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}
        {variant.stock === 0 && (
          <span className={styles.soldOut}>Sold Out</span>
        )}

        <button
          className={`${styles.wishlist} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product, variant) }}
          aria-label="Add to wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? '#16166B' : 'none'} stroke="#16166B" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div className={styles.overlay}>
          {variant.stock === 0 ? (
            <button className={styles.soldOutBtn} disabled>
              Sold Out
            </button>
          ) : (
            <button
              className={styles.addBtn}
              onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
            >
              View Product
            </button>
          )}
        </div>
      </div>

      <p className={styles.category}>{product.category}</p>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.variantLabel}>{variant.label}</p>
      <p className={styles.price}>{product.price}</p>

      {variants.length > 1 && (
        <div className={styles.swatches}>
          {variants.map((v, i) => (
            <button
              key={i}
              className={`${styles.swatch} ${i === activeVariant ? styles.swatchActive : ''}`}
              style={{ background: v.swatch }}
              onClick={(e) => { e.stopPropagation(); setActiveVariant(i) }}
              title={v.label}
              aria-label={v.label}
            />
          ))}
        </div>
      )}
    </div>
  )
}