import { useState } from 'react';
import { Sidebar, Header } from './layouts';
import { StatisticsView, SettingsView, HelpView } from './components/views';
import { TaskGroupList, TimerPanel, TasksList } from './components/home';
import type { TabView } from './types';
import { useTimerStore } from './store/useTimerStore';

import { TASK_GROUPS } from './data/mockData';

function App() {
  const [currentTab, setCurrentTab] = useState<TabView>('home');
  const [selectedGroupId, setSelectedGroupId] = useState<number>(TASK_GROUPS[0]?.id || 1);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const isActive = useTimerStore((state) => state.isActive);

  return (
    <div className="flex h-screen w-full bg-[#18181b] text-gray-900 font-sans overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* Sidebar */}
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#18181b] rounded-tl-3xl overflow-hidden relative">
        <Header />

        {currentTab === 'stats' ? (
          <StatisticsView />
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
              />
            </div>

            {/* Center Panel */}
            <TimerPanel />

            {/* Right Panel */}
            <div className={`transition-all duration-500 ease-in-out ${isActive ? 'w-0 opacity-0 overflow-hidden' : 'w-80 opacity-100'}`}>
              <TasksList
                selectedTaskId={selectedTaskId}
                onSelectTask={setSelectedTaskId}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
