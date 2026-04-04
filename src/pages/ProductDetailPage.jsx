import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import styles from './ProductDetailPage.module.css'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))

  const [activeVariant, setActiveVariant] = useState(0)
  const [activeSize, setActiveSize] = useState(null)
  
  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  const variant = product.variants[activeVariant]

  return (
    <div className={styles.page}>

      {/* Back button */}
      <button className={styles.back} onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <div className={styles.layout}>

        {/* Left — image */}
        <div className={styles.imageSection}>
          <div className={styles.imgWrap}>
            <img
              src={variant.img}
              alt={`${product.name} - ${variant.label}`}
            />
          </div>

          {/* Variant thumbnails */}
          {product.variants.length > 1 && (
            <div className={styles.thumbnails}>
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === activeVariant ? styles.thumbActive : ''}`}
                  onClick={() => setActiveVariant(i)}
                >
                  <img src={v.img} alt={v.label} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — details */}
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{product.price}</p>

          {/* Color swatches */}
          <div className={styles.section}>
            <p className={styles.label}>
              Color — <span className={styles.variantLabel}>{variant.label}</span>
            </p>
            <div className={styles.swatches}>
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  className={`${styles.swatch} ${i === activeVariant ? styles.swatchActive : ''}`}
                  style={{ background: v.swatch }}
                  onClick={() => setActiveVariant(i)}
                  title={v.label}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className={styles.section}>
            <p className={styles.label}>Size</p>
            <div className={styles.sizes}>
              {SIZES.map(size => (
                <button
                  key={size}
                  className={`${styles.sizeBtn} ${activeSize === size ? styles.sizeBtnActive : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Note for products with two outfits per image */}
          {product.note && (
            <p className={styles.note}>* {product.note}</p>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.addBtn}>
              Add to Bag
            </button>
            <button className={styles.wishlistBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}