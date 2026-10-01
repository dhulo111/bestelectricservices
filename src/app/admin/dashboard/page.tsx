'use client';

import { useEffect, useState } from 'react';
import { StatCards } from '@/components/admin/dashboard/StatCards';
import { DashboardCharts } from '@/components/admin/dashboard/DashboardCharts';
import { RecentInquiries } from '@/components/admin/dashboard/RecentInquiries';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (!res.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Quick Actions Skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="w-32 h-10 bg-white/5 rounded-lg" />
          <div className="w-32 h-10 bg-white/5 rounded-lg" />
        </div>
        
        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 bg-white/5 rounded-2xl" />
          ))}
        </div>
        
        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-white/5 rounded-2xl" />
          <div className="h-96 bg-white/5 rounded-2xl" />
        </div>
        
        {/* Table Skeleton */}
        <div className="h-64 bg-white/5 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500">
        <h3 className="font-bold text-lg mb-2">Dashboard Error</h3>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} variant="primary" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2 pb-12">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Link href="/admin/services">
          <Button variant="primary" className="flex items-center gap-2 text-sm px-4">
            <Plus size={16} /> Add Service
          </Button>
        </Link>
        <Link href="/admin/settings">
          <Button variant="secondary" className="flex items-center gap-2 text-sm px-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white">
            <Settings size={16} /> Manage Settings
          </Button>
        </Link>
      </div>

      <StatCards metrics={data.metrics} />
      
      <DashboardCharts 
        chartData={data.chartData} 
        distributionData={data.distributionData} 
      />
      
      <RecentInquiries inquiries={data.recentInquiries} />
    </div>
  );
}
