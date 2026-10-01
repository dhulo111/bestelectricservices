'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Video, Lightbulb, Snowflake, Wrench, Home, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { IService } from '@/models/Service';

// Dynamic icon mapper
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Video,
    Lightbulb,
    Snowflake,
    Wrench,
    Home
  };
  return icons[iconName] || Zap; // Fallback to Zap if icon not found
};

export function ServiceCard({ service, index }: { service: IService; index: number }) {
  const Icon = getIcon(service.icon);
  const keyFeature = service.features && service.features.length > 0 ? service.features[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/services/${service.slug}`} className="block group h-full">
        <Card noPadding interactive className="h-full flex flex-col overflow-hidden bg-charcoal border-white/5 relative">
          
          {/* Featured Badge */}
          {service.featured && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-electric-cyan text-deep-black text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              Featured
            </div>
          )}

          <div className="relative h-48 md:h-56 overflow-hidden">
            <Image 
              src={service.coverImage} 
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent" />
            
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 p-2.5 md:p-3 rounded-xl bg-deep-black/80 backdrop-blur-md border border-white/10 text-electric-cyan shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:bg-electric-cyan group-hover:text-deep-black group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300">
              <Icon size={22} className="md:w-6 md:h-6" />
            </div>

            {/* Price overlay on image for a premium look */}
            {service.startingPrice && (
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex flex-col items-end">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white/80 drop-shadow-md">Starts At</span>
                <span className="text-base md:text-lg font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {service.startingPrice}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-4 md:p-6 flex flex-col flex-grow relative">
            <div className="text-[10px] md:text-xs font-bold text-electric-cyan uppercase tracking-wider mb-1.5 md:mb-2">
              {service.category}
            </div>
            
            <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-electric-cyan transition-colors line-clamp-1">
              {service.title}
            </h4>
            
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 flex-grow line-clamp-2 md:line-clamp-3 leading-relaxed">
              {service.shortDescription}
            </p>
            
            {keyFeature && (
              <div className="flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm text-gray-300 bg-white/5 p-2.5 md:p-3 rounded-xl border border-white/5">
                <Zap size={14} className="text-electric-cyan shrink-0 md:w-4 md:h-4" />
                <span className="line-clamp-1 font-medium">{keyFeature}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="text-xs md:text-sm text-gray-400 font-medium group-hover:text-white transition-colors">
                View Details
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-electric-cyan group-hover:text-deep-black transition-all text-white">
                <ArrowRight size={16} className="md:w-5 md:h-5 group-hover:-rotate-45 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
