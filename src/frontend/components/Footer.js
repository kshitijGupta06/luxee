import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>Emkay</span>
              <span className={styles.logoAccent}>Home</span>
            </Link>
            <p className={styles.tagline}>
              Handcrafted luxury glass decor for refined living. Every piece tells a story of artisanship and elegance.
            </p>
            <div className={styles.social}>
              <a href="https://www.instagram.com/emkayhome/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4>Shop</h4>
            <Link href="/shop">All Products</Link>
            <Link href="/shop/vases">Vases</Link>
            <Link href="/shop/candle-holders">Candle Holders</Link>
            <Link href="/shop/lamps">Lamps</Link>
            <Link href="/shop/drinkware">Drinkware</Link>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/custom-order">Custom Orders</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Support */}
          <div className={styles.column}>
            <h4>Support</h4>
            <Link href="/policies/shipping">Shipping Policy</Link>
            <Link href="/policies/returns">Return Policy</Link>
            <Link href="/policies/privacy">Privacy Policy</Link>
            <Link href="/policies/terms">Terms of Service</Link>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4>Contact</h4>
            <a href="mailto:hello@emkayhome.in">hello@emkayhome.in</a>
            <a href="https://www.instagram.com/emkayhome/" target="_blank" rel="noopener noreferrer">@emkayhome</a>
            <div className={styles.payment}>
              <p className={styles.paymentLabel}>UPI Payment</p>
              <p className={styles.upi}>7668467448@ybl</p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Emkay Home. All rights reserved.</p>
          <p>Handcrafted with ♥ in India</p>
        </div>
      </div>
    </footer>
  );
}
