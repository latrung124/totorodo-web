import React from 'react';

export const SimpleLineChart: React.FC = () => (
  <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
    <line x1="0" y1="40" x2="500" y2="40" stroke="#E5E7EB" strokeDasharray="4 4" />
    <line x1="0" y1="80" x2="500" y2="80" stroke="#E5E7EB" strokeDasharray="4 4" />
    <line x1="0" y1="120" x2="500" y2="120" stroke="#E5E7EB" strokeDasharray="4 4" />
    <line x1="0" y1="160" x2="500" y2="160" stroke="#E5E7EB" />
    <path 
      d="M0 120 L100 100 L200 110 L300 90 L400 100 L500 80" 
      fill="none" 
      stroke="#9CA3AF" 
      strokeWidth="2" 
      strokeDasharray="5 5" 
    />
    <path 
      d="M0 130 L100 90 L200 120 L300 60 L400 80 L500 40" 
      fill="none" 
      stroke="#EA580C" 
      strokeWidth="3" 
    />
    {[130, 90, 120, 60, 80, 40].map((y, i) => (
      <circle 
        key={i} 
        cx={i * 100} 
        cy={y} 
        r="4" 
        fill="white" 
        stroke="#EA580C" 
        strokeWidth="2" 
      />
    ))}
    <text x="10" y="180" fontSize="10" fill="#6B7280">Mon</text>
    <text x="110" y="180" fontSize="10" fill="#6B7280">Tue</text>
    <text x="210" y="180" fontSize="10" fill="#6B7280">Wed</text>
    <text x="310" y="180" fontSize="10" fill="#6B7280">Thu</text>
    <text x="410" y="180" fontSize="10" fill="#6B7280">Fri</text>
    <text x="480" y="180" fontSize="10" fill="#6B7280">Sat</text>
  </svg>
);
