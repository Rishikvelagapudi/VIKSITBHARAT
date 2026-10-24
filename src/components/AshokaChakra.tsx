import React from 'react';
import { cn } from '../lib/utils';

interface AshokaChakraProps {
  size?: number | string;
  className?: string;
  spinning?: boolean;
  glow?: boolean;
}

export const AshokaChakra: React.FC<AshokaChakraProps> = ({
  size = 120,
  className = '',
  spinning = true,
  glow = true,
}) => {
  // Generate 24 spokes at 15 degree intervals
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 select-none",
        className
      )}
      style={{ width: size, height: size }}
      title="The Ashoka Chakra - 24 Spokes of Continuous National Progress"
    >
      {/* Outer Cyan / Navy Glow Aura */}
      {glow && (
        <div 
          className="absolute inset-0 rounded-full pointer-events-none blur-md opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.4) 30%, rgba(0, 0, 128, 0.6) 70%, transparent 100%)',
          }}
        />
      )}

      <svg
        viewBox="-120 -120 240 240"
        className={cn(
          "w-full h-full relative z-10 transition-transform duration-700",
          spinning ? "animate-chakra-spin" : ""
        )}
      >
        <defs>
          <radialGradient id="chakraHubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#000080" />
          </radialGradient>
          <filter id="chakraSpokeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#0284c7" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer concentric rings */}
        <circle r="110" fill="none" stroke="#000080" strokeWidth="6" />
        <circle r="102" fill="none" stroke="#0284c7" strokeWidth="2.5" opacity="0.9" />
        <circle r="94" fill="none" stroke="#000080" strokeWidth="2" />

        {/* 24 Outer Beads */}
        <g fill="#000080">
          {spokes.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = Math.sin(rad) * 98;
            const y = -Math.cos(rad) * 98;
            return <circle key={deg} cx={x} cy={y} r="2.8" fill="#0284c7" />;
          })}
        </g>

        {/* 24 Spokes (Tapered triangle paths from hub to rim) */}
        <g fill="#000080" stroke="#000080" strokeWidth="0.5" filter="url(#chakraSpokeGlow)">
          {spokes.map((deg) => (
            <path
              key={`spoke-${deg}`}
              d="M -2.2,20 L -0.6,94 L 0.6,94 L 2.2,20 Z"
              transform={`rotate(${deg})`}
              fill="#000080"
            />
          ))}
        </g>

        {/* Center Hub */}
        <circle r="23" fill="#000080" />
        <circle r="17" fill="none" stroke="#ffffff" strokeWidth="2.2" opacity="0.95" />
        <circle r="10" fill="url(#chakraHubGrad)" />
        <circle r="3.5" fill="#ffffff" />
      </svg>
    </div>
  );
};
