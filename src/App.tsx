import { useState, useEffect } from 'react';
import { Sidebar, Header } from './layouts';
import { StatisticsView, SettingsView, HelpView, CalendarView, LoginView } from './components/views';
import { TaskGroupList, TimerPanel, TasksList } from './components/home';
import { CreateModal } from './components/shared';
import type { TabView, TaskGroup } from './types';
import { useTimerStore } from './store/useTimerStore';
import { useTaskStore } from './store/useTaskStore';

import { getFilteredAndSortedTasks } from './utils/taskUtils';

function App() {
  const [currentTab, setCurrentTab] = useState<TabView>('home');
  const { taskGroups, fetchTaskGroups, fetchTasks, tasks, setCurrentTask } = useTaskStore();
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const isActive = useTimerStore((state) => state.isActive);

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

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<'group' | 'task'>('group');
  const [groupToEdit, setGroupToEdit] = useState<TaskGroup | null>(null);

  const openCreateModal = (type: 'group' | 'task', data?: TaskGroup) => {
    setCreateModalType(type);
    if (type === 'group' && data) {
      setGroupToEdit(data);
    } else {
      setGroupToEdit(null);
    }
    setCreateModalOpen(true);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchTaskGroups();
    fetchTasks();
  }, [fetchTaskGroups, fetchTasks]);

  // Update selectedGroupId when taskGroups are loaded if needed
  useEffect(() => {
    if (taskGroups.length > 0 && !taskGroups.find(g => g.id === selectedGroupId)) {
      setSelectedGroupId(taskGroups[0].id);
    }
  }, [taskGroups, selectedGroupId]);

  // Auto-select task on initial load or when tasks change and nothing is selected
  useEffect(() => {
    if (selectedTaskId === null && tasks.length > 0) {
      const sortedTasks = getFilteredAndSortedTasks(tasks, selectedGroupId, filterOptions, sortOption, null);
      const firstTask = sortedTasks.find(t => t.status !== 'done');

      if (firstTask) {
        // We call handleSelectTask directly here. 
        // Note: handleSelectTask calls setCurrentTask which updates the store.
        // We should be careful about infinite loops, but selectedTaskId === null check prevents it.
        setSelectedTaskId(firstTask.id);
        setCurrentTask(firstTask.id);
      }
    }
  }, [tasks, selectedGroupId, selectedTaskId, filterOptions, sortOption, setCurrentTask]);

  const handleSelectTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setCurrentTask(taskId);
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#18181b] text-gray-900 font-sans overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* Create Modal Injection */}
      <CreateModal
        isOpen={createModalOpen}
        type={createModalType}
        onClose={() => setCreateModalOpen(false)}
        selectedGroupId={selectedGroupId}
        initialData={groupToEdit}
      />

      {/* Sidebar */}
      <div className="w-16 flex-shrink-0 flex flex-col items-center py-6 space-y-8 border-r border-white/5 bg-[#18181b] text-gray-400">
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#18181b] rounded-tl-3xl overflow-hidden relative">
        <Header />

        {currentTab === 'stats' ? (
          <StatisticsView />
        ) : currentTab === 'calendar' ? (
          <CalendarView />
        ) : currentTab === 'settings' ? (
          <SettingsView />
        ) : currentTab === 'help' ? (
          <HelpView />
        ) : (
          <main className="flex-1 bg-[#F3F4F6] p-3 rounded-tl-3xl overflow-hidden flex gap-3 transition-all duration-300">
            {/* Left Panel */}
            <div className={`transition-all duration-500 ease-in-out ${isActive ? 'w-0 opacity-0 overflow-hidden' : 'w-80 opacity-100'}`}>
              <TaskGroupList
                selectedGroupId={selectedGroupId}
                onSelectGroup={(id) => {
                  setSelectedGroupId(id);
                  // Auto-select logic
                  const sortedTasks = getFilteredAndSortedTasks(tasks, id, filterOptions, sortOption, null);
                  const firstTask = sortedTasks.find(t => t.status !== 'done');

                  if (firstTask) {
                    handleSelectTask(firstTask.id);
                  } else {
                    setSelectedTaskId(null);
                  }
                }}
                onOpenCreateGroup={() => openCreateModal('group')}
                onEditGroup={(group) => openCreateModal('group', group)}
              />
            </div>

            {/* Center Panel */}
            <TimerPanel
              selectedTaskId={selectedTaskId}
              onSelectTask={handleSelectTask}
            />

            {/* Right Panel */}
            <div className={`transition-all duration-500 ease-in-out ${isActive ? 'w-0 opacity-0 overflow-hidden' : 'w-80 opacity-100'}`}>
              <TasksList
                selectedTaskId={selectedTaskId}
                selectedGroupId={selectedGroupId}
                onSelectTask={handleSelectTask}
                onOpenCreateTask={() => openCreateModal('task')}
                sortOption={sortOption}
                onSortChange={setSortOption}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
