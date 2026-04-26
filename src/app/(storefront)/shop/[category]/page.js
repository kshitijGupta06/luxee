'use client';
import { use } from 'react';
import ProductCard from '@/frontend/components/ProductCard';
import { getProductsByCategory, getCategoryBySlug, categories } from '@/frontend/data/products';
import Link from 'next/link';
import styles from '../shop.module.css';

export default function CategoryPage({ params }) {
  const { category } = use(params);
  const cat = getCategoryBySlug(category);
  const prods = getProductsByCategory(category);

  if (!cat) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1>Category Not Found</h1>
          <p><Link href="/shop">← Back to Shop</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>{cat.name}</h1>
        <p>{cat.description}</p>
      </div>
      <div className="container">
        <div className={styles.filters}>
          <div className={styles.categories}>
            <Link href="/shop" className={styles.catBtn}>All</Link>
            {categories.map(c => (
              <Link key={c.id} href={`/shop/${c.slug}`} className={`${styles.catBtn} ${c.slug === category ? styles.active : ''}`}>{c.name}</Link>
            ))}
          </div>
        </div>
        <p className={styles.count}>{prods.length} products</p>
        <div className={styles.grid}>
          {prods.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
