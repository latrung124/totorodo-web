import React from 'react';
import { Home, BarChart2, Settings, HelpCircle } from 'lucide-react';
import type { TabView } from '../types';

interface SidebarProps {
  currentTab: TabView;
  onTabChange: (tab: TabView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  return (
    <div className="w-16 flex-shrink-0 flex flex-col items-center py-6 space-y-8 border-r border-white/5 bg-[#18181b] text-gray-400">
      <div className="text-white font-bold text-xs leading-tight text-center mb-4 tracking-wider">
        TOTO<br/>DORO
      </div>
      <nav className="flex flex-col space-y-6 w-full items-center">
        <button 
          onClick={() => onTabChange('home')} 
          className={`p-2 rounded-xl transition-all ${
            currentTab === 'home' ? 'bg-white/10 text-white' : 'hover:text-white'
          }`}
        >
          <Home size={22} />
        </button>
        <button 
          onClick={() => onTabChange('stats')} 
          className={`p-2 rounded-xl transition-all ${
            currentTab === 'stats' ? 'bg-white/10 text-white' : 'hover:text-white'
          }`}
        >
          <BarChart2 size={22} />
        </button>
      </nav>
      <div className="mt-auto flex flex-col space-y-6 w-full items-center">
        <button 
          onClick={() => onTabChange('settings')} 
          className={`p-2 rounded-xl transition-all ${
            currentTab === 'settings' ? 'bg-white/10 text-white' : 'hover:text-white'
          }`}
        >
          <Settings size={22} />
        </button>
        <button 
          onClick={() => onTabChange('help')} 
          className={`p-2 rounded-xl transition-all ${
            currentTab === 'help' ? 'bg-white/10 text-white' : 'hover:text-white'
          }`}
        >
          <HelpCircle size={22} />
        </button>
      </div>
    </div>
  );
};
