import { useEffect } from 'react'
import styles from './AboutPage.module.css'
import LogoMark from '../components/LogoMark'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Our Story</p>
        <h1 className={styles.heroTitle}>
          Loungewear made with<br /><em>Lebanese craft,</em><br />worn with Kuwaiti grace.
        </h1>
      </section>

      {/* Intro */}
      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <div className={styles.introText}>
            <h2 className={styles.sectionTitle}>Who We Are</h2>
            <p>
              Manzil Noon — منزل نون — is a brand rooted in two cultures.
              We are a Kuwaiti brand with a deep appreciation for quality,
              elegance, and the art of dressing well at home. Manzil noon is the
              house of the ultimate loungewear.
            </p>
            <p>
              We believe loungewear should never mean compromise. Every piece
              we carry is designed to make you feel put-together, graceful, and
              comfortable — whether you're at home or stepping out.
            </p>
          </div>
          <div className={styles.introAccent}>
            <div className={styles.accentBox}>
              <LogoMark size={72} />
              <p className={styles.accentText}>منزل نون</p>
              <p className={styles.accentSub}>House of Nada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Made in Lebanon */}
      <section className={styles.lebanon}>
        <div className={styles.lebanonInner}>
          <p className={styles.eyebrowLight}>Craftsmanship</p>
          <h2 className={styles.lebanonTitle}>Made in Lebanon</h2>
          <p className={styles.lebanonText}>
            Our products are proudly crafted in Lebanon — a country with a
            rich heritage of textile artistry, fine embroidery, and
            generations of skilled makers. Every robe, poncho, and lounge
            piece is produced with care and attention to detail that
            mass production simply cannot replicate.
          </p>
          <p className={styles.lebanonText}>
            By sourcing from Lebanese artisans, we support local craft while
            delivering a product that carries genuine soul. You can feel the
            difference in every stitch.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <p className={styles.eyebrow}>What We Stand For</p>
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Our Values
        </h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueNumber}>01</div>
            <h3 className={styles.valueTitle}>Craftsmanship</h3>
            <p className={styles.valueText}>
              Every piece is handcrafted in Lebanon by skilled artisans
              who take pride in their work. Quality is never an afterthought.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueNumber}>02</div>
            <h3 className={styles.valueTitle}>Elegance at Home</h3>
            <p className={styles.valueText}>
              We design for women who refuse to choose between comfort and
              style. Loungewear should feel as beautiful as it looks.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueNumber}>03</div>
            <h3 className={styles.valueTitle}>Family First</h3>
            <p className={styles.valueText}>
              This brand was built by a family, for families. Every decision
              we make is guided by the values that were instilled in us.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueNumber}>04</div>
            <h3 className={styles.valueTitle}>Rooted in Kuwait</h3>
            <p className={styles.valueText}>
              Based in Kuwait, we dress women who appreciate refinement.
              Our collections are curated with the Kuwaiti woman in mind.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <p className={styles.eyebrowLight}>Ready to explore?</p>
        <h2 className={styles.ctaTitle}>Discover the Collection</h2>
        <a href="/" className={styles.ctaBtn}>Shop Now</a>
      </section>

    </div>
  )
}