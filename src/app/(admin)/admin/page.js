'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn, adminLogin } from '@/frontend/lib/store';
import styles from '../login/auth.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAdminLoggedIn()) router.push('/admin/dashboard');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = adminLogin(email, password);
    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>Emkay Home Dashboard</p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.field}><label>Email</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@emkayhome.in" /></div>
          <div className={styles.field}><label>Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></div>
          <button type="submit" className="btn btn-primary btn-lg" style={{width:'100%'}}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
