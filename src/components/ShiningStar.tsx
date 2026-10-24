import React from 'react';
import { cn } from '../lib/utils';

export type StarColor = 'white' | 'saffron' | 'cyan' | 'gold' | 'green' | 'emerald';

interface ShiningStarProps {
  size?: number;
  className?: string;
  color?: StarColor;
  delay?: number;
  rotate?: boolean;
}

export const ShiningStar: React.FC<ShiningStarProps> = ({
  size = 28,
  className = '',
  color = 'white',
  delay = 0,
  rotate = true,
}) => {
  const colorMap: Record<StarColor, {
    core: string;
    glow: string;
    spikes: string;
    shadow: string;
    secondaryShadow: string;
  }> = {
    white: {
      core: '#ffffff',
      glow: '#e0f2fe',
      spikes: 'rgba(255, 255, 255, 0.95)',
      shadow: 'rgba(255, 255, 255, 0.9)',
      secondaryShadow: 'rgba(56, 189, 248, 0.7)',
    },
    saffron: {
      core: '#ffffff',
      glow: '#fed7aa',
      spikes: 'rgba(255, 153, 51, 0.95)',
      shadow: 'rgba(255, 103, 31, 0.9)',
      secondaryShadow: 'rgba(251, 146, 60, 0.6)',
    },
    cyan: {
      core: '#ffffff',
      glow: '#bae6fd',
      spikes: 'rgba(56, 189, 248, 0.95)',
      shadow: 'rgba(2, 132, 199, 0.9)',
      secondaryShadow: 'rgba(0, 0, 128, 0.6)',
    },
    gold: {
      core: '#ffffff',
      glow: '#fef08a',
      spikes: 'rgba(250, 204, 21, 0.95)',
      shadow: 'rgba(245, 158, 11, 0.9)',
      secondaryShadow: 'rgba(217, 119, 6, 0.6)',
    },
    green: {
      core: '#ffffff',
      glow: '#a7f3d0',
      spikes: 'rgba(52, 211, 153, 0.95)',
      shadow: 'rgba(16, 185, 129, 0.9)',
      secondaryShadow: 'rgba(5, 150, 105, 0.6)',
    },
    emerald: {
      core: '#ffffff',
      glow: '#a7f3d0',
      spikes: 'rgba(52, 211, 153, 0.95)',
      shadow: 'rgba(16, 185, 129, 0.9)',
      secondaryShadow: 'rgba(5, 150, 105, 0.6)',
    },
  };

  // Safe fallback guarantees c is never undefined
  const c = colorMap[color] || colorMap.gold;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 pointer-events-none select-none",
        rotate ? "animate-star-flare" : "animate-star-twinkle",
        className
      )}
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
      }}
    >
      {/* Outer Soft Halo Glow */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-80"
        style={{
          background: `radial-gradient(circle, ${c.shadow} 0%, ${c.secondaryShadow} 45%, transparent 75%)`,
        }}
      />

      {/* SVG 4-Pointed Star Flare with Horizontal & Vertical Spikes */}
      <svg
        viewBox="-60 -60 120 120"
        className="w-full h-full relative z-10 overflow-visible"
      >
        <defs>
          <radialGradient id={`starGrad-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor={c.glow} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c.shadow} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 4 Diagonal secondary small rays */}
        <path
          d="M 0,-24 Q 0,0 24,0 Q 0,0 0,24 Q 0,0 -24,0 Q 0,0 0,-24 Z"
          fill={c.spikes}
          opacity="0.45"
          transform="rotate(45)"
        />

        {/* 4 Main Diamond Ray Spikes */}
        <path
          d="M 0,-56 Q 0,0 56,0 Q 0,0 0,56 Q 0,0 -56,0 Q 0,0 0,-56 Z"
          fill={`url(#starGrad-${color})`}
          filter="drop-shadow(0 0 4px #ffffff)"
        />

        {/* Long Horizontal & Vertical Light Rays (Lens Flare Streak) */}
        <line
          x1="-58"
          y1="0"
          x2="58"
          y2="0"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <line
          x1="0"
          y1="-58"
          x2="0"
          y2="58"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Center Brilliant Core */}
        <circle r="4" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" />
        <circle r="2" fill="#ffffff" />
      </svg>
    </div>
  );
};
