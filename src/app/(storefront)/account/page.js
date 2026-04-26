'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser, getUserOrders, logoutUser } from '@/frontend/lib/store';
import { formatPrice } from '@/frontend/data/products';
import styles from './account.module.css';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState('orders');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const u = getUser();
    if (!u) { router.push('/login'); return; }
    setUser(u);
    getUserOrders().then(o => setOrders(o));
  }, []);

  if (!mounted || !user) return null;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1>My Account</h1>
            <p className={styles.email}>{user.email}</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => { logoutUser(); router.push('/'); }}>Logout</button>
        </div>

        <div className={styles.tabs}>
          <button className={tab === 'orders' ? styles.activeTab : ''} onClick={() => setTab('orders')}>Orders</button>
          <button className={tab === 'profile' ? styles.activeTab : ''} onClick={() => setTab('profile')}>Profile</button>
        </div>

        {tab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className={styles.empty}>
                <p>No orders yet</p>
                <Link href="/shop" className="btn btn-primary btn-sm">Start Shopping</Link>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map(order => (
                  <div key={order.orderId || order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderId}>#{order.orderId || order.id}</span>
                        <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <span className={`${styles.status} ${styles[order.status]}`}>{order.status}</span>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items.map((item, i) => (
                        <div key={i} className={styles.orderItem}>
                          <img src={item.image} alt={item.name} />
                          <div>
                            <p>{item.name}</p>
                            <p className={styles.orderItemMeta}>Qty: {item.quantity} · {formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderFooter}>
                      <span>Total: {formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'profile' && (
          <div className={styles.profileCard}>
            <div className={styles.profileRow}><span>Name</span><span>{user.name}</span></div>
            <div className={styles.profileRow}><span>Email</span><span>{user.email}</span></div>
            <div className={styles.profileRow}><span>Phone</span><span>{user.phone || 'Not set'}</span></div>
            <div className={styles.profileRow}><span>Member Since</span><span>{new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
