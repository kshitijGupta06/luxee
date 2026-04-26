'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCart, clearCart, getUser, createOrder } from '@/frontend/lib/store';
import { initiateRazorpayPayment } from '@/frontend/lib/razorpay';
import { formatPrice } from '@/frontend/data/products';
import { showToast } from '@/frontend/components/ToastProvider';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const c = getCart();
    if (c.length === 0 && !orderPlaced) { router.push('/cart'); return; }
    setCart(c);
    const user = getUser();
    if (user) setForm(f => ({ ...f, name: user.name || '', email: user.email || '', phone: user.phone || '' }));
  }, []);

  if (!mounted) return null;

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = total >= 999 ? 0 : 99;
  const grandTotal = total + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    setProcessing(true);

    try {
      // Step 1: Create Razorpay order
      const rzpRes = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal, receipt: `emk_${Date.now()}` }),
      });
      const rzpData = await rzpRes.json();

      if (!rzpData.success) {
        showToast('Payment initialization failed. Please try again.', 'error');
        setProcessing(false);
        return;
      }

      // Step 2: Open Razorpay checkout
      initiateRazorpayPayment({
        amount: grandTotal,
        orderId: rzpData.order.id,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        onSuccess: async (paymentData) => {
          // Step 3: Save order to database
          const user = getUser();
          const order = await createOrder({
            userId: user?.id || 'guest',
            items: cart,
            shipping: form,
            subtotal: total,
            shippingCost: shipping,
            total: grandTotal,
            paymentMethod: 'razorpay',
            razorpayOrderId: paymentData.razorpayOrderId,
            razorpayPaymentId: paymentData.razorpayPaymentId,
            paymentStatus: 'paid',
          });

          clearCart();
          setOrderPlaced(order);
          showToast('Order placed successfully!');
          setProcessing(false);
        },
        onFailure: (msg) => {
          showToast(msg || 'Payment cancelled', 'error');
          setProcessing(false);
        },
      });
    } catch (error) {
      console.error('Checkout error:', error);
      showToast('Something went wrong. Please try again.', 'error');
      setProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h1>Order Confirmed!</h1>
        <p className={styles.orderId}>Order ID: <strong>{orderPlaced.id}</strong></p>
        <p className={styles.successMsg}>Thank you for your purchase! We&apos;ll send you updates on your order via email.</p>
        <div className={styles.successActions}>
          <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
          <Link href="/account" className="btn btn-secondary">View Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.steps}>
          <span className={step >= 1 ? styles.activeStep : ''}>1. Shipping</span>
          <span className={styles.stepLine} />
          <span className={step >= 2 ? styles.activeStep : ''}>2. Payment</span>
        </div>
        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {step === 1 && (
              <div className={styles.section}>
                <h3>Shipping Details</h3>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label>Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className={styles.field}>
                    <label>Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Phone *</label>
                  <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div className={styles.field}>
                  <label>Address *</label>
                  <textarea required rows={3} value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label>City *</label>
                    <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                  </div>
                  <div className={styles.field}>
                    <label>State *</label>
                    <input required value={form.state} onChange={e => setForm({...form, state: e.target.value})} />
                  </div>
                  <div className={styles.field}>
                    <label>Pincode *</label>
                    <input required value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{width:'100%'}}>Continue to Payment</button>
              </div>
            )}

            {step === 2 && (
              <div className={styles.section}>
                <h3>Payment</h3>
                <div className={styles.upiSection}>
                  <div className={styles.upiHeader}>
                    <span className={styles.upiIcon}>◉</span>
                    <span>Pay securely via Razorpay</span>
                  </div>
                  <div className={styles.upiDetails}>
                    <p>You will be redirected to Razorpay&apos;s secure checkout to complete your payment.</p>
                    <p className={styles.upiNote}>
                      Supports UPI, Credit/Debit Cards, Net Banking, and Wallets. Your payment is 100% secure.
                    </p>
                  </div>
                </div>
                <div className={styles.actionRow}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                  <button type="submit" className="btn btn-gold btn-lg" style={{flex:1}} disabled={processing}>
                    {processing ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryItems}>
              {cart.map((item, i) => (
                <div key={i} className={styles.summaryItem}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className={styles.summaryItemName}>{item.name}</p>
                    <p className={styles.summaryItemQty}>Qty: {item.quantity}</p>
                  </div>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}><span>Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className={styles.summaryRow}><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
