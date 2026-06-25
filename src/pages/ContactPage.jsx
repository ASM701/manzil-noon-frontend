import { useState, useEffect } from 'react'
import styles from './ContactPage.module.css'
import { sendContactMessage } from '../lib/api'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await sendContactMessage(name, email, subject, message)
      setSuccess(true)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
            <a href="mailto:Manzilnoon@hotmail.com" className={styles.infoValue}>
              Manzilnoon@hotmail.com
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
              <a
                href="https://www.instagram.com/manzilnoonkw"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className={styles.form}>
          <h2 className={styles.infoTitle}>Send a Message</h2>

          {success && (
            <div className={styles.successMsg}>
              ✓ Your message has been sent! We'll get back to you soon.
            </div>
          )}

          {error && (
            <div className={styles.errorMsg}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={styles.input}
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Subject</label>
              <input
                type="text"
                placeholder="What is this about?"
                className={styles.input}
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                placeholder="Write your message here..."
                className={styles.textarea}
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </section>
    </div>
  )
}