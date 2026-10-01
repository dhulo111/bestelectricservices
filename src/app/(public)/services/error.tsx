'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('Services page error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-deep-black px-4 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertCircle size={40} />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Something went wrong!</h2>
      <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
        We encountered an error while trying to fetch our services. This might be a temporary network issue.
      </p>
      
      <Button 
        variant="primary" 
        onClick={() => reset()}
        className="px-8 py-6 text-lg"
      >
        Try Again
      </Button>
    </div>
  );
}
