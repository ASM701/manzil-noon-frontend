import { useState, useEffect } from 'react'
import { getProducts } from '../lib/api'
import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

const CATEGORIES = ['All', 'Robes', 'Ponchos', 'Bags']

export default function ProductGrid() {
  const [active, setActive] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered =
    active === 'All' ? products : products.filter(p => p.category === active)

  return (
    <>
      <div className={styles.filterBar}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${active === cat ? styles.active : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Products</h2>
          <span className={styles.count}>
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {loading && <p className={styles.empty}>Loading products...</p>}
        {error && <p className={styles.empty}>Failed to load products.</p>}

        {!loading && !error && (
          <div className={styles.grid}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className={styles.empty}>No products in this category yet.</p>
        )}
      </section>
    </>
  )
}