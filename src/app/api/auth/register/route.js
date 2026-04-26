import { NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/db';
import User from '@/backend/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, phone, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone: phone || '',
      password: hashedPassword,
    });

    const sessionUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ success: true, user: sessionUser });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    );
  }
}
