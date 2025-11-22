import React from 'react';

export const SimplePieChart: React.FC = () => (
  <div 
    className="relative w-32 h-32 rounded-full mx-auto" 
    style={{ 
      background: `conic-gradient(
        #10B981 0% 40%, 
        #3B82F6 40% 70%, 
        #F59E0B 70% 90%, 
        #EF4444 90% 100%
      )` 
    }}
  >
    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col">
      <span className="text-xl font-bold text-gray-800">24</span>
      <span className="text-[8px] text-gray-400 uppercase">Tasks</span>
    </div>
  </div>
);
