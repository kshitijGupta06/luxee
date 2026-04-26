'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminLoggedIn, adminLogout, updateOrderStatus } from '@/frontend/lib/store';
import { formatPrice } from '@/frontend/data/products';
import { showToast } from '@/frontend/components/ToastProvider';
import styles from '../admin.module.css';

export default function AdminOrdersPage() {
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchOrders = () => {
    if (typeof window === 'undefined') return;
    const adminKey = JSON.parse(localStorage.getItem('emkay_admin'))?.password;
    fetch(`/api/orders?adminKey=${adminKey}`)
      .then(r => r.json())
      .then(d => { 
        if (d.success) setOrders(d.orders); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setMounted(true);
    if (!isAdminLoggedIn()) { router.push('/admin'); return; }
    fetchOrders();
  }, [router]);

  if (!mounted) return null;

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedOrder = await updateOrderStatus(orderId, newStatus);
    if (updatedOrder) {
      setOrders(prev => prev.map(o => o._id === orderId || o.orderId === orderId ? { ...o, status: newStatus } : o));
      showToast(`Order updated to ${newStatus}`);
    } else {
      showToast('Failed to update order', 'error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}><span className={styles.adminLogo}>Emkay<span>Admin</span></span></div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/orders" className={styles.active}>Orders</Link>
          <Link href="/admin/products">Products</Link>
        </nav>
        <button className={styles.logoutBtn} onClick={() => { adminLogout(); router.push('/admin'); }}>Logout</button>
      </div>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>Orders ({orders.length})</h1>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className={styles.emptyText}>No orders yet</p>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Order ID</span><span>Customer</span><span>Items</span><span>Total</span><span>Status</span>
            </div>
            {orders.map(order => (
              <div key={order.orderId || order._id} className={styles.tableRow}>
                <span className={styles.bold}>{order.orderId}</span>
                <span>{order.shipping?.name || 'Guest'}</span>
                <span>{order.items?.length || 0} items</span>
                <span>{formatPrice(order.total || 0)}</span>
                <select value={order.status} onChange={e => handleStatusChange(order._id || order.orderId, e.target.value)} className={styles.actionBtn}>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
