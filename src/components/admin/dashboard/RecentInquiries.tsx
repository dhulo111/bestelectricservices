'use client';

import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

interface RecentInquiriesProps {
  inquiries: any[];
}

export function RecentInquiries({ inquiries }: RecentInquiriesProps) {
  if (!inquiries || inquiries.length === 0) {
    return (
      <div className="bg-charcoal/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 text-center mt-6">
        <FileText className="mx-auto h-12 w-12 text-gray-500 mb-4" />
        <h3 className="text-lg font-medium text-white mb-1">No Inquiries Found</h3>
        <p className="text-gray-400">There are currently no inquiries in the system.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-charcoal/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 mt-6 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white tracking-wide">Recent Inquiries</h3>
        <Link href="/admin/inquiries" className="text-sm text-electric-cyan hover:text-white flex items-center gap-1 transition-colors">
          View All <ArrowRight size={16} />
        </Link>
      </div>
      
      <div className="overflow-x-hidden md:overflow-x-auto">
        <table className="w-full text-left border-collapse block md:table">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
              <th className="pb-3 px-4 font-semibold">Client</th>
              <th className="pb-3 px-4 font-semibold">Type</th>
              <th className="pb-3 px-4 font-semibold">Service</th>
              <th className="pb-3 px-4 font-semibold">Status</th>
              <th className="pb-3 px-4 font-semibold text-right">Date</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group divide-y-0 md:divide-y divide-white/5 p-4 md:p-0 space-y-4 md:space-y-0">
            {inquiries.map((inq) => (
              <Fragment key={inq._id}>
                {/* Premium Mobile Card Layout */}
                <tr className="md:hidden block bg-white/[0.03] border border-white/10 rounded-2xl p-4 shadow-lg w-full mb-4">
                  <td className="block w-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-white text-[15px] leading-tight">{inq.fullName}</div>
                        <div className="text-[11px] text-electric-cyan font-medium mt-0.5">{inq.mobileNumber}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[11px] text-gray-300 font-medium bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                          {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Info Inner Card */}
                    <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-xl p-3">
                       <div className="flex flex-col gap-1.5 w-1/2 pr-3 border-r border-white/5">
                          <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">Type & Status</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {inq.inquiryType === 'SERVICE_REQUEST' ? (
                              <span className="px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/20">Request</span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-medium border border-purple-500/20">General</span>
                            )}
                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium border ${
                              inq.status === 'NEW' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              inq.status === 'IN_PROGRESS' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                              inq.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              'bg-gray-500/10 text-gray-400 border-gray-500/20'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                       </div>
                       <div className="flex flex-col gap-1 w-1/2 pl-3">
                          <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">Service Required</span>
                          <div className="text-[11px] text-white font-medium truncate">
                            {inq.serviceName || 'N/A'}
                          </div>
                       </div>
                    </div>
                  </td>
                </tr>

                {/* Desktop Table Row */}
                <tr className="hidden md:table-row hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{inq.fullName}</div>
                    <div className="text-xs text-gray-500">{inq.mobileNumber}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-300">
                    {inq.inquiryType === 'SERVICE_REQUEST' ? (
                      <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">Request</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs">General</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400 max-w-[200px] truncate">
                    {inq.serviceName || 'N/A'}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      inq.status === 'NEW' ? 'bg-red-500/10 text-red-400' :
                      inq.status === 'IN_PROGRESS' ? 'bg-yellow-500/10 text-yellow-400' :
                      inq.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 text-right">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
