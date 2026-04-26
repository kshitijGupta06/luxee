import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/db';
import Order from '@/backend/models/Order';

// PATCH — Update order status (admin only)
export async function PATCH(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');

    if (adminKey !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { status, note } = await request.json();
    const { id } = await params;

    const order = await Order.findOne({ orderId: id });
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    order.status = status;
    order.timeline.push({
      status,
      date: new Date(),
      note: note || `Order ${status}`,
    });

    await order.save();

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update order' },
      { status: 500 }
    );
  }
}
