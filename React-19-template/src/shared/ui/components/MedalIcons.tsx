// Medal SVG Icons inspired by Flaticon designs - Simplified version
import React from 'react';

interface MedalIconProps {
  className?: string;
  size?: number;
}

export const GoldMedal: React.FC<MedalIconProps> = ({ className, size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ribbon */}
    <path
      d="M16 4 L32 4 L34 12 L30 14 L18 14 L14 12 Z"
      fill="url(#goldRibbon)"
      stroke="#B8860B"
      strokeWidth="0.5"
    />
    
    {/* Medal Circle */}
    <circle
      cx="24"
      cy="28"
      r="12"
      fill="url(#goldMedal)"
      stroke="#B8860B"
      strokeWidth="1"
    />
    
    {/* Inner decorative ring */}
    <circle
      cx="24"
      cy="28"
      r="9"
      fill="none"
      stroke="#DAA520"
      strokeWidth="1"
      opacity="0.8"
    />
    
    {/* Center star */}
    <path
      d="M24 22 L25.5 25.5 L29 26 L26.5 28.5 L27 32 L24 30.5 L21 32 L21.5 28.5 L19 26 L22.5 25.5 Z"
      fill="#FFF8DC"
      stroke="#DAA520"
      strokeWidth="0.3"
    />
    
    <defs>
      <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      
      <radialGradient id="goldMedal" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#FFF8DC" />
        <stop offset="70%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </radialGradient>
    </defs>
  </svg>
);

export const SilverMedal: React.FC<MedalIconProps> = ({ className, size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ribbon */}
    <path
      d="M16 4 L32 4 L34 12 L30 14 L18 14 L14 12 Z"
      fill="url(#silverRibbon)"
      stroke="#708090"
      strokeWidth="0.5"
    />
    
    {/* Medal Circle */}
    <circle
      cx="24"
      cy="28"
      r="12"
      fill="url(#silverMedal)"
      stroke="#708090"
      strokeWidth="1"
    />
    
    {/* Inner decorative ring */}
    <circle
      cx="24"
      cy="28"
      r="9"
      fill="none"
      stroke="#A9A9A9"
      strokeWidth="1"
      opacity="0.8"
    />
    
    {/* Center star */}
    <path
      d="M24 22 L25.5 25.5 L29 26 L26.5 28.5 L27 32 L24 30.5 L21 32 L21.5 28.5 L19 26 L22.5 25.5 Z"
      fill="#F8F8FF"
      stroke="#A9A9A9"
      strokeWidth="0.3"
    />
    
    <defs>
      <linearGradient id="silverRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E6E6FA" />
        <stop offset="100%" stopColor="#708090" />
      </linearGradient>
      
      <radialGradient id="silverMedal" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#F8F8FF" />
        <stop offset="70%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#708090" />
      </radialGradient>
    </defs>
  </svg>
);

export const BronzeMedal: React.FC<MedalIconProps> = ({ className, size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ribbon */}
    <path
      d="M16 4 L32 4 L34 12 L30 14 L18 14 L14 12 Z"
      fill="url(#bronzeRibbon)"
      stroke="#8B4513"
      strokeWidth="0.5"
    />
    
    {/* Medal Circle */}
    <circle
      cx="24"
      cy="28"
      r="12"
      fill="url(#bronzeMedal)"
      stroke="#8B4513"
      strokeWidth="1"
    />
    
    {/* Inner decorative ring */}
    <circle
      cx="24"
      cy="28"
      r="9"
      fill="none"
      stroke="#CD853F"
      strokeWidth="1"
      opacity="0.8"
    />
    
    {/* Center star */}
    <path
      d="M24 22 L25.5 25.5 L29 26 L26.5 28.5 L27 32 L24 30.5 L21 32 L21.5 28.5 L19 26 L22.5 25.5 Z"
      fill="#FFEFD5"
      stroke="#CD853F"
      strokeWidth="0.3"
    />
    
    <defs>
      <linearGradient id="bronzeRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#DEB887" />
        <stop offset="100%" stopColor="#8B4513" />
      </linearGradient>
      
      <radialGradient id="bronzeMedal" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#FFEFD5" />
        <stop offset="70%" stopColor="#CD853F" />
        <stop offset="100%" stopColor="#8B4513" />
      </radialGradient>
    </defs>
  </svg>
);
