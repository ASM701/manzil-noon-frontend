import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './CartSidebar.module.css'

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart()
  const navigate = useNavigate()

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('KD ', ''))
    return sum + price * item.quantity
  }, 0)

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Your Bag</h2>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>Your bag is empty.</p>
              <button className={styles.emptyBtn} onClick={() => setIsOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={item.img} alt={item.name} />
                </div>
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  <div className={styles.itemMeta}>
                    <span
                      className={styles.itemSwatch}
                      style={{ background: item.swatch }}
                    />
                    <span className={styles.itemVariant}>{item.variantLabel}</span>
                    {item.size && (
                      <span className={styles.itemSize}>· {item.size}</span>
                    )}
                  </div>
                  <p className={styles.itemPrice}>{item.price}</p>
                  <div className={styles.itemActions}>
                    <div className={styles.qty}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(index, -1)}
                      >
                        −
                      </button>
                      <span className={styles.qtyNum}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(index, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalValue}>
                KD {subtotal.toFixed(3)}
              </span>
            </div>
            <p className={styles.shippingNote}>
              Shipping calculated at checkout
            </p>
            <button 
              className={styles.checkoutBtn}
              onClick={() => { setIsOpen(false); navigate('/checkout') }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </>
  )
}