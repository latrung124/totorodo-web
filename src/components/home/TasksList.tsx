import React, { useState } from 'react';
import { Plus, Filter, MoreHorizontal, Flag, CheckCircle2, Circle } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import { AnimatePresence, motion } from 'framer-motion';
import { MonsterIcon } from '../shared';

import { FilterPopover } from '../shared';

interface TasksListProps {
  selectedTaskId: number | null;
  selectedGroupId: number;
  onSelectTask: (id: number) => void;
  onOpenCreateTask: () => void;
}

export const TasksList: React.FC<TasksListProps> = ({ selectedTaskId, selectedGroupId, onSelectTask, onOpenCreateTask }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { tasks } = useTaskStore();

  // Sort & Filter State
  const [sortOption, setSortOption] = useState('deadline');
  const [filterOptions, setFilterOptions] = useState({
    highPriority: true,
    mediumPriority: true,
    lowPriority: true,
    showDone: true, // Default to true
  });

  const handleFilterChange = (key: string, checked: boolean) => {
    setFilterOptions(prev => ({ ...prev, [key]: checked }));
  };

  const filteredTasks = tasks
    .filter(task => {
      // Filter by group first
      if (task.groupId !== selectedGroupId) return false;

      const matchesStatus = filterOptions.showDone ? true : task.status !== 'done';
      const matchesPriority =
        (filterOptions.highPriority && task.priority === 'High') ||
        (filterOptions.mediumPriority && task.priority === 'Medium') ||
        (filterOptions.lowPriority && task.priority === 'Low');

      // Always show selected task even if it doesn't match filters
      return (matchesStatus && matchesPriority) || task.id === selectedTaskId;
    })
    .sort((a, b) => {
      if (sortOption === 'priority') {
        const priorityOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
        const pA = a.priority ? priorityOrder[a.priority] : 0;
        const pB = b.priority ? priorityOrder[b.priority] : 0;
        return (pB || 0) - (pA || 0);
      }
      if (sortOption === 'deadline') {
        // Assuming tasks have a date field or we sort by ID/creation if not
        return (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0);
      }
      if (sortOption === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortOption === 'pomodoros') {
        return (b.pomodoros || 0) - (a.pomodoros || 0);
      }
      return 0;
    });

  const groupTasks = tasks.filter(t => t.groupId === selectedGroupId);
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  let completedCount = 0;
  let leftCount = 0;

  if (selectedTask) {
    completedCount = selectedTask.completedPomodoros || 0;
    leftCount = (selectedTask.pomodoros || 0) - completedCount;
    // Ensure non-negative
    if (leftCount < 0) leftCount = 0;
  } else {
    completedCount = groupTasks.filter(t => t.status === 'done').length;
    leftCount = groupTasks.filter(t => t.status !== 'done').length;
  }

  return (
    <section className="w-80 bg-white rounded-2xl shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <span className="font-bold text-gray-800 tracking-tight">Tasks List</span>
        <div className="flex space-x-1 relative">
          <button
            onClick={onOpenCreateTask}
            className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-1.5 rounded relative ${isFilterOpen ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <Filter size={14} />
          </button>
          <FilterPopover
            type="task"
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            sortOption={sortOption}
            onSortChange={setSortOption}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Completed</span>
          <div className="flex items-center space-x-1 mt-1">
            <MonsterIcon active={true} />
            <span className="font-bold text-lg">x {completedCount}</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Left</span>
          <div className="flex items-center space-x-1 mt-1">
            <div className="opacity-50">
              <MonsterIcon active={true} />
            </div>
            <span className="font-bold text-lg">x {leftCount}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 relative">
        <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gray-100"></div>
        <AnimatePresence mode='popLayout'>
          {filteredTasks.map((task) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={task.id}
              className="relative z-10"
            >
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
              <div
                onClick={() => onSelectTask(task.id)}
                className={`ml-8 p-4 rounded-xl transition-all cursor-pointer ${selectedTaskId === task.id
                  ? 'bg-[#27272a] text-white ring-2 ring-black ring-offset-2 shadow-lg'
                  : 'bg-gray-50/50 border border-transparent hover:bg-white hover:shadow-sm'
                  }`}>
                <div className="flex justify-between items-start">
                  <div className={`flex items-center space-x-2 font-bold text-sm ${selectedTaskId === task.id ? 'text-white' : 'text-gray-800'
                    }`}>
                    <Flag size={14} />
                    <span>{task.title}</span>
                  </div>
                  <button className="text-gray-400">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
                {(task.status === 'current' || selectedTaskId === task.id) && (
                  <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className={`text-xs mb-3 ${selectedTaskId === task.id ? 'text-gray-400' : 'text-gray-500'
                      }`}>{task.desc}</p>
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
