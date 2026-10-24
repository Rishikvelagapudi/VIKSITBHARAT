import React from 'react';
import { cn } from '../lib/utils';
import { AshokaChakra } from './AshokaChakra';

interface EmblemBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EmblemBadge: React.FC<EmblemBadgeProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { box: 'w-10 h-10', chakra: 30, text: 'text-[9px]' },
    md: { box: 'w-14 h-14 sm:w-16 sm:h-16', chakra: 44, text: 'text-xs' },
    lg: { box: 'w-24 h-24 sm:w-28 sm:h-28', chakra: 72, text: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div
      className={cn(
        "relative rounded-full p-1 bg-gradient-to-tr from-[#FF671F] via-white to-[#10b981] shadow-[0_0_25px_rgba(255,103,31,0.4)] hover:shadow-[0_0_35px_rgba(2,132,199,0.7)] transition-all duration-300 group cursor-pointer flex items-center justify-center shrink-0",
        current.box,
        className
      )}
    >
      <div className="w-full h-full rounded-full bg-[#03060f]/90 border border-white/20 flex flex-col items-center justify-center overflow-hidden relative">
        <AshokaChakra size={current.chakra} glow={false} />
      </div>
    </div>
  );
};
