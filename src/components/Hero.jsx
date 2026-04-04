import styles from './Hero.module.css'
import LogoMark from './LogoMark'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>New Collection — Spring 2026</p>
        <h1 className={styles.title}>
          Where <em>Elegance</em><br />Finds Its Home
        </h1>
        <p className={styles.sub}>
          Thoughtfully curated women's fashion — each piece a quiet expression
          of grace, crafted for the modern woman.
        </p>
        <button className={styles.btn}>Explore Collection</button>
      </div>

      <div className={styles.accent}>
        <div className={styles.circle}>
          <LogoMark size={300} />
        </div>
      </div>
    </section>
  )
}
