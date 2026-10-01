'use client';

import { Menu, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const pathname = usePathname();
  
  // Format the path into a readable title
  const getTitle = () => {
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length <= 1) return 'Dashboard';
    
    // Get the last significant part of the path
    const lastPart = pathParts[1];
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <header className="h-20 bg-deep-black border-b border-white/10 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-400 hover:text-white lg:hidden transition-colors rounded-lg hover:bg-white/5"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-white tracking-wide">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-sm font-semibold text-white">Administrator</span>
          <span className="text-xs text-electric-cyan">System Access</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan">
          <UserCircle size={24} />
        </div>
      </div>
    </header>
  );
}
