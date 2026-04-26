'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/frontend/lib/store';
import styles from '../login/auth.module.css';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    const result = await registerUser(form);
    if (result.success) {
      router.push('/account');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join Emkay Home for exclusive access</p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" />
          </div>
          <div className={styles.field}>
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Min 6 characters" />
          </div>
          <div className={styles.field}>
            <label>Confirm Password</label>
            <input type="password" required value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{width:'100%'}}>Create Account</button>
        </form>
        <p className={styles.switchText}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
