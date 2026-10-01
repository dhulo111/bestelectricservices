import React, { useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Edit, Eye, MoreVertical, Trash2, Check, X, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/ui/modal';

interface ServiceData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  icon: string;
  coverImage: string;
  featured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

interface ServiceTableProps {
  services: ServiceData[];
  onRefresh: () => void;
}

export function ServiceTable({ services, onRefresh }: ServiceTableProps) {
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [serviceToArchive, setServiceToArchive] = useState<string | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleArchiveClick = (id: string) => {
    setServiceToArchive(id);
    setArchiveModalOpen(true);
    setOpenDropdown(null);
  };

  const handleArchiveConfirm = async () => {
    if (!serviceToArchive) return;
    setIsArchiving(true);
    
    try {
      const res = await fetch(`/api/admin/services/${serviceToArchive}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        onRefresh();
        setArchiveModalOpen(false);
      } else {
        alert('Failed to archive service');
      }
    } catch (err) {
      alert('Error archiving service');
    } finally {
      setIsArchiving(false);
      setServiceToArchive(null);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured })
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      alert('Failed to update featured status');
    }
  };

  return (
    <>
      <div className="bg-charcoal border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-hidden md:overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400 block md:table">
            <thead className="bg-white/5 text-gray-300 font-medium hidden md:table-header-group">
              <tr>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Active</th>
                <th className="px-6 py-4 text-center">Featured</th>
                <th className="px-6 py-4 text-center">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group divide-y-0 md:divide-y divide-white/5 p-4 md:p-0 space-y-4 md:space-y-0">
              {services.length === 0 ? (
                <tr className="block md:table-row">
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 block md:table-cell">
                    No services found.
                  </td>
                </tr>
              ) : (
                services.map((service, index) => (
                  <Fragment key={service._id}>
                    {/* Premium Mobile Card Layout */}
                    <tr className="md:hidden block bg-white/[0.03] border border-white/10 rounded-2xl p-4 shadow-lg w-full mb-4">
                      <td className="block w-full">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20 shrink-0 shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                              {service.icon.startsWith('<svg') ? (
                                <div dangerouslySetInnerHTML={{ __html: service.icon }} className="w-6 h-6 text-electric-cyan [&>svg]:w-full [&>svg]:h-full flex items-center justify-center" />
                              ) : (
                                <span className="text-xl">⚡</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="font-bold text-white text-[15px] leading-tight truncate">{service.title}</div>
                              <div className="text-[11px] text-gray-500 font-medium truncate mt-0.5">/{service.slug}</div>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-gray-300 font-medium whitespace-nowrap">
                            {service.category}
                          </span>
                        </div>

                        {/* Stats/Status Inner Card */}
                        <div className="grid grid-cols-3 gap-2 bg-black/20 border border-white/5 rounded-xl p-2 mb-4">
                          <button 
                            onClick={() => toggleStatus(service._id, service.isActive)}
                            className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${service.isActive ? 'bg-electric-cyan/15 text-electric-cyan' : 'bg-red-500/15 text-red-500'}`}
                          >
                            {service.isActive ? <Check size={16} strokeWidth={2.5} /> : <X size={16} strokeWidth={2.5} />}
                            <span className="text-[9px] font-bold tracking-wider uppercase mt-1.5">{service.isActive ? 'Active' : 'Inactive'}</span>
                          </button>
                          
                          <button 
                            onClick={() => toggleFeatured(service._id, service.featured)}
                            className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${service.featured ? 'bg-yellow-500/15 text-yellow-500' : 'bg-white/5 text-gray-400'}`}
                          >
                            <span className="text-[16px] leading-none mb-0.5">{service.featured ? '★' : '☆'}</span>
                            <span className="text-[9px] font-bold tracking-wider uppercase mt-1">Featured</span>
                          </button>
                          
                          <div className="flex flex-col items-center justify-center py-2 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-white font-bold text-[14px] leading-none mb-0.5">{service.displayOrder}</span>
                            <span className="text-[9px] text-gray-500 font-bold tracking-wider uppercase mt-1">Order</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Link href={`/services/${service.slug}`} target="_blank" className="flex-1">
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-semibold tracking-wide text-gray-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"><Eye size={15} /> View</button>
                          </Link>
                          <Link href={`/admin/services/${service._id}/edit`} className="flex-1">
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-semibold tracking-wide text-electric-cyan bg-electric-cyan/10 hover:bg-electric-cyan/20 rounded-xl transition-colors"><Edit size={15} /> Edit</button>
                          </Link>
                          <button onClick={() => handleArchiveClick(service._id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-semibold tracking-wide text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors"><Trash2 size={15} /> Del</button>
                        </div>
                      </td>
                    </tr>

                    {/* Desktop Table Row */}
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hidden md:table-row hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
                          {service.icon.startsWith('<svg') ? (
                            <div dangerouslySetInnerHTML={{ __html: service.icon }} className="w-5 h-5 text-electric-cyan" />
                          ) : (
                            <span className="text-xl">⚡</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">{service.title}</div>
                          <div className="text-xs text-gray-500">/{service.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300">
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => toggleStatus(service._id, service.isActive)}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                            service.isActive 
                              ? 'bg-electric-cyan/20 text-electric-cyan hover:bg-electric-cyan/30' 
                              : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                          }`}
                          title="Toggle Active Status"
                        >
                          {service.isActive ? <Check size={16} /> : <X size={16} />}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => toggleFeatured(service._id, service.featured)}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                            service.featured 
                              ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' 
                              : 'bg-white/5 text-gray-500 hover:bg-white/10'
                          }`}
                          title="Toggle Featured Status"
                        >
                          <span className="text-lg leading-none">★</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300 font-mono">
                        {service.displayOrder}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/services/${service.slug}`} target="_blank">
                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Preview">
                              <Eye size={18} />
                            </button>
                          </Link>
                          <Link href={`/admin/services/${service._id}/edit`}>
                            <button className="p-2 text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors" title="Edit">
                              <Edit size={18} />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleArchiveClick(service._id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Archive Service"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onConfirm={handleArchiveConfirm}
        title="Archive Service"
        message="Are you sure you want to archive this service? It will no longer appear on the public website, but past inquiries related to it will be preserved."
        confirmText="Archive Service"
        variant="danger"
        isLoading={isArchiving}
      />
    </>
  );
}
