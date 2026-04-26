'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCartCount, getUser, logoutUser } from '@/frontend/lib/store';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const updateCart = () => setCartCount(getCartCount());
    const updateAuth = () => setUser(getUser());

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cartUpdated', updateCart);
    window.addEventListener('authUpdated', updateAuth);

    handleScroll();
    updateCart();
    updateAuth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('authUpdated', updateAuth);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    setUserMenuOpen(false);
  };

  const isHome = pathname === '/';

  return (
    <nav className={`${styles.navbar} ${styles.scrolled} ${!isHome ? styles.dark : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Emkay</span>
          <span className={styles.logoAccent}>Home</span>
        </Link>

        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
          <Link href="/shop" className={pathname.startsWith('/shop') ? styles.active : ''}>Shop</Link>
          <Link href="/custom-order" className={pathname === '/custom-order' ? styles.active : ''}>Customize</Link>
          <Link href="/about" className={pathname === '/about' ? styles.active : ''}>About</Link>
        </div>

        <div className={styles.actions}>
          {/* Cart */}
          <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          {/* User */}
          {user ? (
            <div className={styles.userMenu}>
              <button className={styles.iconBtn} onClick={() => setUserMenuOpen(!userMenuOpen)} aria-label="Account">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {userMenuOpen && (
                <div className={styles.dropdown}>
                  <p className={styles.greeting}>Hi, {user.name?.split(' ')[0]}</p>
                  <Link href="/account">My Account</Link>
                  <Link href="/account#orders">My Orders</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.iconBtn} aria-label="Login">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
