import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Flag, Calendar as CalendarIcon, X } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import { AnimatePresence, motion } from 'framer-motion';

import { FilterPopover } from '../shared';

interface TaskGroupListProps {
  selectedGroupId: number;
  onSelectGroup: (id: number) => void;
  onOpenCreateGroup: () => void;
}

export const TaskGroupList: React.FC<TaskGroupListProps> = ({ selectedGroupId, onSelectGroup, onOpenCreateGroup }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { taskGroups } = useTaskStore();

  // Sort & Filter State
  const [sortOption, setSortOption] = useState('priority');
  const [filterOptions, setFilterOptions] = useState({
    highPriority: true,
    mediumPriority: true,
    lowPriority: true,
  });

  const handleFilterChange = (key: string, checked: boolean) => {
    setFilterOptions(prev => ({ ...prev, [key]: checked }));
  };

  // Filter groups based on search query and filter options
  const filteredGroups = taskGroups
    .filter(group => {
      const matchesSearch = group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        (filterOptions.highPriority && group.priority === 'High') ||
        (filterOptions.mediumPriority && group.priority === 'Medium') ||
        (filterOptions.lowPriority && group.priority === 'Low');

      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sortOption === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      if (sortOption === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (sortOption === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

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
              <button
                onClick={onOpenCreateGroup}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-1.5 rounded relative ${isFilterOpen ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <Filter size={16} />
              </button>
              <FilterPopover
                type="group"
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                sortOption={sortOption}
                onSortChange={setSortOption}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <AnimatePresence mode='popLayout'>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={group.id}
                onClick={() => onSelectGroup(group.id)}
                className={`p-4 rounded-2xl relative group cursor-pointer transition-shadow hover:shadow-md ${selectedGroupId === group.id
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
                <div className={selectedGroupId === group.id ? 'block' : 'hidden group-hover:block'}>
                  <p className={`text-xs mb-4 line-clamp-2 ${selectedGroupId === group.id ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    {group.desc}
                  </p>
                </div>
                <div className="flex space-x-1 mb-2">
                  {[...Array(group.total)].map((_, i) => {
                    const isCompleted = i < group.completed;
                    const isSelected = selectedGroupId === group.id;
                    let barColor;

                    if (isSelected) {
                      barColor = isCompleted ? 'bg-white' : 'bg-white/20';
                    } else {
                      barColor = isCompleted ? 'bg-zinc-800' : 'bg-gray-200';
                    }

                    return (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${barColor}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between items-center text-[10px] opacity-70">
                  <span>{group.completed}/{group.total} completed</span>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon size={10} />
                    <span>{group.deadline}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-gray-400 text-sm"
            >
              <Search size={32} className="mb-3 opacity-40" />
              <p className="font-medium text-gray-600">No matching task groups found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different search query or filter</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
