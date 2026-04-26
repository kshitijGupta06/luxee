import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/db';
import Order from '@/backend/models/Order';
import { sendOrderNotification, sendOrderConfirmationToCustomer } from '@/backend/lib/email';

// POST — Create a new order
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const orderId = 'EMK' + Date.now().toString().slice(-8);

    const order = await Order.create({
      orderId,
      userId: data.userId || 'guest',
      items: data.items,
      shipping: data.shipping,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      total: data.total,
      paymentMethod: data.paymentMethod || 'razorpay',
      razorpayOrderId: data.razorpayOrderId || '',
      razorpayPaymentId: data.razorpayPaymentId || '',
      paymentStatus: data.paymentStatus || 'pending',
      status: 'confirmed',
      timeline: [
        { status: 'confirmed', date: new Date(), note: 'Order confirmed' },
      ],
    });

    // Send email notifications
    await sendOrderNotification(order);
    await sendOrderConfirmationToCustomer(order);

    return NextResponse.json({
      success: true,
      order: {
        id: order.orderId,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET — Fetch orders (admin: all, user: by userId)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    const userId = searchParams.get('userId');

    await dbConnect();

    if (adminKey === process.env.ADMIN_PASSWORD) {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, orders });
    }

    if (userId) {
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, orders });
    }

    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
