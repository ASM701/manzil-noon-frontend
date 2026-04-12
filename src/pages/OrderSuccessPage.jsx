import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { clearCart } from '../lib/api'
import styles from './OrderSuccessPage.module.css'

export default function OrderSuccessPage() {
  const { setItems, setIsOpen } = useCart()
  const { user, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Clear the cart after successful order
    setItems([])
    setIsOpen(false)
    if (user && token) {
      clearCart(token).catch(err => console.error('Failed to clear cart:', err))
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.icon}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <p className={styles.eyebrow}>Thank you!</p>
        <h1 className={styles.title}>Order Placed</h1>
        <p className={styles.sub}>
          Your order has been received and is being processed.
          We will contact you shortly to confirm delivery details.
        </p>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>What happens next?</p>
            <p className={styles.infoText}>
              Our team will reach out via WhatsApp or email to confirm
              your order and arrange delivery.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate('/profile')}
          >
            View My Orders
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  )
}