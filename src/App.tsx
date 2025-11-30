import { useState } from 'react';
import { Sidebar, Header } from './layouts';
import { StatisticsView, SettingsView, HelpView, CalendarView } from './components/views';
import { TaskGroupList, TimerPanel, TasksList } from './components/home';
import { CreateModal } from './components/shared';
import type { TabView } from './types';
import { useTimerStore } from './store/useTimerStore';
import { useTaskStore } from './store/useTaskStore';
import { useEffect } from 'react';


function App() {
  const [currentTab, setCurrentTab] = useState<TabView>('home');
  const { taskGroups, fetchTaskGroups, fetchTasks } = useTaskStore();
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const isActive = useTimerStore((state) => state.isActive);

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<'group' | 'task'>('group');

  const openCreateModal = (type: 'group' | 'task') => {
    setCreateModalType(type);
    setCreateModalOpen(true);
  };

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

  return (
    <div className="flex h-screen w-full bg-[#18181b] text-gray-900 font-sans overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* Create Modal Injection */}
      <CreateModal
        isOpen={createModalOpen}
        type={createModalType}
        onClose={() => setCreateModalOpen(false)}
        selectedGroupId={selectedGroupId}
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
                onSelectGroup={setSelectedGroupId}
                onOpenCreateGroup={() => openCreateModal('group')}
              />
            </div>

            {/* Center Panel */}
            <TimerPanel />

            {/* Right Panel */}
            <div className={`transition-all duration-500 ease-in-out ${isActive ? 'w-0 opacity-0 overflow-hidden' : 'w-80 opacity-100'}`}>
              <TasksList
                selectedTaskId={selectedTaskId}
                selectedGroupId={selectedGroupId}
                onSelectTask={setSelectedTaskId}
                onOpenCreateTask={() => openCreateModal('task')}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
