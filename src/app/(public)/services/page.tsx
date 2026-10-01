import { ServicesHeader } from '@/components/public/services/ServicesHeader';
import { ServicesDirectory } from '@/components/public/services/ServicesDirectory';
import connectToDatabase from '@/lib/mongodb/db';
import { Service, IService } from '@/models/Service';
import { ContactCta } from '@/components/public/home/ContactCta';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Our Services | ${siteConfig.name}`,
  description: `Explore the comprehensive electrical services offered by ${siteConfig.name}.`,
};

// Revalidate every hour since services rarely change
export const revalidate = 3600;

export default async function ServicesPage() {
  let services: IService[] = [];
  
  try {
    await connectToDatabase();
    
    // Fetch active services, sorted by display order
    const rawServices = await Service.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
    
    // Serialize comprehensively for Client Component to remove nested ObjectIds
    services = JSON.parse(JSON.stringify(rawServices));
  } catch (error) {
    console.error("Failed to connect to database during build:", error);
    // Fallback to empty services array to show empty state
  }

  return (
    <>
      <ServicesHeader />
      <ServicesDirectory services={services} />
      <ContactCta />
    </>
  );
}
