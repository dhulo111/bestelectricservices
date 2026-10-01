import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/db';
import { Settings } from '@/models/Settings';
import { verifyToken } from '@/lib/auth/auth';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
    const token = tokenCookie?.split('=')[1];
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await verifyToken(token);

    await connectToDatabase();
    let settings = await Settings.findOne().lean();

    if (!settings) {
      const newSettings = new Settings({});
      await newSettings.save();
      settings = await Settings.findOne().lean();
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch admin settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
    const token = tokenCookie?.split('=')[1];
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await verifyToken(token);

    const body = await request.json();

    await connectToDatabase();
    
    // Find the single document or create one if somehow deleted
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    // Define allowed fields to prevent arbitrary updates
    const allowedFields = [
      'companyName', 'tagline', 'phone', 'alternatePhone', 'email', 'whatsapp', 'address', 'workingHours',
      'emergencyServiceToggle', 'serviceAreas', 'socialMediaLinks',
      'defaultTitle', 'defaultDescription', 'keywords', 'ogImage', 'canonicalSiteUrl',
      'companyShortDescription', 'copyrightText'
    ];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        (settings as any)[field] = body[field];
      }
    });

    await settings.save();
    
    // Invalidate the public cache
    revalidatePath('/', 'layout');

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('Failed to update admin settings:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Validation Error', details: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
