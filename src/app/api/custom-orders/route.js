import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/db';
import CustomOrder from '@/backend/models/CustomOrder';
import { sendCustomOrderNotification } from '@/backend/lib/email';

// POST — Submit a new custom order query
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const queryId = 'CUS' + Date.now().toString().slice(-8);

    const customOrder = await CustomOrder.create({
      queryId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      productType: data.productType || '',
      personName: data.personName || '',
      date: data.date || '',
      message: data.message || '',
      notes: data.notes || '',
    });

    // Send email notification to admin
    await sendCustomOrderNotification(customOrder);

    return NextResponse.json({
      success: true,
      order: {
        id: customOrder.queryId,
        status: customOrder.status,
        createdAt: customOrder.createdAt,
      },
    });
  } catch (error) {
    console.error('Custom order error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit custom order' },
      { status: 500 }
    );
  }
}

// GET — Fetch all custom orders (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');

    if (adminKey !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const orders = await CustomOrder.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Fetch custom orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch custom orders' },
      { status: 500 }
    );
  }
}
