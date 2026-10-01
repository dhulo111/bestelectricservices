import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { ContactForm } from '@/components/public/contact/ContactForm';
import { ContactInfo } from '@/components/public/contact/ContactInfo';
import connectToDatabase from '@/lib/mongodb/db';
import { SiteSettings } from '@/models/SiteSettings';
import Image from 'next/image';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;
  try {
    await connectToDatabase();
    settings = await SiteSettings.findOne().lean();
  } catch (error) {
    console.warn("Could not fetch site settings for metadata", error);
  }

  return {
    title: `Contact Us | ${settings?.companyName || siteConfig.name}`,
    description: 'Get in touch with our professional electrical team for installations, repairs, and emergencies.',
  };
}

export default async function ContactPage() {
  let settings = null;
  
  try {
    await connectToDatabase();
    settings = await SiteSettings.findOne().lean();
  } catch (error) {
    console.warn("DB connection failed on contact page, using siteConfig fallback", error);
  }

  const contactData = {
    phone: settings?.phone || siteConfig.contact.phone,
    whatsapp: settings?.whatsapp || siteConfig.contact.whatsapp,
    email: settings?.email || siteConfig.contact.email,
    address: settings?.address || siteConfig.contact.address,
    workingHours: settings?.workingHours || siteConfig.contact.workingHours,
    emergencyService: settings?.emergencyService ?? true,
  };

  return (
    <main className="min-h-screen pt-32 md:pt-40 pb-16 md:pb-20 bg-deep-black">
      {/* Hero Section */}
      <section className="relative pb-12 md:py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/contact_section_1789839657417.jpg" 
            alt="Contact Us" 
            fill 
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/90 to-deep-black" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Get in <span className="text-electric-cyan">Touch</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl leading-relaxed">
            Have a question, need an estimate, or require emergency electrical services? We're here to help. Reach out to our certified team today.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Info & Emergency */}
          <div>
            <ContactInfo data={contactData} />
          </div>

          {/* Right Column: Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-12 border-t border-white/5 max-w-4xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Frequently Asked <br className="hidden md:block" /> <span className="text-electric-cyan">Questions</span></h2>
          <p className="text-gray-400 text-sm md:text-base">Quick answers to common contact-related inquiries.</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-charcoal p-5 md:p-6 rounded-xl border border-white/5">
            <h4 className="text-white font-bold text-base md:text-lg mb-2">Do you charge for estimates?</h4>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              We provide free phone consultations and rough estimates. For accurate, on-site diagnostics and formal quotes, a standard service call fee may apply which is often credited toward the final work.
            </p>
          </div>
          
          <div className="bg-charcoal p-5 md:p-6 rounded-xl border border-white/5">
            <h4 className="text-white font-bold text-base md:text-lg mb-2">How fast can you respond to an emergency?</h4>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              For critical electrical emergencies in our primary service areas, we aim to dispatch a technician within 1-2 hours. Please call us directly rather than using the form for emergencies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
