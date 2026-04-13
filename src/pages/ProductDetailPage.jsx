import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '../lib/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import styles from './ProductDetailPage.module.css'
import { useAuth } from '../context/AuthContext'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeVariant, setActiveVariant] = useState(0)
  const [activeSize, setActiveSize] = useState(null)
  const { user } = useAuth()

  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  useEffect(() => {
    window.scrollTo(0, 0)
    getProduct(id)
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className={styles.notFound}><p>Loading...</p></div>
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  const variants = product.product_variants || []
  const variant = variants[activeVariant]
  const wishlisted = isWishlisted(product.id, variant?.label)

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <div className={styles.layout}>
        <div className={styles.imageSection}>
          <div className={styles.imgWrap}>
            <img src={variant?.img} alt={`${product.name} - ${variant?.label}`} />
          </div>

          {variants.length > 1 && (
            <div className={styles.thumbnails}>
              {variants.map((v, i) => (
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

        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{product.price}</p>

          <div className={styles.section}>
            <p className={styles.label}>
              Color — <span className={styles.variantLabel}>{variant?.label}</span>
            </p>
            <div className={styles.swatches}>
              {variants.map((v, i) => (
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

          {product.note && (
            <p className={styles.note}>* {product.note}</p>
          )}

          <div className={styles.actions}>
            <button
              className={styles.addBtn}
              onClick={() => {
                if (!user) {
                  navigate('/login')
                  return
                }
                addItem(product, variant, activeSize)
              }}
            >
              Add to Bag
            </button>
            <button
              className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistBtnActive : ''}`}
              onClick={() => toggleWishlist(product, variant)}
              aria-label="Add to wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? '#16166B' : 'none'} stroke="#16166B" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}