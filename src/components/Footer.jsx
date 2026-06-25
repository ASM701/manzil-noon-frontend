import { useNavigate } from 'react-router-dom'
import LogoMark from './LogoMark'
import styles from './Footer.module.css'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <LogoMark size={32} />
            <span className={styles.brandName}>Manzil Noon</span>
          </div>
          <p className={styles.tagline}>
            A family house of fashion, built with love.
          </p>
        </div>

        <div className={styles.linkGroup}>
          <h4>Shop</h4>
          <ul>
            <li onClick={() => navigate('/new-in')}>New In</li>
            <li onClick={() => navigate('/?category=Robes')}>Robes</li>
            <li onClick={() => navigate('/?category=Ponchos')}>Ponchos</li>
            <li onClick={() => navigate('/?category=Bags')}>Bags</li>
            <li onClick={() => navigate('/?category=Kids')}>Kids</li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Help</h4>
          <ul>
            <li>Size Guide</li>
            <li>Shipping &amp; Returns</li>
            <li onClick={() => navigate('/contact')}>Contact Us</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/manzilnoonkw"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 Manzil Noon. All rights reserved.</span>
        <span>منزل نون</span>
      </div>
    </footer>
  )
}