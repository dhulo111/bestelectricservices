import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/db';
import { Inquiry } from '@/models/Inquiry';
import { verifyToken } from '@/lib/auth/auth';
import mongoose from 'mongoose';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
    const token = tokenCookie?.split('=')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await verifyToken(token);

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await connectToDatabase();
    const inquiry = await Inquiry.findById(id).lean();

    if (!inquiry) return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });

    return NextResponse.json(inquiry);
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
    const token = tokenCookie?.split('=')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await verifyToken(token);

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status, priority, adminNotes } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes; // allow empty strings

    await connectToDatabase();
    
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedInquiry) return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });

    return NextResponse.json(updatedInquiry);
  } catch (error: any) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
