import { create } from 'zustand';

interface TimerState {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
    isActive: false,
    setIsActive: (isActive) => set({ isActive }),
}));
