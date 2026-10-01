'use client';

import { motion } from 'framer-motion';
import { IService } from '@/models/Service';
import { ServiceCard } from '../ServiceCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RelatedServices({ currentService, allServices }: { currentService: IService, allServices: IService[] }) {
  // Filter out the current service and grab up to 3 related ones
  // In a real app, this might match by category first, then fallback to random
  let related = allServices.filter(s => s._id?.toString() !== currentService._id?.toString());
  
  // Prefer same category
  const sameCategory = related.filter(s => s.category === currentService.category);
  
  if (sameCategory.length > 0) {
    related = [...sameCategory, ...related.filter(s => s.category !== currentService.category)];
  }
  
  related = related.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-20 bg-deep-black border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Explore <span className="text-electric-cyan">Related Services</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              Discover other professional electrical solutions we offer to keep your property safe and efficient.
            </p>
          </div>
          <Link 
            href="/services"
            className="flex items-center gap-2 text-electric-cyan font-bold hover:text-white transition-colors shrink-0"
          >
            View All Services <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((service, index) => (
            <ServiceCard key={service._id ? service._id.toString() : service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
