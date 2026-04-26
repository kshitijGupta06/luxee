export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiateRazorpayPayment({ amount, orderId, customerName, customerEmail, customerPhone, onSuccess, onFailure }) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert('Razorpay SDK failed to load. Please check your internet connection.');
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100),
    currency: 'INR',
    name: 'Emkay Home',
    description: 'Luxury Glass Decor & Gifts',
    order_id: orderId,
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    theme: {
      color: '#0E300E',
    },
    handler: function (response) {
      onSuccess({
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      });
    },
    modal: {
      ondismiss: function () {
        if (onFailure) onFailure('Payment cancelled');
      },
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
