import styles from './about.module.css';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.tag}>✦ Our Story</p>
        <h1>Emkay Home</h1>
        <p className={styles.heroDesc}>Where artisan craftsmanship meets modern elegance. Each glass piece we create is a labour of love, designed to transform your spaces into sanctuaries of beauty.</p>
      </section>

      <section className={`section ${styles.story}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h2>The Art of Glass</h2>
              <p>Emkay Home was born from a passion for exceptional craftsmanship and a belief that everyday objects should be extraordinary. Our artisans bring decades of experience to each piece, using time-honoured techniques that have been perfected over generations.</p>
              <p>From vases that capture light like jewels to candle holders that cast mesmerizing patterns, every creation in our collection is handcrafted with meticulous attention to detail. We source the finest materials and work with master craftspeople who share our vision of excellence.</p>
              <p>Our mission is simple: to bring the beauty of artisan glass into homes across India, offering pieces that are not just functional, but truly works of art.</p>
            </div>
            <div className={styles.storyImage}>
              <img src="https://emkayhome.in/cdn/shop/files/IMG_2954.jpg?v=1740741117&width=800" alt="Artisan glass craftsmanship" />
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.values}`}>
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="gold-line" />
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>◇</span>
              <h3>Artisan Quality</h3>
              <p>Every piece is handcrafted by skilled artisans, ensuring uniqueness and exceptional quality in each creation.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>♥</span>
              <h3>Made with Love</h3>
              <p>We pour our heart into every piece, from the initial design to the final polish, ensuring it arrives perfect.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>✦</span>
              <h3>Sustainable Craft</h3>
              <p>We are committed to eco-friendly practices, using recyclable packaging and sustainable materials wherever possible.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container" style={{textAlign:'center'}}>
          <h2>Ready to Discover?</h2>
          <p style={{color:'var(--color-gray-500)', maxWidth:'500px', margin:'1rem auto 2rem', fontWeight: 300}}>
            Explore our curated collection and find the perfect piece for your home or as a gift for someone special.
          </p>
          <div style={{display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap'}}>
            <Link href="/shop" className="btn btn-primary btn-lg">Shop Collection</Link>
            <Link href="/custom-order" className="btn btn-gold btn-lg">Custom Order</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
