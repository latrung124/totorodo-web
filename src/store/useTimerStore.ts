import { create } from 'zustand';

interface TimerState {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    pomodorosCompletedSinceLongBreak: number;
    incrementPomodorosCompletedSinceLongBreak: () => void;
    resetPomodorosCompletedSinceLongBreak: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
    isActive: false,
    setIsActive: (isActive) => set({ isActive }),
    pomodorosCompletedSinceLongBreak: 0,
    incrementPomodorosCompletedSinceLongBreak: () => set((state) => ({ pomodorosCompletedSinceLongBreak: state.pomodorosCompletedSinceLongBreak + 1 })),
    resetPomodorosCompletedSinceLongBreak: () => set({ pomodorosCompletedSinceLongBreak: 0 }),
}));
