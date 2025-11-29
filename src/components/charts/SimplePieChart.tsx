import React from 'react';

export const SimplePieChart: React.FC = () => (
  <div className="relative w-32 h-32 rounded-full mx-auto" style={{ background: `conic-gradient(#EA580C 0% 40%, #F97316 40% 70%, #FDBA74 70% 90%, #1F2937 90% 100%)` }}>
    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col">
      <span className="text-xl font-bold text-gray-800">24</span><span className="text-[8px] text-gray-400 uppercase">Tasks</span>
    </div>
  </div>
);
