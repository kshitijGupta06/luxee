'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminLoggedIn, adminLogout } from '@/frontend/lib/store';
import { products, categories, formatPrice } from '@/frontend/data/products';
import styles from '../admin.module.css';

export default function AdminProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (!isAdminLoggedIn()) { router.push('/admin'); return; }
  }, []);

  if (!mounted) return null;

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}><span className={styles.adminLogo}>Emkay<span>Admin</span></span></div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/products" className={styles.active}>Products</Link>
        </nav>
        <button className={styles.logoutBtn} onClick={() => { adminLogout(); router.push('/admin'); }}>Logout</button>
      </div>
      <div className={styles.main}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
          <h1 className={styles.pageTitle} style={{marginBottom:0}}>Products ({filtered.length})</h1>
          <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.actionBtn} style={{padding:'8px 14px'}}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div className={styles.productList}>
          {filtered.map(product => (
            <div key={product.id} className={styles.productRow}>
              <img src={product.images[0]} alt={product.name} />
              <div className={styles.productInfo}>
                <h4>{product.name}</h4>
                <p>{product.category} · {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
              </div>
              <span style={{fontWeight:600, marginRight:'1rem'}}>{formatPrice(product.price)}</span>
              {product.originalPrice && <span style={{textDecoration:'line-through', color:'var(--color-gray-400)', fontSize:'0.85rem'}}>{formatPrice(product.originalPrice)}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
