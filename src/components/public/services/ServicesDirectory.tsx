'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import { IService } from '@/models/Service';
import { LayoutGrid, Filter, SearchX } from 'lucide-react';

export function ServicesDirectory({ services }: { services: IService[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];
  
  // Filter services
  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section className="py-16 bg-charcoal relative min-h-[50vh]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Filtering Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 bg-deep-black p-4 md:p-6 rounded-2xl border border-white/5 shadow-lg">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-electric-cyan">
              <Filter size={20} />
            </div>
            <div>
              <h3 className="font-bold">Filter Services</h3>
              <p className="text-sm text-gray-400">Select a category below</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-electric-cyan text-deep-black shadow-glow-sm'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          {filteredServices.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredServices.map((service, index) => (
                <ServiceCard key={service._id ? service._id.toString() : service.slug} service={service} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-deep-black rounded-full flex items-center justify-center mb-6 border border-white/10 text-gray-500">
                <SearchX size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Services Found</h3>
              <p className="text-gray-400 max-w-md">
                We currently don't have any active services listed in the "{activeCategory}" category. Please check back later or contact us.
              </p>
              <button 
                onClick={() => setActiveCategory('All')}
                className="mt-8 px-6 py-3 rounded-lg bg-electric-cyan text-deep-black font-bold hover:shadow-glow-sm transition-all"
              >
                View All Services
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
