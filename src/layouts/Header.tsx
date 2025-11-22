import React from 'react';
import { Play, SkipForward, SkipBack, Shuffle, Repeat, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#18181b] text-white border-b border-white/5">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-6 bg-white/5 px-4 py-2 rounded-full border border-white/10">
        <div className="flex flex-col mr-2">
          <span className="text-xs font-bold tracking-tight">Legends Never Die</span>
          <span className="text-[10px] text-gray-400">Orchestral version</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-300">
          <Shuffle size={14} className="hover:text-white cursor-pointer" />
          <Repeat size={14} className="hover:text-white cursor-pointer" />
          <div className="h-4 w-[1px] bg-white/20"></div>
          <SkipBack size={16} className="hover:text-white cursor-pointer" />
          <button className="bg-white text-black rounded-full p-1 hover:scale-105 transition-transform">
            <Play size={14} fill="currentColor" />
          </button>
          <SkipForward size={16} className="hover:text-white cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center space-x-4">
        <div className="relative">
          <button className="p-2 bg-white rounded-full text-black hover:bg-gray-200 transition-colors">
            <Bell size={18} />
          </button>
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-[#18181b]">
            9+
          </span>
        </div>
      </div>
    </header>
  );
};
