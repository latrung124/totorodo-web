import React, { useState } from 'react';
import { Plus, Filter, MoreHorizontal, Flag, CheckCircle2, Circle, X, ListFilter } from 'lucide-react';
import { TIMELINE_TASKS } from '../../data/mockData';
import { MonsterIcon } from '../shared';

type FilterType = 'group' | 'task';

interface FilterPopoverProps {
  type: FilterType;
  onClose: () => void;
  isOpen: boolean;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({ type, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
        <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
          <ListFilter size={14} /> Sort & Filter
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={14} />
        </button>
      </div>

      {/* Sort Section */}
      <div className="mb-4">
        <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-wider">Sort By</p>
        <div className="space-y-1">
          {type === 'group' ? (
            <>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                <input type="radio" name="sort" className="accent-black" defaultChecked /> Priority (High to Low)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                <input type="radio" name="sort" className="accent-black" /> Deadline (Nearest)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                <input type="radio" name="sort" className="accent-black" /> Name (A-Z)
              </label>
            </>
          ) : (
            <>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                <input type="radio" name="sort" className="accent-black" defaultChecked /> Deadline
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                <input type="radio" name="sort" className="accent-black" /> Priority
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                <input type="radio" name="sort" className="accent-black" /> Name
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                <input type="radio" name="sort" className="accent-black" /> Pomodoros
              </label>
            </>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div>
        <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-wider">Filter By</p>
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
            <input type="checkbox" className="accent-black rounded" defaultChecked /> High Priority
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
            <input type="checkbox" className="accent-black rounded" defaultChecked /> Medium Priority
          </label>
          {type === 'task' && (
            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
              <input type="checkbox" className="accent-black rounded" /> Show Done Tasks
            </label>
          )}
        </div>
      </div>

      <button className="w-full mt-4 bg-black text-white text-xs font-bold py-2 rounded-lg hover:bg-gray-800 transition-colors">
        Apply
      </button>
    </div>
  );
};

export const TasksList: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="w-80 bg-white rounded-2xl shadow-sm flex flex-col">      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <span className="font-bold text-gray-800 tracking-tight">Tasks List</span>
        <div className="flex space-x-1 relative">
          <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200">
            <Plus size={14}/>
          </button>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-1.5 hover:bg-gray-100 rounded relative"
          >
            <Filter size={14}/>
          </button>
          <FilterPopover 
            type="task" 
            isOpen={isFilterOpen} 
            onClose={() => setIsFilterOpen(false)} 
          />
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
