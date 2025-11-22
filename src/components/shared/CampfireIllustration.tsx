import React from 'react';

export const CampfireIllustration: React.FC = () => (
  <div className="relative w-48 h-48 flex items-center justify-center">
    <svg width="160" height="160" viewBox="0 0 100 100" className="drop-shadow-xl">
      <path d="M25 85 L75 65" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
      <path d="M25 65 L75 85" stroke="#795548" strokeWidth="6" strokeLinecap="round" />
      <path 
        d="M50 10 C50 10 80 50 80 70 C80 85 65 85 50 85 C35 85 20 85 20 70 C20 50 50 10 50 10 Z" 
        fill="#EA580C" 
        className="animate-pulse" 
        style={{ animationDuration: '2s' }} 
      />
      <path 
        d="M50 30 C50 30 70 60 70 70 C70 80 60 80 50 80 C40 80 30 80 30 70 C30 60 50 30 50 30 Z" 
        fill="#FDBA74" 
      />
      <path 
        d="M50 55 C50 55 58 70 58 75 C58 80 54 80 50 80 C46 80 42 80 42 75 C42 70 50 55 50 55 Z" 
        fill="#FFF7ED" 
      />
    </svg>
    <div className="absolute -right-8 top-0 bg-gray-100 rounded-xl p-3 shadow-sm text-xs font-medium text-gray-600 animate-bounce">
      Keep the<br/>fire burning!
      <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-4 h-4 bg-gray-100 rotate-45 transform translate-x-4 -translate-y-2"></div>
    </div>
  </div>
);
