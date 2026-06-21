import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../lib/api'
import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

const CATEGORIES = ['All', 'Robes', 'Ponchos', 'Bags', 'Kids']

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [active, setActive] = useState(categoryParam || 'All')

  useEffect(() => {
    if (categoryParam) {
      setActive(categoryParam)
    }
  }, [categoryParam])

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

  function handleFilter(cat) {
    setActive(cat)
    if (cat === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

  const filtered =
    active === 'All' ? products : products.filter(p => p.category === active)

  return (
    <>
      <div className={styles.filterBar} id="products">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${active === cat ? styles.active : ''}`}
            onClick={() => handleFilter(cat)}
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