'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductCard from '@/frontend/components/ProductCard';
import { categories, getFeaturedProducts, testimonials, formatPrice } from '@/frontend/data/products';
import styles from './page.module.css';

function useScrollAnimation() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const elements = ref.current?.querySelectorAll(`.${styles.animateIn}`);
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function HomePage() {
  const sectionRef = useScrollAnimation();
  const featured = getFeaturedProducts();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroOrbs}>
          <div className={`${styles.orb} ${styles.orb1}`} />
          <div className={`${styles.orb} ${styles.orb2}`} />
          <div className={`${styles.orb} ${styles.orb3}`} />
          <div className={`${styles.orb} ${styles.orb4}`} />
          <div className={`${styles.orb} ${styles.orb5}`} />
          <div className={`${styles.orb} ${styles.orb6}`} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroTag}>✦ Handcrafted Excellence</p>
          <h1 className={styles.heroTitle}>
            Luxury Customized<br />
            <span className={styles.heroAccent}>Glass Decor & Gifts</span>
          </h1>
          <p className={styles.heroDesc}>
            Artisan-crafted glass pieces that transform spaces into sanctuaries of elegance.
            Each creation is a testimony to timeless craftsmanship.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/shop" className="btn btn-white btn-lg">Shop Now</Link>
            <Link href="/custom-order" className="btn btn-secondary btn-lg" style={{borderColor:'rgba(255,255,255,0.4)',color:'white'}}>Customize Your Gift</Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <p className={`section-subtitle ${styles.animateIn}`} style={{marginBottom:'0.5rem', fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-gold)'}}>Collections</p>
          <h2 className={`section-title ${styles.animateIn}`}>Shop by Category</h2>
          <div className="gold-line" />
          <p className={`section-subtitle ${styles.animateIn}`}>Explore our curated collections of handcrafted glass artistry</p>
          <div className={styles.categoryGrid}>
            {categories.map((cat, i) => (
              <Link href={`/shop/${cat.slug}`} key={cat.id} className={`${styles.categoryCard} ${styles.animateIn}`} style={{animationDelay: `${i * 0.1}s`}}>
                <div className={styles.categoryImage}>
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className={styles.categoryInfo}>
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                  <span className={styles.categoryLink}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <p className={`section-subtitle ${styles.animateIn}`} style={{marginBottom:'0.5rem', fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-gold)'}}>Curated Selection</p>
          <h2 className={`section-title ${styles.animateIn}`}>Featured Products</h2>
          <div className="gold-line" />
          <p className={`section-subtitle ${styles.animateIn}`}>Our most sought-after pieces, chosen for their exceptional beauty and craftsmanship</p>
          <div className={styles.productGrid}>
            {featured.slice(0, 8).map((product, i) => (
              <div key={product.id} className={styles.animateIn} style={{animationDelay: `${i * 0.08}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className={`${styles.centerBtn} ${styles.animateIn}`}>
            <Link href="/shop" className="btn btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className={`section ${styles.customSection}`}>
        <div className="container">
          <div className={styles.customGrid}>
            <div className={`${styles.customContent} ${styles.animateIn}`}>
              <p className={styles.customTag}>✦ Personalization</p>
              <h2>Make It Uniquely Yours</h2>
              <p className={styles.customDesc}>
                Transform any piece into a one-of-a-kind gift. Add names, dates, special messages, 
                or custom designs to create something truly personal and meaningful.
              </p>
              <div className={styles.customFeatures}>
                <div className={styles.customFeature}>
                  <span className={styles.featureIcon}>✎</span>
                  <div>
                    <h4>Custom Engraving</h4>
                    <p>Names, dates, and messages etched with precision</p>
                  </div>
                </div>
                <div className={styles.customFeature}>
                  <span className={styles.featureIcon}>❖</span>
                  <div>
                    <h4>Bespoke Designs</h4>
                    <p>Share your vision and we will bring it to life</p>
                  </div>
                </div>
                <div className={styles.customFeature}>
                  <span className={styles.featureIcon}>♥</span>
                  <div>
                    <h4>Gift Ready</h4>
                    <p>Premium packaging for the perfect presentation</p>
                  </div>
                </div>
              </div>
              <Link href="/custom-order" className="btn btn-gold btn-lg">Start Custom Order</Link>
            </div>
            <div className={`${styles.customVisual} ${styles.animateIn}`}>
              <div className={styles.customImageWrap}>
                <img src="/custom-engraving.png" alt="Custom engraved glass" loading="lazy" />
                <div className={styles.floatingLabel}>
                  <span>Personalized</span>
                  <span>Just for You</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <p className={`section-subtitle ${styles.animateIn}`} style={{marginBottom:'0.5rem', fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-gold)'}}>Our Craft</p>
          <h2 className={`section-title ${styles.animateIn}`}>How We Create</h2>
          <div className="gold-line" />
          <p className={`section-subtitle ${styles.animateIn}`}>Every piece passes through expert hands, ensuring perfection at each stage</p>
          <div className={styles.processGrid}>
            {[
              { step: '01', icon: '◇', title: 'Design', desc: 'Each piece starts as a vision, carefully sketched and refined to perfection' },
              { step: '02', icon: '✦', title: 'Handcraft', desc: 'Master artisans shape molten glass using centuries-old techniques' },
              { step: '03', icon: '✎', title: 'Personalize', desc: 'Your custom message or design is carefully engraved by skilled hands' },
              { step: '04', icon: '❖', title: 'Package & Deliver', desc: 'Premium gift packaging ensures your piece arrives in pristine condition' }
            ].map((item, i) => (
              <div key={i} className={`${styles.processCard} ${styles.animateIn}`} style={{animationDelay: `${i * 0.12}s`}}>
                <span className={styles.processStep}>{item.step}</span>
                <span className={styles.processIcon}>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`section ${styles.testimonialSection}`}>
        <div className="container">
          <p className={`section-subtitle ${styles.animateIn}`} style={{marginBottom:'0.5rem', fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-gold)'}}>Testimonials</p>
          <h2 className={`section-title ${styles.animateIn}`}>What Our Customers Say</h2>
          <div className="gold-line" />
          <div className={`${styles.testimonialCarousel} ${styles.animateIn}`}>
            {testimonials.map((t, i) => (
              <div key={t.id} className={`${styles.testimonialCard} ${i === currentTestimonial ? styles.activeTestimonial : ''}`}>
                <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>{t.name[0]}</div>
                  <div>
                    <p className={styles.authorName}>{t.name}</p>
                    <p className={styles.authorLocation}>{t.location} · {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.testimonialDots}>
            {testimonials.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === currentTestimonial ? styles.activeDot : ''}`} onClick={() => setCurrentTestimonial(i)} aria-label={`Testimonial ${i+1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM PACKAGING */}
      <section className={`section ${styles.packagingSection}`}>
        <div className="container">
          <div className={styles.packagingGrid}>
            <div className={`${styles.packagingVisual} ${styles.animateIn}`}>
              <img src="/premium-packaging.png" alt="Premium gift packaging" loading="lazy" />
            </div>
            <div className={`${styles.packagingContent} ${styles.animateIn}`}>
              <p className={styles.customTag}>✦ Gift-Ready</p>
              <h2>Premium Packaging</h2>
              <p className={styles.customDesc}>
                Every piece is nestled in our signature packaging — designed to make the unboxing 
                experience as memorable as the gift itself. From the outer box to the inner lining, 
                every detail speaks luxury.
              </p>
              <ul className={styles.packagingList}>
                <li>Signature branded box with magnetic closure</li>
                <li>Protective cushioning for safe delivery</li>
                <li>Personalized gift card included</li>
                <li>Eco-friendly, recyclable materials</li>
              </ul>
              <Link href="/shop" className="btn btn-primary">Shop Gift-Ready Products</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
