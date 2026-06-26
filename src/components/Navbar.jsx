import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { getProfile } from '../lib/api'
import LogoMark from './LogoMark'
import styles from './Navbar.module.css'

const COLLECTIONS = [
  { label: 'Robes', category: 'Robes' },
  { label: 'Ponchos', category: 'Ponchos' },
  { label: 'Bags', category: 'Bags' },
  { label: 'Kids', category: 'Kids' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { totalItems: wishlistCount } = useWishlist()
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const collectionsRef = useRef(null)

  useEffect(() => {
    if (!user || !token) {
      setIsAdmin(false)
      return
    }

    const checkAdmin = async (attempts = 0) => {
      try {
        const profile = await getProfile(token)
        setIsAdmin(profile.is_admin || false)
      } catch {
        if (attempts < 3) {
          setTimeout(() => checkAdmin(attempts + 1), 1500)
        } else {
          setIsAdmin(false)
        }
      }
    }
    checkAdmin()
  }, [user, token])

  useEffect(() => {
    function handleClickOutside(e) {
      if (collectionsRef.current && !collectionsRef.current.contains(e.target)) {
        setCollectionsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  function handleCollection(category) {
    setCollectionsOpen(false)
    navigate(`/?category=${category}`)
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <LogoMark size={36} />
        <span className={styles.brandName}>Manzil Noon</span>
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/new-in">New In</Link></li>
        <li className={styles.collectionsItem} ref={collectionsRef}>
          <button
            className={styles.collectionsBtn}
            onClick={() => setCollectionsOpen(!collectionsOpen)}
          >
            Collections
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {collectionsOpen && (
            <div className={styles.dropdown}>
              {COLLECTIONS.map(col => (
                <button
                  key={col.category}
                  className={styles.dropdownItem}
                  onClick={() => handleCollection(col.category)}
                >
                  {col.label}
                </button>
              ))}
            </div>
          )}
        </li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          aria-label="Wishlist"
          onClick={() => navigate('/wishlist')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
        </button>

        <button
          className={styles.iconBtn}
          aria-label="Shopping bag"
          onClick={() => setIsOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>

        {user ? (
          <div className={styles.userMenu}>
            {isAdmin && (
              <Link to="/admin" className={styles.adminBtn}>Admin</Link>
            )}
            <Link to="/profile" className={styles.authBtn}>
              {user.user_metadata?.full_name?.split(' ')[0] || 'Account'}
            </Link>
            <button className={styles.authBtn} onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.authBtn}>
            Sign In
          </Link>
        )}

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}