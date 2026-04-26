'use client';
import { useState } from 'react';
import { createCustomOrder } from '@/frontend/lib/store';
import { showToast } from '@/frontend/components/ToastProvider';
import { categories } from '@/frontend/data/products';
import styles from './custom.module.css';

export default function CustomOrderPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', productType: '', personName: '', date: '', message: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCustomOrder(form);
    showToast('Custom order submitted!');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✦</div>
        <h1>Request Received!</h1>
        <p>We will review your custom order and get back to you within 24 hours via email or phone.</p>
        <a href="/shop" className="btn btn-primary">Browse Collection</a>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.tag}>✦ Personalization</p>
        <h1>Create Your Custom Piece</h1>
        <p className={styles.heroDesc}>Tell us your vision and we&apos;ll craft a one-of-a-kind glass piece just for you. Add names, dates, messages, or entirely custom designs.</p>
      </div>
      <div className="container">
        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.section}>
              <h3>Your Details</h3>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label>Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className={styles.field}><label>Email *</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              </div>
              <div className={styles.field}><label>Phone *</label><input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
            </div>
            <div className={styles.section}>
              <h3>Customization Details</h3>
              <div className={styles.field}>
                <label>Product Type</label>
                <select value={form.productType} onChange={e => setForm({...form, productType: e.target.value})}>
                  <option value="">Select a category</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={styles.field}><label>Name to Engrave</label><input value={form.personName} onChange={e => setForm({...form, personName: e.target.value})} placeholder="e.g., John & Jane" /></div>
              <div className={styles.field}><label>Special Date</label><input value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="e.g., 14/02/2025" /></div>
              <div className={styles.field}><label>Message</label><textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your custom message or design idea" /></div>
              <div className={styles.field}><label>Additional Notes</label><textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Any special requirements, size preferences, etc." /></div>
            </div>
            <button type="submit" className="btn btn-gold btn-lg" style={{width:'100%'}}>Submit Custom Order</button>
          </form>

          <div className={styles.infoPanel}>
            <div className={styles.infoCard}>
              <h3>How It Works</h3>
              <div className={styles.infoStep}><span>1</span><div><h4>Submit Request</h4><p>Fill out the form with your customization details</p></div></div>
              <div className={styles.infoStep}><span>2</span><div><h4>Review & Quote</h4><p>We&apos;ll review and send you a quote within 24 hours</p></div></div>
              <div className={styles.infoStep}><span>3</span><div><h4>Approve & Pay</h4><p>Confirm the design and make payment via UPI</p></div></div>
              <div className={styles.infoStep}><span>4</span><div><h4>Handcrafted & Delivered</h4><p>Your custom piece is crafted and delivered with care</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
