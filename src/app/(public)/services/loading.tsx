'use client';

import { motion } from 'framer-motion';

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header Skeleton */}
      <div className="h-[400px] bg-deep-black border-b border-white/5 animate-pulse relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
            <div className="w-32 h-8 bg-white/5 rounded-full" />
            <div className="w-96 h-16 bg-white/5 rounded-xl" />
            <div className="w-64 h-6 bg-white/5 rounded-md" />
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Filter Skeleton */}
        <div className="h-24 bg-deep-black rounded-2xl border border-white/5 mb-12 animate-pulse" />
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[500px] bg-deep-black rounded-xl border border-white/5 animate-pulse flex flex-col">
              <div className="h-56 bg-white/5 w-full" />
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div className="w-20 h-4 bg-white/5 rounded-md" />
                <div className="w-48 h-6 bg-white/5 rounded-md" />
                <div className="w-full h-20 bg-white/5 rounded-md" />
                <div className="w-full h-12 bg-white/5 rounded-lg mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
