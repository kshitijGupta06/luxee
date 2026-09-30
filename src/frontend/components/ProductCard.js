'use client';
import Link from 'next/link';
import { formatPrice } from '@/frontend/data/products';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={product.images?.[0] || '/images/products/emerald-amber-vase.jpg'}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/products/emerald-amber-vase.jpg';
          }}
        />
        {product.images?.[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`${styles.image} ${styles.hoverImage}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/products/bud-vase.jpg';
            }}
          />
        )}
        {hasDiscount && (
          <span className={styles.saleBadge}>-{discountPercent}%</span>
        )}
        {!product.inStock && (
          <span className={styles.soldOut}>Sold Out</span>
        )}
        <div className={styles.overlay}>
          <span className={styles.quickView}>Quick View</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
