import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAdminOrders, updateOrderStatus } from '../lib/api'
import styles from './AdminPage.module.css'

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default function AdminPage() {
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrders()
  }, [user])

  async function fetchOrders() {
    try {
      const data = await getAdminOrders(token)
      setOrders(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(orderId, status) {
    try {
      await updateOrderStatus(token, orderId, status)
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status } : o)
      )
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const filtered = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter)

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <p>Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.loadingWrap}>
        <p className={styles.error}>Access denied or failed to load orders.</p>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <section className={styles.header}>
        <p className={styles.eyebrow}>Manzil Noon</p>
        <h1 className={styles.title}>Admin Dashboard</h1>
      </section>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <p className={styles.statNumber}>{stats.total}</p>
          <p className={styles.statLabel}>Total Orders</p>
        </div>
        <div className={styles.statCard}>
          <p className={`${styles.statNumber} ${styles.pending}`}>{stats.pending}</p>
          <p className={styles.statLabel}>Pending</p>
        </div>
        <div className={styles.statCard}>
          <p className={`${styles.statNumber} ${styles.confirmed}`}>{stats.confirmed}</p>
          <p className={styles.statLabel}>Confirmed</p>
        </div>
        <div className={styles.statCard}>
          <p className={`${styles.statNumber} ${styles.shipped}`}>{stats.shipped}</p>
          <p className={styles.statLabel}>Shipped</p>
        </div>
        <div className={styles.statCard}>
          <p className={`${styles.statNumber} ${styles.delivered}`}>{stats.delivered}</p>
          <p className={styles.statLabel}>Delivered</p>
        </div>
      </div>

      {/* Filter */}
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${filter === 'all' ? styles.filterActive : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({orders.length})
        </button>
        {STATUSES.map(s => (
          <button
            key={s}
            className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`}
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({orders.filter(o => o.status === s).length})
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className={styles.content}>
        {filtered.length === 0 ? (
          <p className={styles.emptyText}>No orders found.</p>
        ) : (
          <div className={styles.ordersList}>
            {filtered.map(order => (
              <div key={order.id} className={styles.orderCard}>

                {/* Order Header */}
                <div
                  className={styles.orderHeader}
                  onClick={() => setExpandedOrder(
                    expandedOrder === order.id ? null : order.id
                  )}
                >
                  <div className={styles.orderLeft}>
                    <p className={styles.orderId}>
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className={styles.orderCustomer}>
                      {order.profiles?.full_name || 'Unknown'} — {order.email}
                    </p>
                    <p className={styles.orderDate}>
                      {new Date(order.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className={styles.orderRight}>
                    <p className={styles.orderTotal}>
                      KD {Number(order.total).toFixed(3)}
                    </p>
                    <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                      {order.status}
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="1.5"
                      className={`${styles.chevron} ${expandedOrder === order.id ? styles.chevronUp : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order.id && (
                  <div className={styles.orderDetails}>

                    {/* Customer Info */}
                    <div className={styles.customerInfo}>
                      <div className={styles.customerItem}>
                        <p className={styles.customerLabel}>Phone</p>
                        <p className={styles.customerValue}>
                          {order.profiles?.phone || '—'}
                        </p>
                      </div>
                      <div className={styles.customerItem}>
                        <p className={styles.customerLabel}>Address</p>
                        <p className={styles.customerValue}>
                          {order.profiles?.address || '—'}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className={styles.orderItems}>
                      <p className={styles.itemsTitle}>Items</p>
                      {order.order_items?.map((item, i) => (
                        <div key={i} className={styles.item}>
                          <img
                            src={item.img}
                            alt={item.product_name}
                            className={styles.itemImg}
                          />
                          <div className={styles.itemDetails}>
                            <p className={styles.itemName}>{item.product_name}</p>
                            <p className={styles.itemMeta}>
                              {item.variant_label}
                              {item.size && ` · ${item.size}`}
                              {` · Qty ${item.quantity}`}
                            </p>
                            <p className={styles.itemPrice}>{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Status Update */}
                    <div className={styles.statusUpdate}>
                      <p className={styles.statusLabel}>Update Status</p>
                      <div className={styles.statusBtns}>
                        {STATUSES.map(s => (
                          <button
                            key={s}
                            className={`${styles.statusBtn} ${order.status === s ? styles.statusBtnActive : ''}`}
                            onClick={() => handleStatusChange(order.id, s)}
                          >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}