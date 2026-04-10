import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProfile, updateProfile, getOrders } from '../lib/api'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!user) {
      navigate('/login')
      return
    }
    fetchData()
  }, [user])

  async function fetchData() {
    try {
      const [profileData, ordersData] = await Promise.all([
        getProfile(token),
        getOrders(token)
      ])
      setProfile(profileData)
      setOrders(ordersData)
      setFullName(profileData.full_name || '')
      setPhone(profileData.phone || '')
      setAddress(profileData.address || '')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      const updated = await updateProfile(token, {
        full_name: fullName,
        phone,
        address
      })
      setProfile(updated)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <p>Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <section className={styles.header}>
        <p className={styles.eyebrow}>My Account</p>
        <h1 className={styles.title}>
          {profile?.full_name ? `Welcome, ${profile.full_name.split(' ')[0]}` : 'My Profile'}
        </h1>
        <p className={styles.email}>{user?.email}</p>
      </section>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'orders' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders {orders.length > 0 && `(${orders.length})`}
        </button>
      </div>

      <div className={styles.content}>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className={styles.profileSection}>
            <form className={styles.form} onSubmit={handleSave}>
              <h2 className={styles.sectionTitle}>Personal Details</h2>

              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.successMsg}>Profile updated successfully!</p>}

              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  className={styles.input}
                  value={user?.email}
                  disabled
                />
                <p className={styles.hint}>Email cannot be changed</p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone / WhatsApp</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+965 0000 0000"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Delivery Address</label>
                <textarea
                  className={styles.textarea}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Your delivery address"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className={styles.ordersSection}>
            <h2 className={styles.sectionTitle}>Order History</h2>

            {orders.length === 0 ? (
              <div className={styles.emptyOrders}>
                <p className={styles.emptyText}>You haven't placed any orders yet.</p>
                <button
                  className={styles.shopBtn}
                  onClick={() => navigate('/')}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <p className={styles.orderId}>
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className={styles.orderDate}>
                          {new Date(order.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className={styles.orderRight}>
                        <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                          {order.status}
                        </span>
                        <p className={styles.orderTotal}>KD {Number(order.total).toFixed(3)}</p>
                      </div>
                    </div>

                    {order.order_items && order.order_items.length > 0 && (
                      <div className={styles.orderItems}>
                        {order.order_items.map((item, i) => (
                          <div key={i} className={styles.orderItem}>
                            <img src={item.img} alt={item.product_name} className={styles.orderItemImg} />
                            <div className={styles.orderItemDetails}>
                              <p className={styles.orderItemName}>{item.product_name}</p>
                              <p className={styles.orderItemMeta}>
                                {item.variant_label}
                                {item.size && ` · ${item.size}`}
                                {` · Qty ${item.quantity}`}
                              </p>
                              <p className={styles.orderItemPrice}>{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}