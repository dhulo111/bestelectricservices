import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/db';
import { Inquiry } from '@/models/Inquiry';
import { InquiryStatus } from '@/types/inquiry';
import { Service } from '@/models/Service';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(req: Request) {
  try {
    // 1. Double check authentication (although middleware protects this)
    const cookieHeader = req.headers.get('cookie');
    const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
    const token = tokenCookie?.split('=')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await verifyToken(token);
    await connectToDatabase();

    // 2. Fetch metrics
    const [
      totalServices,
      activeServices,
      newInquiries,
      pendingInquiries,
      recentInquiries
    ] = await Promise.all([
      Service.countDocuments(),
      Service.countDocuments({ isActive: true }),
      Inquiry.countDocuments({ status: InquiryStatus.NEW }),
      Inquiry.countDocuments({ status: InquiryStatus.IN_PROGRESS }),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);

    // 3. Calculate Date-based metrics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [inquiriesToday, inquiriesThisMonth] = await Promise.all([
      Inquiry.countDocuments({ createdAt: { $gte: today } }),
      Inquiry.countDocuments({ createdAt: { $gte: firstDayOfMonth } })
    ]);

    // 4. Generate Chart Data (e.g. Inquiries over the last 7 days)
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      return d;
    }).reverse();

    const chartDataPromises = last7Days.map(async (date) => {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      
      const count = await Inquiry.countDocuments({
        createdAt: { $gte: date, $lt: nextDay }
      });

      return {
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        total: count
      };
    });

    const chartData = await Promise.all(chartDataPromises);

    // 5. Generate Distribution Data
    const distributionRaw = await Inquiry.aggregate([
      { $group: { _id: "$inquiryType", count: { $sum: 1 } } }
    ]);
    
    const distributionData = distributionRaw.map(item => ({
      name: item._id,
      value: item.count
    }));

    return NextResponse.json({
      metrics: {
        totalServices,
        activeServices,
        newInquiries,
        pendingInquiries,
        inquiriesToday,
        inquiriesThisMonth
      },
      chartData,
      distributionData: distributionData.length > 0 ? distributionData : [{ name: 'None', value: 1 }],
      recentInquiries
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
