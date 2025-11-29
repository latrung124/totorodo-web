import React from 'react';

export const StackedBarChart: React.FC = () => {
  const data = [
    { label: "Chinese Learning", p: 60, s: 10, l: 5 },
    { label: "Design Work", p: 40, s: 20, l: 10 },
    { label: "Charity Event", p: 20, s: 5, l: 0 }
  ];

  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1 text-gray-600 font-medium"><span>{item.label}</span><span>{item.p + item.s + item.l} mins</span></div>
          <div className="h-3 w-full bg-gray-100 rounded-full flex overflow-hidden">
            <div style={{ width: `${item.p}%` }} className="bg-orange-600" title="Focus"></div>
            <div style={{ width: `${item.s}%` }} className="bg-orange-400" title="Short Break"></div>
            <div style={{ width: `${item.l}%` }} className="bg-gray-800" title="Long Break"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
