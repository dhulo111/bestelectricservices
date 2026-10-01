import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
};

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  
  const variants = {
    default: 'bg-white/10 text-gray-300 border-white/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    NEW: { label: 'New', variant: 'info' },
    CONTACTED: { label: 'Contacted', variant: 'warning' },
    IN_PROGRESS: { label: 'In Progress', variant: 'warning' },
    COMPLETED: { label: 'Completed', variant: 'success' },
    CLOSED: { label: 'Closed', variant: 'default' },
    SPAM: { label: 'Spam', variant: 'danger' },
  };

  const config = map[status] || { label: status, variant: 'default' };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    LOW: { label: 'Low', variant: 'default' },
    NORMAL: { label: 'Normal', variant: 'info' },
    HIGH: { label: 'High', variant: 'warning' },
    URGENT: { label: 'Urgent', variant: 'danger' },
  };

  const config = map[priority] || { label: priority, variant: 'default' };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
