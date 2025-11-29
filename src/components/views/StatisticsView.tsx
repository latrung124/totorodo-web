import React, { useState } from 'react';
import { Activity, Flame } from 'lucide-react';
import { SimpleLineChart, StackedBarChart, SimplePieChart, CalendarGrid } from '../charts';
import { HISTORY_TASKS } from '../../data/mockData';

export const StatisticsView: React.FC = () => {
  const [tab, setTab] = useState<'time' | 'streak' | 'history'>('time');
  return (
    <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] rounded-tl-3xl overflow-hidden">
      <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-gray-900">Statistics</h1><p className="text-gray-400 text-sm">Track your productivity flow.</p></div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {(['time', 'streak', 'history'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>{t === 'time' ? 'Time Spent' : t === 'streak' ? 'Streak' : 'History'}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {tab === 'time' && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Activity size={18} /> Time Usage vs Plan</h3><select className="bg-gray-50 border border-gray-200 rounded-lg text-xs px-2 py-1 text-gray-600"><option>This Week</option><option>This Month</option></select></div>
              <div className="h-48"><SimpleLineChart /></div>
              <div className="flex justify-center gap-6 mt-4 text-xs"><div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-orange-600"></div> Actual</div><div className="flex items-center gap-1"><div className="w-3 h-0.5 border-t border-gray-400 border-dashed"></div> Planned</div></div>
            </div>
            <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-6">Workload</h3>
              <SimplePieChart />
              <div className="grid grid-cols-2 gap-2 mt-6">
                {[{ l: 'Done', c: 'bg-orange-600' }, { l: 'In Progress', c: 'bg-orange-500' }, { l: 'To Do', c: 'bg-orange-300' }, { l: 'Pending', c: 'bg-gray-800' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600"><div className={`w-2 h-2 rounded-full ${item.c}`}></div> {item.l}</div>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Top Task Groups</h3>
              <StackedBarChart />
              <div className="flex gap-4 mt-4 text-[10px] text-gray-400 justify-end"><span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-600 rounded-sm"></div> Focus</span><span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-400 rounded-sm"></div> Short</span><span className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-800 rounded-sm"></div> Long</span></div>
            </div>
            <div className="col-span-12 lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Session Counts</h3>
              <div className="flex items-end justify-between h-32 px-4 pb-2 border-b border-gray-100">
                {['Focus', 'Short', 'Long'].map((label, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-16 group">
                    <div className="w-full flex items-end gap-1 h-full">
                      <div style={{ height: i === 0 ? '80%' : '40%' }} className="flex-1 bg-orange-600 rounded-t-sm relative group-hover:opacity-90 transition-opacity"></div>
                      <div style={{ height: i === 0 ? '20%' : '10%' }} className="flex-1 bg-gray-200 rounded-t-sm"></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4 text-[10px] text-gray-400"><span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-600 rounded-sm"></div> Finished</span><span className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-200 rounded-sm"></div> Unfinished</span></div>
            </div>
          </div>
        )}
        {tab === 'streak' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4 animate-bounce"><Flame size={48} className="text-orange-500" fill="#F97316" /></div>
              <h2 className="text-5xl font-bold text-gray-900 mb-1">12</h2>
              <p className="text-orange-500 font-bold uppercase tracking-wide text-sm mb-6">Days Streak</p>
              <div className="flex gap-8 text-left w-full max-w-xs bg-gray-50 p-4 rounded-xl"><div><p className="text-[10px] text-gray-400 uppercase font-bold">Longest</p><p className="text-lg font-bold text-gray-800">24 Days</p></div><div><p className="text-[10px] text-gray-400 uppercase font-bold">Started</p><p className="text-lg font-bold text-gray-800">Nov 01</p></div></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"><div className="flex justify-between items-center mb-6"><h3 className="font-bold text-gray-800">History</h3><span className="text-xs font-bold text-gray-400">November 2025</span></div><CalendarGrid /></div>
          </div>
        )}
        {tab === 'history' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100"><tr><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Task Name</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Pomodoros</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Time Spent</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Finished Date</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {HISTORY_TASKS.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="p-2 bg-gray-100 rounded-lg text-gray-600">{task.icon}</div><span className="font-bold text-sm text-gray-800">{task.name}</span></div></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-1 text-sm font-medium text-gray-700"><div className="w-2 h-2 bg-orange-600 rounded-full"></div> {task.pomodoros}</div></td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{task.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.date}</td>
                    <td className="px-6 py-4">{task.status === 'late' ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Late</span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">On Time</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
