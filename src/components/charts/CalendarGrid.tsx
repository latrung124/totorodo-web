import React from 'react';
import { Flame } from 'lucide-react';

export const CalendarGrid: React.FC = () => {
  const days = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, status: Math.random() > 0.3 ? 'fire' : 'none' }));
  return (
    <div className="grid grid-cols-7 gap-2">
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (<div key={i} className="text-center text-xs text-gray-400 font-bold mb-1">{d}</div>))}
      {days.map((d) => (
        <div key={d.day} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium relative ${d.status === 'fire' ? 'bg-orange-50 border border-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
          {d.day}
          {d.status === 'fire' && (<div className="absolute bottom-0.5"><Flame size={8} fill="#EA580C" className="text-orange-600" /></div>)}
        </div>
      ))}
    </div>
  );
};
