'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { getProductBySlug, formatPrice } from '@/frontend/data/products';
import { addToCart } from '@/frontend/lib/store';
import { showToast } from '@/frontend/components/ToastProvider';
import styles from './product.module.css';

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({ name: '', date: '', message: '' });
  const [activeTab, setActiveTab] = useState('details');

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    const cust = product.customizable ? customization : {};
    addToCart(product, quantity, cust);
    showToast(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    const cust = product.customizable ? customization : {};
    addToCart(product, quantity, cust);
    window.location.href = '/cart';
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className={styles.productGrid}>
          {/* Images */}
          <div className={styles.images}>
            <div className={styles.mainImage}>
              <img src={product.images[activeImage]} alt={product.name} />
              {hasDiscount && <span className={styles.saleBadge}>Sale</span>}
            </div>
            <div className={styles.thumbs}>
              {product.images.map((img, i) => (
                <button key={i} className={`${styles.thumb} ${i === activeImage ? styles.activeThumb : ''}`} onClick={() => setActiveImage(i)}>
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className={styles.details}>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.priceBlock}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {hasDiscount && (
                <>
                  <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                  <span className={styles.discount}>-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
                </>
              )}
            </div>
            <p className={styles.description}>{product.description}</p>

            {!product.inStock && <p className={styles.outOfStock}>Currently out of stock</p>}

            {/* Customization */}
            {product.customizable && product.inStock && (
              <div className={styles.customization}>
                <h3>Personalize Your Piece</h3>
                <div className={styles.customFields}>
                  <div className={styles.field}>
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" value={customization.name} onChange={e => setCustomization({...customization, name: e.target.value})} />
                  </div>
                  <div className={styles.field}>
                    <label>Date</label>
                    <input type="text" placeholder="DD/MM/YYYY" value={customization.date} onChange={e => setCustomization({...customization, date: e.target.value})} />
                  </div>
                  <div className={styles.field}>
                    <label>Message</label>
                    <input type="text" placeholder="Your special message" value={customization.message} onChange={e => setCustomization({...customization, message: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            {product.inStock && (
              <div className={styles.quantityRow}>
                <span>Quantity</span>
                <div className={styles.quantityControl}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className={styles.actions}>
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart} disabled={!product.inStock} style={{flex:1}}>
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </button>
              {product.inStock && (
                <button className="btn btn-gold btn-lg" onClick={handleBuyNow} style={{flex:1}}>
                  Buy Now
                </button>
              )}
            </div>

            {/* Info Tabs */}
            <div className={styles.tabs}>
              <div className={styles.tabHeader}>
                <button className={activeTab === 'details' ? styles.activeTab : ''} onClick={() => setActiveTab('details')}>Details</button>
                <button className={activeTab === 'delivery' ? styles.activeTab : ''} onClick={() => setActiveTab('delivery')}>Delivery</button>
                <button className={activeTab === 'packaging' ? styles.activeTab : ''} onClick={() => setActiveTab('packaging')}>Packaging</button>
              </div>
              <div className={styles.tabContent}>
                {activeTab === 'details' && (
                  <div>
                    <p>Material: Premium handcrafted glass</p>
                    <p>Care: Hand wash recommended</p>
                    <p>Made in India with love</p>
                  </div>
                )}
                {activeTab === 'delivery' && (
                  <div>
                    <p>Free shipping on orders above ₹999</p>
                    <p>Delivery within 5-7 business days</p>
                    <p>Pan-India delivery available</p>
                  </div>
                )}
                {activeTab === 'packaging' && (
                  <div>
                    <p>Premium branded gift box</p>
                    <p>Protective cushioning for safe transit</p>
                    <p>Complimentary gift card included</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
