import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Flag, Calendar as CalendarIcon, X, ListFilter } from 'lucide-react';
import { TASK_GROUPS } from '../../data/mockData';

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

interface TaskGroupListProps {
  selectedGroupId: number;
  onSelectGroup: (id: number) => void;
}

export const TaskGroupList: React.FC<TaskGroupListProps> = ({ selectedGroupId, onSelectGroup }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter groups based on search query
  const filteredGroups = TASK_GROUPS.filter(group =>
    group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-80 bg-white rounded-2xl shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center h-16">
        {isSearchOpen ? (
          <div className="flex items-center w-full gap-2 animate-in fade-in slide-in-from-right-5 duration-200">
            <Search size={16} className="text-gray-400" />
            <input
              autoFocus
              type="text"
              placeholder="Search groups..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 h-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (searchQuery === "") setIsSearchOpen(false);
              }}
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <span className="font-bold text-gray-800 tracking-tight">Task Group List</span>
            </div>
            <div className="flex space-x-1 relative">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
              >
                <Search size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                <Plus size={16} />
              </button>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-500 relative"
              >
                <Filter size={16} />
              </button>
              <FilterPopover
                type="group"
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={`p-4 rounded-2xl relative group cursor-pointer transition-all hover:shadow-md ${selectedGroupId === group.id
                  ? 'bg-[#27272a] text-white ring-2 ring-black ring-offset-2'
                  : 'bg-gray-50 text-gray-800 border border-gray-100 hover:bg-white'
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${group.priority === 'High'
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
                <div className={`p-1.5 rounded-lg ${selectedGroupId === group.id ? 'bg-white/10' : 'bg-white border border-gray-200'
                  }`}>
                  <Flag size={14} />
                </div>
                <h3 className="font-bold text-sm leading-tight">{group.title}</h3>
              </div>
              <p className={`text-xs mb-4 line-clamp-2 ${selectedGroupId === group.id ? 'text-gray-400' : 'text-gray-500'
                }`}>
                {group.desc}
              </p>
              <div className="flex space-x-1 mb-2">
                {[...Array(group.total)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i < group.completed
                        ? 'bg-white'
                        : (selectedGroupId === group.id ? 'bg-white/20' : 'bg-gray-200')
                      } ${selectedGroupId !== group.id && i < group.completed ? 'bg-gray-800' : ''}`}
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-sm animate-in fade-in duration-300">
            <Search size={32} className="mb-3 opacity-40" />
            <p className="font-medium text-gray-600">No matching task groups found</p>
            <p className="text-xs text-gray-400 mt-1">Try a different search query</p>
          </div>
        )}
      </div>
    </section>
  );
};
