'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Settings, 
  Wrench, 
  MessageSquare, 
  LogOut,
  X
} from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Service Bookings', href: '/admin/inquiries/service', icon: Wrench },
  { name: 'Contact Inquiries', href: '/admin/inquiries/contact', icon: MessageSquare },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      window.location.href = '/admin-login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-deep-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-charcoal border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center" onClick={() => window.innerWidth < 1024 && onClose()}>
            <div className="relative w-36 h-10 flex items-center justify-start">
              <Image 
                src="/assets/Best Electric Services Logo.png" 
                alt={siteConfig.name}
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]"
              />
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20 shadow-[0_0_15px_-5px_rgba(0,255,255,0.2)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-electric-cyan' : 'text-gray-400'} />
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
