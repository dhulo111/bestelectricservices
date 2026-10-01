import { NextResponse } from 'next/server';
import { getAuthCookie, verifyToken } from '@/lib/auth/auth';
import connectToDatabase from '@/lib/mongodb/db';
import { Admin } from '@/models/Admin';

export async function GET() {
  try {
    const cookie = await getAuthCookie();
    if (!cookie?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const payload = await verifyToken(cookie.value);
    if (!payload || !payload.adminId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectToDatabase();
    const admin = await Admin.findById(payload.adminId).select('-passwordHash');

    if (!admin || !admin.isActive) {
      return NextResponse.json({ error: 'Admin not found or disabled' }, { status: 401 });
    }

    return NextResponse.json({
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
