'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCart, updateCartQuantity, removeFromCart, getCartTotal, formatPrice } from '@/frontend/lib/store';
import { formatPrice as fp } from '@/frontend/data/products';
import styles from './cart.module.css';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
    const handler = () => setCart(getCart());
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, []);

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total >= 999 ? 0 : 99;

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛍</div>
        <h2>Your Cart is Empty</h2>
        <p>Discover our handcrafted glass collection and find something special.</p>
        <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles.layout}>
          <div className={styles.items}>
            {cart.map((item, index) => (
              <div key={index} className={styles.item}>
                <Link href={`/product/${item.slug}`} className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className={styles.itemInfo}>
                  <Link href={`/product/${item.slug}`} className={styles.itemName}>{item.name}</Link>
                  {item.customization && Object.values(item.customization).some(v => v) && (
                    <div className={styles.customBadges}>
                      {item.customization.name && <span>Name: {item.customization.name}</span>}
                      {item.customization.date && <span>Date: {item.customization.date}</span>}
                      {item.customization.message && <span>Msg: {item.customization.message}</span>}
                    </div>
                  )}
                  <p className={styles.itemPrice}>{fp(item.price)}</p>
                  <div className={styles.itemActions}>
                    <div className={styles.qty}>
                      <button onClick={() => updateCartQuantity(index, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(index, item.quantity + 1)}>+</button>
                    </div>
                    <button className={styles.remove} onClick={() => removeFromCart(index)}>Remove</button>
                  </div>
                </div>
                <p className={styles.lineTotal}>{fp(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{fp(total)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : fp(shipping)}</span>
            </div>
            {shipping > 0 && <p className={styles.freeShipNote}>Free shipping on orders above ₹999</p>}
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{fp(total + shipping)}</span>
            </div>
            <Link href="/checkout" className="btn btn-gold btn-lg" style={{width:'100%'}}>
              Proceed to Checkout
            </Link>
            <Link href="/shop" className={styles.continueLink}>← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
