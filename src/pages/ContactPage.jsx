import { useEffect } from 'react'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.page}>

      {/* Header */}
      <section className={styles.header}>
        <p className={styles.eyebrow}>Get in Touch</p>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.sub}>
          We'd love to hear from you — whether it's a question about
          an order, sizing, or just saying hello.
        </p>
      </section>

      {/* Content */}
      <section className={styles.content}>

        {/* Contact info */}
        <div className={styles.info}>
          <h2 className={styles.infoTitle}>Reach Us Directly</h2>

          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Email</p>
            <a href="mailto:hello@manzilnoon.com" className={styles.infoValue}>
              hello@manzilnoon.com
            </a>
          </div>

          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Phone / WhatsApp</p>
            <a href="tel:+96500000000" className={styles.infoValue}>
              +965 0000 0000
            </a>
          </div>

          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Based In</p>
            <p className={styles.infoValue}>Kuwait</p>
          </div>

          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Made In</p>
            <p className={styles.infoValue}>Lebanon</p>
          </div>

          <div className={styles.social}>
            <p className={styles.infoLabel}>Follow Us</p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>Instagram</a>
              <a href="#" className={styles.socialLink}>TikTok</a>
              <a href="#" className={styles.socialLink}>Pinterest</a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className={styles.form}>
          <h2 className={styles.infoTitle}>Send a Message</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input type="text" placeholder="Your name" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" placeholder="Your email address" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Subject</label>
            <input type="text" placeholder="What is this about?" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Message</label>
            <textarea
              placeholder="Write your message here..."
              className={styles.textarea}
              rows={5}
            />
          </div>

          <button className={styles.submitBtn}>Send Message</button>
        </div>

      </section>
    </div>
  )
}