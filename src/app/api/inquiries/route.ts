import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/db';
import { Inquiry } from '@/models/Inquiry';
import { InquiryStatus, InquiryPriority } from '@/types/inquiry';
import { Service } from '@/models/Service';
import { sendEmail } from '@/lib/email';
import { siteConfig } from '@/config/site';

// In-memory rate limiting store (Works for single-instance deployments/Edge)
// Note: In a true multi-server production environment without sticky sessions, you'd use Redis.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;

// Helper to sanitize inputs
const sanitize = (str: string) => {
  return str.trim().replace(/[<>]/g, ''); // basic XSS prevention
};

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    // Get IP from headers (Next.js standard headers for proxies/Vercel)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
    
    if (ip !== 'unknown-ip') {
      const now = Date.now();
      const record = rateLimitMap.get(ip);
      
      if (record) {
        if (now - record.timestamp < RATE_LIMIT_WINDOW_MS) {
          if (record.count >= MAX_REQUESTS_PER_WINDOW) {
            return NextResponse.json(
              { error: 'Too many requests. Please try again later or contact us directly via WhatsApp.' },
              { status: 429 }
            );
          }
          record.count += 1;
        } else {
          // Reset window
          rateLimitMap.set(ip, { count: 1, timestamp: now });
        }
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    }

    // 2. Parse Request
    const body = await req.json();
    
    // Determine inquiry type
    const inquiryType = body.inquiryType === 'GENERAL' ? 'GENERAL' : 'SERVICE_REQUEST';
    
    // 3. Validation
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
      return NextResponse.json({ error: 'Valid Full Name is required.' }, { status: 400 });
    }
    
    if (!body.phone || typeof body.phone !== 'string') {
      return NextResponse.json({ error: 'Mobile Number is required.' }, { status: 400 });
    }
    
    // Indian Phone Number validation (starts with 6-9, followed by 9 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    const sanitizedPhone = body.phone.replace(/[\s-]/g, '');
    if (!phoneRegex.test(sanitizedPhone)) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit Indian mobile number.' }, { status: 400 });
    }

    if (body.email && typeof body.email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
      }
    }
    
    if (inquiryType === 'SERVICE_REQUEST') {
      if (!body.serviceId || typeof body.serviceId !== 'string') {
        return NextResponse.json({ error: 'Please select a service.' }, { status: 400 });
      }
    }

    if (body.message && body.message.length > 1000) {
      return NextResponse.json({ error: 'Message is too long. Maximum 1000 characters allowed.' }, { status: 400 });
    }

    // 4. Verify Service Exists in DB (only for SERVICE_REQUEST)
    let serviceNameSnapshot = undefined;
    let validServiceId = undefined;
    
    if (inquiryType === 'SERVICE_REQUEST') {
      try {
        await connectToDatabase();
        const service = await Service.findById(body.serviceId).lean();
        if (service) {
          serviceNameSnapshot = service.title;
          validServiceId = service._id;
        } else {
          serviceNameSnapshot = 'Unknown Service';
        }
      } catch (error) {
        console.warn("DB connection failed during inquiry creation, or invalid service ID format.", error);
      }
    }

    // 5. Construct Document
    const inquiryData = {
      inquiryType,
      name: sanitize(body.name),
      phone: sanitizedPhone,
      email: body.email ? sanitize(body.email).toLowerCase() : undefined,
      serviceId: validServiceId,
      serviceNameSnapshot,
      address: body.address ? sanitize(body.address) : undefined,
      preferredContactMethod: body.preferredContactMethod || 'PHONE',
      message: body.message ? sanitize(body.message) : undefined,
      preferredDate: body.preferredDate ? sanitize(body.preferredDate) : undefined,
      preferredTime: body.preferredTime ? sanitize(body.preferredTime) : undefined,
      status: InquiryStatus.NEW,
      priority: InquiryPriority.NORMAL,
    };

    // 6. Save to Database
    await connectToDatabase();
    const newInquiry = await Inquiry.create(inquiryData);

    // Send email notification to admin
    const emailSubject = `New Inquiry: ${inquiryType === 'SERVICE_REQUEST' ? serviceNameSnapshot : 'General Contact'}`;
    const emailHtml = `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${inquiryData.name}</p>
      <p><strong>Phone:</strong> ${inquiryData.phone}</p>
      <p><strong>Email:</strong> ${inquiryData.email || 'N/A'}</p>
      <p><strong>Type:</strong> ${inquiryData.inquiryType}</p>
      ${inquiryData.serviceNameSnapshot ? `<p><strong>Service:</strong> ${inquiryData.serviceNameSnapshot}</p>` : ''}
      ${inquiryData.address ? `<p><strong>Address:</strong> ${inquiryData.address}</p>` : ''}
      ${inquiryData.preferredContactMethod ? `<p><strong>Preferred Contact:</strong> ${inquiryData.preferredContactMethod}</p>` : ''}
      ${inquiryData.preferredDate ? `<p><strong>Preferred Date:</strong> ${inquiryData.preferredDate}</p>` : ''}
      ${inquiryData.preferredTime ? `<p><strong>Preferred Time:</strong> ${inquiryData.preferredTime}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${inquiryData.message || 'No message provided.'}</p>
    `;

    // Await the email send so it doesn't get cancelled in serverless environments like Vercel
    await sendEmail({
      to: siteConfig.contact.email, // bestelectricservice7@gmail.com
      subject: emailSubject,
      htmlContent: emailHtml,
      replyTo: inquiryData.email,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry submitted successfully.',
      inquiryId: newInquiry._id 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please try again later or contact us directly.' 
    }, { status: 500 });
  }
}
