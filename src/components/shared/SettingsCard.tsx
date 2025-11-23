import React from 'react';
import type { ReactNode } from 'react';

interface SettingsCardProps {
  active: boolean;
  title: string;
  desc: string;
  illustration: ReactNode;
  onClick: () => void;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ 
  active, 
  title, 
  desc, 
  illustration, 
  onClick 
}) => (
  <div 
    onClick={onClick} 
    className={`p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 overflow-hidden relative ${
      active 
        ? 'bg-[#18181b] text-white' 
        : 'bg-white border border-gray-100 text-gray-800 hover:bg-gray-50'
    }`}
  >
    <div className={`w-16 h-16 flex-shrink-0 rounded-lg flex items-center justify-center ${
      active ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      {illustration}
    </div>
    <div className="flex-1 relative z-10">
      <h3 className="font-bold text-sm mb-1 flex items-center gap-2">{title}</h3>
      <p className={`text-[10px] leading-tight ${active ? 'text-gray-400' : 'text-gray-500'}`}>
        {desc}
      </p>
    </div>
  </div>
);
