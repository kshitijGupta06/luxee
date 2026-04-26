'use client';
import { useState } from 'react';
import ProductCard from '@/frontend/components/ProductCard';
import { products, categories } from '@/frontend/data/products';
import styles from './shop.module.css';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  let filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Our Collection</h1>
        <p>Explore our complete range of handcrafted glass artistry</p>
      </div>
      <div className="container">
        <div className={styles.filters}>
          <div className={styles.categories}>
            <button className={`${styles.catBtn} ${activeCategory === 'all' ? styles.active : ''}`} onClick={() => setActiveCategory('all')}>All</button>
            {categories.map(cat => (
              <button key={cat.id} className={`${styles.catBtn} ${activeCategory === cat.slug ? styles.active : ''}`} onClick={() => setActiveCategory(cat.slug)}>{cat.name}</button>
            ))}
          </div>
          <select className={styles.sort} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>
        <p className={styles.count}>{filtered.length} products</p>
        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
