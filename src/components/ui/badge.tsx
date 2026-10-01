import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'cyan' | 'outline' | 'dark';
  children: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'cyan', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold tracking-wide uppercase transition-colors';
  
  const variants = {
    cyan: 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/50 shadow-glow-sm',
    outline: 'bg-transparent text-text-muted border border-gray-border hover:border-electric-cyan hover:text-electric-cyan cursor-default',
    dark: 'bg-charcoal text-text-muted border border-gray-border'
  };

  return (
    <span 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
