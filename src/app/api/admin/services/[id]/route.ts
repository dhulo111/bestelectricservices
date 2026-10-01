import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/db';
import { Service } from '@/models/Service';
import { verifyToken } from '@/lib/auth/auth';

async function checkAuth(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
  const token = tokenCookie?.split('=')[1];

  if (!token) throw new Error('Unauthorized');
  await verifyToken(token);
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await checkAuth(req);
    await connectToDatabase();
    
    const { id } = await params;
    const service = await Service.findById(id).lean();
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await checkAuth(req);
    await connectToDatabase();

    const { id } = await params;
    const body = await req.json();

    // Check duplicate slug excluding current service
    if (body.slug) {
      const existing = await Service.findOne({ slug: body.slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ error: 'A service with this slug already exists' }, { status: 409 });
      }
    }

    const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Error updating service:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: Object.values(error.errors).map((e: any) => e.message).join(', ') }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await checkAuth(req);
    await connectToDatabase();

    const { id } = await params;
    
    // Instead of hard deleting, we archive by setting isActive: false
    const service = await Service.findByIdAndUpdate(id, { isActive: false }, { new: true });
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Service archived successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}
