'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminLoggedIn, adminLogout, getCustomOrders } from '@/frontend/lib/store';
import { products, formatPrice } from '@/frontend/data/products';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (!isAdminLoggedIn()) { router.push('/admin'); return; }
    // Fetch from API
    const adminKey = JSON.parse(localStorage.getItem('emkay_admin'))?.password;
    fetch(`/api/orders?adminKey=${adminKey}`)
      .then(r => r.json())
      .then(d => { if (d.success) setOrders(d.orders); });
    getCustomOrders().then(o => setCustomOrders(o));
  }, []);

  if (!mounted) return null;

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.adminLogo}>Emkay<span>Admin</span></span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin/dashboard" className={styles.active}>Dashboard</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/products">Products</Link>
        </nav>
        <button className={styles.logoutBtn} onClick={() => { adminLogout(); router.push('/admin'); }}>Logout</button>
      </div>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Revenue</span>
            <span className={styles.statValue}>{formatPrice(totalRevenue)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Orders</span>
            <span className={styles.statValue}>{orders.length}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Products</span>
            <span className={styles.statValue}>{products.length}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Custom Orders</span>
            <span className={styles.statValue}>{customOrders.length}</span>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Recent Orders</h2>
        {orders.length === 0 ? (
          <p className={styles.emptyText}>No orders yet</p>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Order ID</span><span>Date</span><span>Items</span><span>Total</span><span>Status</span>
            </div>
            {orders.slice(0, 10).map(order => (
              <div key={order.orderId || order._id} className={styles.tableRow}>
                <span className={styles.bold}>{order.orderId}</span>
                <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                <span>{order.items?.length || 0} items</span>
                <span>{formatPrice(order.total || 0)}</span>
                <span className={`${styles.statusBadge} ${styles[order.status]}`}>{order.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
