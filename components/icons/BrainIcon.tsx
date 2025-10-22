import React from 'react';

const BrainIcon: React.FC = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="brainIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        {/* Colors sampled from the provided image */}
        <stop offset="0%" stopColor="#A93590" />
        <stop offset="100%" stopColor="#E94A4A" />
      </linearGradient>
    </defs>
    
    <circle cx="100" cy="100" r="100" fill="url(#brainIconGradient)" />

    <g stroke="white" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Center Divider */}
      <path d="M100 38 V 162" />

      {/* Left Hemisphere (Organic) */}
      <path d="M100 38 C 75 38, 52 50, 56 80 C 50 100, 52 130, 75 155 C 85 163, 100 162, 100 162" />
      <path d="M88 62 C 75 68, 74 85, 86 88" />
      <path d="M96 95 C 104 88, 102 72, 92 68" />
      <path d="M78 108 C 70 122, 78 142, 88 150" />
      
      {/* Right Hemisphere (Circuit) */}
      <path d="M100 38 C 125 38, 148 50, 144 80 C 150 100, 148 130, 125 155 C 115 163, 100 162, 100 162" />
      {/* Circuit Lines */}
      <path d="M100 65 H 122" />
      <path d="M100 95 H 132" />
      <path d="M100 125 H 122" />
      <path d="M100 148 H 118" />
      <path d="M122 65 V 125" />
      <path d="M132 95 H 142" />
      
      {/* Nodes */}
      <g fill="white" stroke="none">
        <circle cx="122" cy="65" r="7.5" />
        <circle cx="132" cy="95" r="7.5" />
        <circle cx="122" cy="125" r="7.5" />
        <circle cx="142" cy="95" r="7.5" />
        <circle cx="118" cy="148" r="7.5" />
      </g>
    </g>
  </svg>
);

export default BrainIcon;
