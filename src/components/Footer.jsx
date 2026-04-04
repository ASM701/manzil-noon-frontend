import LogoMark from './LogoMark'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <LogoMark size={32} />
            <span className={styles.brandName}>Manzil Noon</span>
          </div>
          <p className={styles.tagline}>
            A house of fashion, built with love.
          </p>
        </div>

        <div className={styles.linkGroup}>
          <h4>Shop</h4>
          <ul>
            <li>New In</li>
            <li>Dresses</li>
            <li>Tops &amp; Sets</li>
            <li>Bottoms</li>
            <li>Outerwear</li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Help</h4>
          <ul>
            <li>Size Guide</li>
            <li>Shipping &amp; Returns</li>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h4>Follow Us</h4>
          <ul>
            <li>Instagram</li>
            <li>TikTok</li>
            <li>Pinterest</li>
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
