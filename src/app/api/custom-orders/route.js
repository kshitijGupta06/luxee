import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/db';
import CustomOrder from '@/backend/models/CustomOrder';
import { sendCustomOrderNotification } from '@/backend/lib/email';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const queryId = 'QRY' + Date.now().toString().slice(-8);

    const order = await CustomOrder.create({
      queryId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      productType: data.productType,
      personName: data.personName,
      date: data.date,
      message: data.message,
      notes: data.notes,
    });

    // Send email notification with attachments
    await sendCustomOrderNotification(order, data.sampleImage, data.drawingImage);

    return NextResponse.json({
      success: true,
      order: {
        id: order.queryId,
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');

    await dbConnect();

    if (adminKey === process.env.ADMIN_PASSWORD) {
      const orders = await CustomOrder.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, orders });
    }

    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    console.error('Fetch custom orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch custom orders' },
      { status: 500 }
    );
  }
}
