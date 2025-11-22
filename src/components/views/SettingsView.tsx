import React, { useState } from 'react';
import { Filter, Check, Clock } from 'lucide-react';
import { SettingsCard } from '../shared';
import { LANGUAGES } from '../../data/mockData';

export const SettingsView: React.FC = () => {
  const [pomoTime, setPomoTime] = useState(20);
  const [shortBreak, setShortBreak] = useState(1);
  const [longBreak, setLongBreak] = useState(15);
  const [interval, setInterval] = useState(4);
  const [activeSetting, setActiveSetting] = useState<'timer' | 'background' | 'notification' | 'automation' | 'language'>('timer');
  const [selectedLang, setSelectedLang] = useState('en');

  const totalMinutes = (pomoTime * interval) + (shortBreak * (interval - 1)) + longBreak;
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return (
    <div className="flex-1 flex h-full bg-[#F3F4F6] rounded-tl-3xl overflow-hidden gap-3 p-3">
      {/* Settings Menu */}
      <section className="w-80 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-yellow-300 border border-gray-200 overflow-hidden flex items-center justify-center">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <span className="font-bold text-gray-800">Settings</span>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
            <Filter size={16}/>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <SettingsCard 
            active={activeSetting === 'timer'} 
            onClick={() => setActiveSetting('timer')}
            title="Timer" 
            desc="Configure Pomodoro, Short Break, and Long Break durations." 
            illustration={
              <svg viewBox="0 0 100 100" className="w-12 h-12" stroke="currentColor" fill="none" strokeWidth="4">
                <circle cx="50" cy="50" r="30" />
                <path d="M50 50 L50 30" />
                <path d="M50 50 L70 50" />
              </svg>
            }
          />
          <SettingsCard 
            active={activeSetting === 'language'} 
            onClick={() => setActiveSetting('language')}
            title="Language" 
            desc="Change the display language." 
            illustration={
              <svg viewBox="0 0 100 100" className="w-12 h-12" stroke="currentColor" fill="none" strokeWidth="4">
                <circle cx="50" cy="50" r="30" />
                <path d="M20 50 L80 50" />
                <ellipse cx="50" cy="50" rx="15" ry="30" />
              </svg>
            }
          />
          <SettingsCard 
            active={activeSetting === 'background'} 
            onClick={() => setActiveSetting('background')}
            title="Background" 
            desc="Themes and appearance settings." 
            illustration={
              <svg viewBox="0 0 100 100" className="w-12 h-12" stroke="currentColor" fill="none" strokeWidth="4">
                <rect x="20" y="20" width="60" height="60" rx="8" />
                <circle cx="50" cy="50" r="15" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Settings Content */}
      <section className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col p-8 overflow-y-auto">
        {activeSetting === 'timer' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Timer Mode Setting</h2>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-6">Time</h3>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Pomodoro Time</span>
                      <span className="text-indigo-600">{pomoTime} mins</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="120" 
                      value={pomoTime} 
                      onChange={(e) => setPomoTime(parseInt(e.target.value))} 
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black" 
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Short Break Time</span>
                      <span className="text-indigo-600">{shortBreak} mins</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={shortBreak} 
                      onChange={(e) => setShortBreak(parseInt(e.target.value))} 
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black" 
                    />
                  </div>
                </div>
                <hr className="border-gray-100" />
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Long Break Interval
                    </label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5,6].map(n => (
                        <button 
                          key={n} 
                          onClick={() => setInterval(n)} 
                          className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                            interval === n 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Long Break Time</span>
                      <span className="text-indigo-600">{longBreak} mins</span>
                    </div>
                    <input 
                      type="range" 
                      min="15" 
                      max="60" 
                      value={longBreak} 
                      onChange={(e) => setLongBreak(parseInt(e.target.value))} 
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black" 
                    />
                  </div>
                </div>
              </div>

              {/* Preview Timeline */}
              <div className="flex-1 border-l border-gray-100 pl-12">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Preview</h3>
                <div className="relative space-y-0 py-2">
                  <div className="absolute left-1.5 top-3 bottom-3 w-[1px] border-l border-dashed border-gray-300"></div>
                  <div className="flex items-center gap-4 relative z-10 mb-4">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                    <span className="text-sm font-bold">Start</span>
                  </div>
                  {[...Array(interval)].map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center gap-4 relative z-10 mb-4">
                        <div className="w-3 flex justify-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="h-1.5 bg-blue-500 rounded-full w-12"></div>
                          <div className="border-t border-dashed border-gray-200 flex-1"></div>
                        </div>
                        <span className="text-xs text-gray-400 w-16 text-right">{pomoTime} min</span>
                      </div>
                      {i < interval - 1 ? (
                        <div className="flex items-center gap-4 relative z-10 mb-4">
                          <div className="w-3 flex justify-center">
                            <div className="w-1 h-2 bg-orange-400 rounded-full"></div>
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="w-0.5 h-2 bg-orange-400 rounded-full"></div>
                            <div className="border-t border-dashed border-gray-200 flex-1"></div>
                          </div>
                          <span className="text-xs text-gray-400 w-16 text-right">{shortBreak} min</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 relative z-10 mb-4">
                          <div className="w-3 flex justify-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="h-1.5 bg-green-500 rounded-full w-16"></div>
                            <div className="border-t border-dashed border-gray-200 flex-1"></div>
                          </div>
                          <span className="text-xs text-gray-400 w-16 text-right">{longBreak} min</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-bold">End</span>
                  </div>
                </div>
                <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl">
                    {totalHours > 0 && `${totalHours} hour `}{remainingMinutes} minutes
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSetting === 'language' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Language</h2>
            <div className="max-w-2xl">
              <p className="text-gray-500 mb-6">
                Choose your preferred language for the interface. Changes will apply immediately.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {LANGUAGES.map((lang) => (
                  <button 
                    key={lang.code} 
                    onClick={() => setSelectedLang(lang.code)} 
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                      selectedLang === lang.code 
                        ? 'border-black bg-gray-50 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        selectedLang === lang.code 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {lang.code.toUpperCase()}
                      </div>
                      <div>
                        <span className={`block font-bold ${
                          selectedLang === lang.code ? 'text-black' : 'text-gray-700'
                        }`}>
                          {lang.name}
                        </span>
                        <span className={`text-xs ${
                          selectedLang === lang.code ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {lang.native}
                        </span>
                      </div>
                    </div>
                    {selectedLang === lang.code && (
                      <div className="bg-black text-white rounded-full p-1">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {!['timer', 'language'].includes(activeSetting) && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Clock size={48} className="mb-4 opacity-20" />
            <p>This setting section is under construction.</p>
          </div>
        )}
      </section>
    </div>
  );
};
