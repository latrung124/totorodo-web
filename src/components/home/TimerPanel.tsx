import React, { useState, useEffect } from 'react';
import { Flag, Edit3, Trash2, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';
import { CampfireIllustration, MonsterIcon, GiveUpModal, SwitchModeModal } from '../shared';
import type { TimerMode } from '../../types';

import { useTimerStore } from '../../store/useTimerStore';

export const TimerPanel: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timer, setTimer] = useState(25 * 60);
  const { isActive, setIsActive } = useTimerStore();
  const [giveUpModalOpen, setGiveUpModalOpen] = useState(false);
  const [switchModalOpen, setSwitchModalOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<TimerMode | null>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timer > 0) {
      interval = window.setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timer, setIsActive]);

  const getInitialTime = (m: TimerMode) => {
    if (m === 'pomodoro') return 25 * 60;
    if (m === 'short') return 5 * 60;
    if (m === 'long') return 15 * 60;
    return 25 * 60;
  };

  const switchMode = (newMode: TimerMode) => {
    if (mode === newMode) return;

    const initialTime = getInitialTime(mode);
    const isDirty = timer !== initialTime;

    if (isDirty) {
      setPendingMode(newMode);
      setSwitchModalOpen(true);
    } else {
      setMode(newMode);
      // Preserve isActive state
      setTimer(getInitialTime(newMode));
    }
  };

  const confirmSwitchMode = () => {
    if (pendingMode) {
      setMode(pendingMode);
      // Preserve isActive state
      setTimer(getInitialTime(pendingMode));
      setPendingMode(null);
    }
    setSwitchModalOpen(false);
  };

  const handleGiveUp = () => {
    if (mode === 'pomodoro') {
      setGiveUpModalOpen(true);
    } else {
      // Instant reset for breaks
      setIsActive(false);
      setTimer(getInitialTime(mode));
    }
  };

  const confirmGiveUp = () => {
    setIsActive(false);
    setTimer(getInitialTime(mode));
    setGiveUpModalOpen(false);
  };

  return (
    <section className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col relative">
      <GiveUpModal
        isOpen={giveUpModalOpen}
        onClose={() => setGiveUpModalOpen(false)}
        onConfirm={confirmGiveUp}
      />
      <SwitchModeModal
        isOpen={switchModalOpen}
        onClose={() => {
          setSwitchModalOpen(false);
          setPendingMode(null);
        }}
        onConfirm={confirmSwitchMode}
      />
      <div className="p-6 flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Flag className="text-gray-800 fill-gray-800" size={24} />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Lesson 7</h1>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Edit3 size={16} />
            </button>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-mono font-medium">04:24:14</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex space-x-1">
              <MonsterIcon active={true} />
              <MonsterIcon active={true} />
              <MonsterIcon active={false} />
              <MonsterIcon active={false} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Learn something about technology.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className="p-2 text-gray-400 hover:text-black transition-colors"
            title={isActive ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
            {isActive ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      <div className="px-6 pb-4">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {(['pomodoro', 'short', 'long'] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${mode === m
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {m === 'short' ? 'Short Break' : m === 'long' ? 'Long Break' : m}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center border-y border-dashed border-gray-100 relative bg-gray-50/50 min-h-[180px]">
        <CampfireIllustration />
      </div>
      <div className="p-8 flex flex-col items-center justify-center space-y-6 bg-white rounded-b-2xl">
        <div className="text-7xl font-bold text-gray-900 font-mono tracking-tight">
          {formatTime(timer)}
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className="bg-[#EF4444] hover:bg-red-600 text-white text-lg font-bold px-12 py-4 rounded-2xl shadow-lg shadow-red-200 transition-all transform active:scale-95 flex items-center space-x-2"
        >
          {isActive ? (
            <>
              <Pause fill="currentColor" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play fill="currentColor" />
              <span>Start</span>
            </>
          )}
        </button>
        <button onClick={handleGiveUp} className="text-gray-400 hover:text-gray-600 text-sm font-medium">
          Give up
        </button>
      </div>
      <div className="absolute bottom-4 left-6 flex items-center text-gray-400 text-xs space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span className="capitalize font-semibold text-gray-900">{mode}</span>
      </div>
      <div className="absolute bottom-4 right-6 text-gray-400 text-xs font-mono">
        00:20:00
      </div>
    </section>
  );
};
