import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'
import styles from './NewInPage.module.css'

export default function NewInPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    getProducts()
      .then(data => {
        const newProducts = data.filter(p => p.badge === 'New')
        setProducts(newProducts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <p className={styles.eyebrow}>Just Arrived</p>
        <h1 className={styles.title}>New In</h1>
        <p className={styles.sub}>
          The latest additions to Manzil Noon — fresh pieces worth discovering.
        </p>
      </section>

      <section className={styles.content}>
        {loading && <p className={styles.empty}>Loading...</p>}

        {!loading && products.length === 0 && (
          <div className={styles.emptyWrap}>
            <p className={styles.empty}>No new products at the moment.</p>
            <button className={styles.shopBtn} onClick={() => navigate('/')}>
              Browse All Products
            </button>
          </div>
        )}

        {!loading && products.length > 0 && (
          <>
            <p className={styles.count}>{products.length} {products.length === 1 ? 'piece' : 'pieces'}</p>
            <div className={styles.grid}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}