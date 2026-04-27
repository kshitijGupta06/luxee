import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build');
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'kshh376@gmail.com';

export async function sendOrderNotification(order) {
  try {
    await resend.emails.send({
      from: 'Emkay Home <onboarding@resend.dev>',
      to: NOTIFICATION_EMAIL,
      subject: `🛒 New Order: ${order.orderId} — ₹${order.total}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0E300E;">New Order Received!</h2>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Customer:</strong> ${order.shipping.name} (${order.shipping.email})</p>
          <p><strong>Phone:</strong> ${order.shipping.phone}</p>
          <p><strong>Address:</strong> ${order.shipping.address}, ${order.shipping.city}, ${order.shipping.state} - ${order.shipping.pincode}</p>
          <hr style="border: 1px solid #e2e0da;" />
          <h3 style="color: #c9a96e;">Items</h3>
          ${order.items.map(item => `
            <p>• ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}</p>
          `).join('')}
          <hr style="border: 1px solid #e2e0da;" />
          <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
          <p><strong>Shipping:</strong> ₹${order.shippingCost}</p>
          <p style="font-size: 1.2em;"><strong>Total: ₹${order.total}</strong></p>
          <p><strong>Payment:</strong> ${order.paymentStatus}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send order notification email:', error);
  }
}

export async function sendCustomOrderNotification(customOrder, sampleImage = null, drawingImage = null) {
  try {
    const attachments = [];

    // Helper to strip base64 prefix
    const getBase64Data = (dataUrl) => {
      if (!dataUrl) return null;
      return dataUrl.split(',')[1] || dataUrl;
    };

    if (sampleImage) {
      const content = getBase64Data(sampleImage);
      if (content) attachments.push({ filename: 'user-sample.png', content });
    }

    if (drawingImage) {
      const content = getBase64Data(drawingImage);
      if (content) attachments.push({ filename: 'user-drawing.png', content });
    }

    await resend.emails.send({
      from: 'Emkay Home <onboarding@resend.dev>',
      to: NOTIFICATION_EMAIL,
      subject: `✦ New Custom Order Query: ${customOrder.queryId}`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0E300E;">New Custom Order Query!</h2>
          <p><strong>Query ID:</strong> ${customOrder.queryId}</p>
          <p><strong>Customer:</strong> ${customOrder.name}</p>
          <p><strong>Email:</strong> ${customOrder.email}</p>
          <p><strong>Phone:</strong> ${customOrder.phone}</p>
          <hr style="border: 1px solid #e2e0da;" />
          <h3 style="color: #c9a96e;">Customization Details</h3>
          <p><strong>Product Type:</strong> ${customOrder.productType || 'Not specified'}</p>
          <p><strong>Name to Engrave:</strong> ${customOrder.personName || 'Not specified'}</p>
          <p><strong>Special Date:</strong> ${customOrder.date || 'Not specified'}</p>
          <p><strong>Message:</strong> ${customOrder.message || 'Not specified'}</p>
          <p><strong>Additional Notes:</strong> ${customOrder.notes || 'None'}</p>
          ${attachments.length > 0 ? '<p><i>Attachments are included with this email.</i></p>' : ''}
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send custom order notification email:', error);
  }
}

export async function sendOrderConfirmationToCustomer(order) {
  try {
    await resend.emails.send({
      from: 'Emkay Home <onboarding@resend.dev>',
      to: order.shipping.email,
      subject: `Order Confirmed — ${order.orderId} | Emkay Home`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0E300E;">Thank you for your order, ${order.shipping.name}!</h2>
          <p>Your order <strong>${order.orderId}</strong> has been confirmed.</p>
          <hr style="border: 1px solid #e2e0da;" />
          <h3 style="color: #c9a96e;">Order Summary</h3>
          ${order.items.map(item => `
            <p>• ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}</p>
          `).join('')}
          <hr style="border: 1px solid #e2e0da;" />
          <p style="font-size: 1.2em;"><strong>Total: ₹${order.total}</strong></p>
          <p style="color: #6b6658; font-size: 0.9em;">We'll keep you updated on your order status. For any queries, email us at hello@emkayhome.in</p>
          <p style="color: #c9a96e; margin-top: 1rem;">— Team Emkay Home</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send order confirmation to customer:', error);
  }
}
