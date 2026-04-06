import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import styles from './WishlistPage.module.css'

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlist()
  const { addItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.page}>

      {/* Header */}
      <section className={styles.header}>
        <p className={styles.eyebrow}>Your Favourites</p>
        <h1 className={styles.title}>Wishlist</h1>
        {items.length > 0 && (
          <p className={styles.sub}>
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        )}
      </section>

      {/* Content */}
      <section className={styles.content}>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" color="var(--taupe)">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p className={styles.emptyText}>Your wishlist is empty.</p>
            <p className={styles.emptySub}>
              Browse our collection and save your favourite pieces.
            </p>
            <button className={styles.emptyBtn} onClick={() => navigate('/')}>
              Explore Collection
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <div key={index} className={styles.card}>
                <div
                  className={styles.imgWrap}
                  onClick={() => navigate(`/product/${item.productId}`)}
                >
                  <img src={item.img} alt={item.name} />
                  <button
                    className={styles.removeBtn}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(
                        {
                          id: item.productId,
                          name: item.name,
                          price: item.price,
                          category: item.category,
                          variants: item.allVariants,
                        },
                        {
                          img: item.img,
                          label: item.variantLabel,
                          swatch: item.swatch,
                        }
                      )
                    }}
                    aria-label="Remove from wishlist"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#16166B" stroke="#16166B" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <p className={styles.category}>{item.category}</p>
                <h3 className={styles.name}>{item.name}</h3>
                <div className={styles.meta}>
                  <span
                    className={styles.swatch}
                    style={{ background: item.swatch }}
                  />
                  <span className={styles.variantLabel}>{item.variantLabel}</span>
                </div>
                <p className={styles.price}>{item.price}</p>

                <button
                  className={styles.addBtn}
                  onClick={() => addItem(
                    {
                      id: item.productId,
                      name: item.name,
                      price: item.price,
                      variants: item.allVariants,
                    },
                    {
                      img: item.img,
                      label: item.variantLabel,
                      swatch: item.swatch,
                    },
                    null
                  )}
                >
                  Add to Bag
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}