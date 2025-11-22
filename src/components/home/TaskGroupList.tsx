import React from 'react';
import { Search, Plus, Filter, MoreHorizontal, Flag, Calendar as CalendarIcon } from 'lucide-react';
import { TASK_GROUPS } from '../../data/mockData';

export const TaskGroupList: React.FC = () => {
  return (
    <section className="w-80 bg-white rounded-2xl shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <span className="font-bold text-gray-800 tracking-tight">Task Group List</span>
        </div>
        <div className="flex space-x-1">
          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
            <Search size={16}/>
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
            <Plus size={16}/>
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
            <Filter size={16}/>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {TASK_GROUPS.map((group) => (
          <div 
            key={group.id} 
            className={`p-4 rounded-2xl relative group cursor-pointer transition-all hover:shadow-md ${
              group.theme === 'dark' 
                ? 'bg-[#27272a] text-white' 
                : 'bg-gray-50 text-gray-800 border border-gray-100'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                group.priority === 'High' 
                  ? 'bg-red-500/20 text-red-500' 
                  : group.priority === 'Medium' 
                    ? 'bg-orange-500/20 text-orange-500' 
                    : 'bg-blue-500/20 text-blue-500'
              }`}>
                {group.priority} Priority
              </span>
              <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`p-1.5 rounded-lg ${
                group.theme === 'dark' ? 'bg-white/10' : 'bg-white border border-gray-200'
              }`}>
                <Flag size={14} />
              </div>
              <h3 className="font-bold text-sm leading-tight">{group.title}</h3>
            </div>
            <p className={`text-xs mb-4 line-clamp-2 ${
              group.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {group.desc}
            </p>
            <div className="flex space-x-1 mb-2">
              {[...Array(group.total)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full ${
                    i < group.completed 
                      ? 'bg-white' 
                      : (group.theme === 'dark' ? 'bg-white/20' : 'bg-gray-200')
                  } ${group.theme !== 'dark' && i < group.completed ? 'bg-gray-800' : ''}`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] opacity-70">
              <span>{group.completed}/{group.total} completed</span>
              <div className="flex items-center space-x-1">
                <CalendarIcon size={10} />
                <span>{group.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
