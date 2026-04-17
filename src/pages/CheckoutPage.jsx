import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder, getProfile } from '../lib/api'
import styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const { items, totalItems, setIsOpen } = useCart()
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!user) {
      navigate('/login')
      return
    }
    if (totalItems === 0) {
      navigate('/')
      return
    }
    // Pre-fill from profile
    getProfile(token)
      .then(profile => {
        setFullName(profile.full_name || '')
        setPhone(profile.phone || '')
        setAddress(profile.address || '')
        setEmail(user.email || '')
      })
      .catch(() => setEmail(user.email || ''))
  }, [user, totalItems])

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('KD ', ''))
    return sum + price * item.quantity
  }, 0)

  async function handlePlaceOrder(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await createOrder(token, items, subtotal)
      navigate('/order-success')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <section className={styles.header}>
        <p className={styles.eyebrow}>Almost there</p>
        <h1 className={styles.title}>Checkout</h1>
      </section>

      <div className={styles.layout}>

        {/* Left — Order summary */}
        <div className={styles.summary}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          <div className={styles.items}>
            {items.map((item, index) => (
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
                  </div>
                  <div className={styles.itemBottom}>
                    <span className={styles.itemQty}>Qty {item.quantity}</span>
                    <span className={styles.itemPrice}>{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalValue}>KD {subtotal.toFixed(3)}</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Shipping</span>
              <span className={styles.totalValue}>Calculated after order</span>
            </div>
            <div className={`${styles.totalRow} ${styles.totalFinal}`}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValueLarge}>KD {subtotal.toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Right — Checkout form */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Delivery Details</h2>

          <form className={styles.form} onSubmit={handlePlaceOrder}>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Your full name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone / WhatsApp</label>
              <input
                type="tel"
                className={styles.input}
                placeholder="+965 0000 0000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Delivery Address</label>
              <textarea
                className={styles.textarea}
                placeholder="Block, Street, House/Apartment, Area, Kuwait"
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Order Notes (optional)</label>
              <textarea
                className={styles.textarea}
                placeholder="Any special requests or notes..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            {/* Payment placeholder */}
            <div className={styles.paymentPlaceholder}>
              <p className={styles.paymentLabel}>Payment</p>
              <p className={styles.paymentNote}>
                Payment integration coming soon. Orders will be confirmed manually for now.
              </p>
            </div>

            <button
              type="submit"
              className={styles.placeOrderBtn}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : `Place Order · KD ${subtotal.toFixed(3)}`}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}