import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/db';
import { Service } from '@/models/Service';
import { verifyToken } from '@/lib/auth/auth';

// Apply basic auth verification
async function checkAuth(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
  const token = tokenCookie?.split('=')[1];

  if (!token) throw new Error('Unauthorized');
  await verifyToken(token);
}

export async function GET(req: Request) {
  try {
    await checkAuth(req);
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q');
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    
    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (isActive !== null) query.isActive = isActive === 'true';

    // We don't need heavy content fields for the list view
    const services = await Service.find(query)
      .select('title slug category icon coverImage featured isActive displayOrder createdAt')
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}

export async function POST(req: Request) {
  try {
    await checkAuth(req);
    await connectToDatabase();

    const body = await req.json();

    // Basic validation
    if (!body.title || !body.slug || !body.category) {
      return NextResponse.json({ error: 'Title, slug, and category are required' }, { status: 400 });
    }

    // Check for duplicate slug
    const existing = await Service.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: 'A service with this slug already exists' }, { status: 409 });
    }

    const service = await Service.create(body);

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: Object.values(error.errors).map((e: any) => e.message).join(', ') }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
