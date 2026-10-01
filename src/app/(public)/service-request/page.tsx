import { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb/db';
import { Service } from '@/models/Service';
import { mockServicesData } from '@/lib/mock-data/services';
import { siteConfig } from '@/config/site';
import { ServiceRequestForm } from '@/components/public/service-request/ServiceRequestForm';
import { Zap, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: `Request a Service | ${siteConfig.name}`,
  description: 'Book a professional electrical service. We provide fast, reliable, and safe electrical solutions for residential and commercial properties.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ServiceRequestPage() {
  let activeServices: any[] = [];
  
  try {
    await connectToDatabase();
    activeServices = await Service.find({ isActive: true })
      .select('_id title category')
      .sort({ displayOrder: 1 })
      .lean();
  } catch (error) {
    console.error("DB connection failed on service request page, using mock data", error);
    activeServices = mockServicesData.map((s: any) => ({
      _id: s._id?.toString() || s.slug,
      title: s.title,
      category: s.category
    }));
  }

  // Serialize IDs for Client Component
  const services = activeServices.map(s => ({
    _id: s._id.toString(),
    title: s.title,
    category: s.category
  }));

  return (
    <main className="min-h-screen pt-24 pb-16 bg-deep-black">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Request a <span className="text-electric-cyan">Service</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Need professional electrical assistance? Fill out the form below and our certified experts will get in touch with you to confirm the details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ServiceRequestForm services={services} />
          </div>
          
          {/* Right Column: Info & Guarantees */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            
            <div className="bg-charcoal p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Why Choose Us?</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center shrink-0">
                    <Shield className="text-electric-cyan" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Certified Experts</h4>
                    <p className="text-sm text-gray-400">All our technicians are fully licensed, insured, and rigorously trained.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center shrink-0">
                    <Zap className="text-electric-cyan" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Fast Response</h4>
                    <p className="text-sm text-gray-400">We prioritize your safety with quick response times for all inquiries.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center shrink-0">
                    <Clock className="text-electric-cyan" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Transparent Pricing</h4>
                    <p className="text-sm text-gray-400">No hidden fees. We provide clear estimates before beginning any work.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-charcoal p-8 rounded-2xl border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Need Urgent Help?</h3>
              <p className="text-gray-400 text-sm mb-6">
                For electrical emergencies, please call us directly for immediate assistance.
              </p>
              <a 
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-bold border border-white/10"
              >
                {siteConfig.contact.phone}
              </a>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
