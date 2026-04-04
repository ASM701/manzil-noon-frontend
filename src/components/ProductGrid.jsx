import { useState } from 'react'
import { products, CATEGORIES } from '../data/products'
import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

export default function ProductGrid() {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? products : products.filter(p => p.category === active)

  return (
    <>
      {/* Filter bar */}
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

      {/* Products */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Products</h2>
          <span className={styles.count}>
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No products in this category yet.</p>
        )}
      </section>
    </>
  )
}
