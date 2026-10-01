import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/db';
import { Settings } from '@/models/Settings';
import { unstable_cache } from 'next/cache';

// We use unstable_cache to cache the settings in the data cache.
// It will be revalidated via the 'settings' tag when updated in the admin panel.
const getSettings = unstable_cache(
  async () => {
    await connectToDatabase();
    let settings = await Settings.findOne().lean();
    
    // Seed default settings if none exist
    if (!settings) {
      const newSettings = new Settings({});
      await newSettings.save();
      settings = await Settings.findOne().lean();
    }
    
    // Ensure we don't return sensitive mongoose fields (_id, __v, createdAt, updatedAt)
    // Actually, none of these are really "sensitive secrets", but it's good practice.
    return {
      companyName: settings?.companyName,
      tagline: settings?.tagline,
      phone: settings?.phone,
      alternatePhone: settings?.alternatePhone,
      email: settings?.email,
      whatsapp: settings?.whatsapp,
      address: settings?.address,
      workingHours: settings?.workingHours,
      emergencyServiceToggle: settings?.emergencyServiceToggle,
      serviceAreas: settings?.serviceAreas,
      socialMediaLinks: settings?.socialMediaLinks,
      defaultTitle: settings?.defaultTitle,
      defaultDescription: settings?.defaultDescription,
      keywords: settings?.keywords,
      ogImage: settings?.ogImage,
      canonicalSiteUrl: settings?.canonicalSiteUrl,
      companyShortDescription: settings?.companyShortDescription,
      copyrightText: settings?.copyrightText,
    };
  },
  ['global-settings'],
  { tags: ['settings'], revalidate: 3600 } // Revalidate every hour just in case, but rely on on-demand revalidation via tags
);

export async function GET() {
  try {
    const data = await getSettings();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch public settings:', error);
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}
