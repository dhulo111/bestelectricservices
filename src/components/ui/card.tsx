import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  glow?: boolean;
  noPadding?: boolean;
};

export const Card: React.FC<CardProps> = ({ 
  className = '', 
  children, 
  interactive = false,
  glow = false,
  noPadding = false,
  ...props 
}) => {
  const interactiveClasses = interactive ? 'glass-panel-hover cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1' : '';
  const glowClasses = glow ? 'shadow-glow-sm border-electric-cyan/30' : '';
  const paddingClass = noPadding ? '' : 'p-6';

  return (
    <div 
      className={`glass-panel rounded-2xl ${paddingClass} ${interactiveClasses} ${glowClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
