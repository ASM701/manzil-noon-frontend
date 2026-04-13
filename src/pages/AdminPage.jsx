import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAdminOrders, updateOrderStatus, updateVariantStock } from '../lib/api'
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
  const [products, setProducts] = useState([])
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrders()
    fetchProducts()
  }, [user])

  async function fetchProducts() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
  }

  async function handleStockUpdate(variantId, newStock) {
    try {
      await updateVariantStock(token, variantId, newStock)
      setProducts(prev =>
        prev.map(p => ({
          ...p,
          product_variants: p.product_variants.map(v =>
            v.id === variantId ? { ...v, stock: newStock } : v
          )
        }))
      )
    } catch (err) {
      console.error('Failed to update stock:', err)
    }
  }

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

      {/* Tabs */}
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${activeTab === 'orders' ? styles.filterActive : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`${styles.filterBtn} ${activeTab === 'inventory' ? styles.filterActive : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
      </div>

      <div className={styles.content}>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            {/* Sub filter bar */}
            <div className={styles.subFilterBar}>
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
          </>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className={styles.inventorySection}>
            <h2 className={styles.sectionTitle}>Stock Management</h2>
            {products.map(product => (
              <div key={product.id} className={styles.inventoryCard}>
                <h3 className={styles.inventoryProductName}>{product.name}</h3>
                <div className={styles.variantsList}>
                  {product.product_variants?.map(variant => (
                    <div key={variant.id} className={styles.variantRow}>
                      <div className={styles.variantInfo}>
                        <span
                          className={styles.variantSwatch}
                          style={{ background: variant.swatch }}
                        />
                        <span className={styles.variantLabel}>{variant.label}</span>
                      </div>
                      <div className={styles.stockControl}>
                        {variant.stock === 0 && (
                          <span className={styles.soldOutTag}>Sold Out</span>
                        )}
                        {variant.stock > 0 && variant.stock <= 3 && (
                          <span className={styles.lowStockTag}>Low Stock</span>
                        )}
                        <button
                          className={styles.stockBtn}
                          onClick={() => handleStockUpdate(variant.id, Math.max(0, variant.stock - 1))}
                        >
                          −
                        </button>
                        <span className={styles.stockNum}>{variant.stock}</span>
                        <button
                          className={styles.stockBtn}
                          onClick={() => handleStockUpdate(variant.id, variant.stock + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}