import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb/db';
import { Service, IService } from '@/models/Service';
import { mockServicesData } from '@/lib/mock-data/services';
import { siteConfig } from '@/config/site';

import { ServiceDetailHero } from '@/components/public/services/detail/ServiceDetailHero';
import { ServiceOverview } from '@/components/public/services/detail/ServiceOverview';
import { ServiceBenefits } from '@/components/public/services/detail/ServiceBenefits';
import { ServiceProcessTimeline } from '@/components/public/services/detail/ServiceProcessTimeline';
import { ServiceFaqs } from '@/components/public/services/detail/ServiceFaqs';
import { ServicePricing } from '@/components/public/services/detail/ServicePricing';
import { RelatedServices } from '@/components/public/services/detail/RelatedServices';
import { ContactCta } from '@/components/public/home/ContactCta';

// Revalidate every hour
export const revalidate = 3600;

// Dynamic Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let service: IService | null = null;

  try {
    await connectToDatabase();
    service = await Service.findOne({ slug, isActive: true }).lean() as any;
  } catch (error) {
    console.error("DB connection failed during metadata generation, using fallback", error);
    service = mockServicesData.find(s => s.slug === slug) as any;
  }

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.seoTitle || service.title} | ${siteConfig.name}`,
    description: service.seoDescription || service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      images: [service.coverImage],
    }
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let rawService: any = null;
  let allRawServices: any[] = [];
  
  try {
    await connectToDatabase();
    rawService = await Service.findOne({ slug, isActive: true }).lean();
    allRawServices = await Service.find({ isActive: true }).lean();
  } catch (error) {
    console.error("Failed to fetch service from DB, using fallback mock data:", error);
    rawService = mockServicesData.find(s => s.slug === slug);
    allRawServices = mockServicesData;
  }

  if (!rawService) {
    notFound();
  }

  // Serialize comprehensively to remove nested Mongoose ObjectIds
  const service = JSON.parse(JSON.stringify(rawService));
  const allServices = JSON.parse(JSON.stringify(allRawServices));

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      image: siteConfig.logo,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contact.address
      }
    },
    areaServed: service.serviceAreas?.map(area => ({
      '@type': 'Place',
      name: area
    })) || [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.category,
      itemListElement: service.features?.map((feature, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature
        },
        position: idx + 1
      })) || []
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailHero service={service} />
      <ServiceOverview service={service} />
      <ServicePricing service={service} />
      <ServiceBenefits service={service} />
      <ServiceProcessTimeline service={service} />
      <ServiceFaqs service={service} />
      <ContactCta />
      <RelatedServices currentService={service} allServices={allServices} />
    </>
  );
}
