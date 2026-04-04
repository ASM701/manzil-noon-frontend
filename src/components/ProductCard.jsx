import { useState } from 'react'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const [activeVariant, setActiveVariant] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)

  const variant = product.variants[activeVariant]

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={variant.img} alt={`${product.name} - ${variant.label}`} loading="lazy" />

        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}

        <button
          className={`${styles.wishlist} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Add to wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? '#16166B' : 'none'} stroke="#16166B" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div className={styles.overlay}>
          <button className={styles.addBtn}>Add to Bag</button>
        </div>
      </div>

      <p className={styles.category}>{product.category}</p>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.variantLabel}>{variant.label}</p>
      <p className={styles.price}>{product.price}</p>

      {product.variants.length > 1 && (
        <div className={styles.swatches}>
          {product.variants.map((v, i) => (
            <button
              key={i}
              className={`${styles.swatch} ${i === activeVariant ? styles.swatchActive : ''}`}
              style={{ background: v.swatch }}
              onClick={() => setActiveVariant(i)}
              title={v.label}
              aria-label={v.label}
            />
          ))}
        </div>
      )}
    </div>
  )
}