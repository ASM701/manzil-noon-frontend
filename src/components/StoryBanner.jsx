import styles from './StoryBanner.module.css'

export default function StoryBanner() {
  return (
    <section className={styles.banner}>
      <p className={styles.eyebrow}>The Story Behind the Name</p>
      <h2 className={styles.title}>
        Manzil Noon — <em>منزل نون</em>
        <br />
      </h2>
      <button className={styles.btn}>Our Story</button>
    </section>
  )
}
