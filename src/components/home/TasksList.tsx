import React from 'react';
import { Plus, Filter, MoreHorizontal, Flag, CheckCircle2, Circle } from 'lucide-react';
import { TIMELINE_TASKS } from '../../data/mockData';
import { MonsterIcon } from '../shared';

export const TasksList: React.FC = () => {
  return (
    <section className="w-80 bg-white rounded-2xl shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <span className="font-bold text-gray-800 tracking-tight">Tasks List</span>
        <div className="flex space-x-1">
          <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200">
            <Plus size={14}/>
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Filter size={14}/>
          </button>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Completed</span>
          <div className="flex items-center space-x-1 mt-1">
            <MonsterIcon active={true} />
            <span className="font-bold text-lg">x 12</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Left</span>
          <div className="flex items-center space-x-1 mt-1">
            <div className="opacity-50">
              <MonsterIcon active={true} />
            </div>
            <span className="font-bold text-lg">x 4</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 relative">
        <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gray-100"></div>
        {TIMELINE_TASKS.map((task) => (
          <div key={task.id} className="relative z-10">
            {task.date && (
              <div className="flex items-center space-x-3 mb-2 ml-1">
                {task.status === 'done' ? (
                  <CheckCircle2 size={16} className="text-green-500 bg-white" />
                ) : task.status === 'current' ? (
                  <div className="w-4 h-4 rounded-full border-4 border-gray-800 bg-white"></div>
                ) : (
                  <Circle size={16} className="text-gray-300 bg-white" />
                )}
                <span className="text-[10px] text-gray-500 font-medium">{task.date}</span>
              </div>
            )}
            <div className={`ml-8 p-4 rounded-xl transition-all ${
              task.status === 'current' 
                ? 'bg-gray-50 border border-gray-200 shadow-sm' 
                : 'bg-gray-50/50 border border-transparent'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 font-bold text-sm text-gray-800">
                  <Flag size={14} />
                  <span>{task.title}</span>
                </div>
                <button className="text-gray-400">
                  <MoreHorizontal size={14}/>
                </button>
              </div>
              {task.status === 'current' && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-xs text-gray-500 mb-3">{task.desc}</p>
                  <div className="flex items-center space-x-3 text-[10px] font-medium">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {task.priority}
                    </span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      {task.pomodoros} Pomodoros
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
