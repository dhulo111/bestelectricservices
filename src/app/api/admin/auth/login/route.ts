import { NextResponse } from 'next/server';
import { Admin } from '@/models/Admin';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth/auth';
import connectToDatabase from '@/lib/mongodb/db';

// Basic rate limiting: storing IPs in memory for simplicity (In production, use Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // 5 failed attempts allowed

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    // Rate Limiting Logic
    if (rateLimitMap.has(ip)) {
      const data = rateLimitMap.get(ip)!;
      if (now - data.lastReset > RATE_LIMIT_WINDOW) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else if (data.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Too many login attempts. Please try again later.' },
          { status: 429 }
        );
      } else {
        data.count += 1;
        rateLimitMap.set(ip, data);
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!admin.isActive) {
      return NextResponse.json({ error: 'Account disabled' }, { status: 403 });
    }

    const isValid = await verifyPassword(password, admin.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Success - reset rate limit
    rateLimitMap.delete(ip);

    // Update last login
    admin.lastLoginAt = new Date();
    await admin.save();

    // Create JWT
    const token = await signToken({
      adminId: admin._id,
      email: admin.email,
      role: admin.role,
    });

    // Set HTTP-only cookie
    await setAuthCookie(token);

    return NextResponse.json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
