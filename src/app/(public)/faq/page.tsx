import { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb/db';
import { FAQ } from '@/models/FAQ';
import { mockFaqs } from '@/lib/mock-data/faqs';
import { siteConfig } from '@/config/site';
import { FaqSearchAndList } from '@/components/public/faq/FaqSearchAndList';
import { ContactCta } from '@/components/public/home/ContactCta';
import Script from 'next/script';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${siteConfig.name}`,
  description: 'Find answers to common questions about our electrical services, service areas, emergency support, and how to request a quote.',
};

export default async function FaqPage() {
  let faqs = [];
  
  try {
    await connectToDatabase();
    faqs = await FAQ.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
    
    // If DB is completely empty (no FAQs configured yet), use the fallback
    if (faqs.length === 0) {
      faqs = mockFaqs;
    }
  } catch (error) {
    console.warn("DB connection failed on FAQ page, using mock data", error);
    faqs = mockFaqs;
  }

  // Create JSON-LD schema for FAQPage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen pt-32 md:pt-40 pb-0 bg-deep-black">
      {/* Inject JSON-LD */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="pb-12 md:py-24 border-b border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-electric-cyan/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Frequently Asked <br className="hidden md:block" /> <span className="text-electric-cyan">Questions</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl leading-relaxed">
            Find answers to common questions about our electrical services, emergency response, and how we operate.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* We must parse MongoDB _id to string before passing to Client Component if it's real data */}
          <FaqSearchAndList 
            initialFaqs={faqs.map(f => ({
              ...f,
              _id: f._id ? f._id.toString() : undefined,
              createdAt: undefined,
              updatedAt: undefined
            }))} 
          />
        </div>
      </section>

      {/* CTA Section */}
      <ContactCta />
      
    </main>
  );
}
