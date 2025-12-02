import type { ReactNode } from 'react';

export type Priority = 'High' | 'Medium' | 'Low';
export type ThemeMode = 'light' | 'dark';
export type TimerMode = 'pomodoro' | 'short' | 'long';
export type TabView = 'home' | 'calendar' | 'stats' | 'settings' | 'help';
export type TaskStatus = 'done' | 'current' | 'todo';
export type HistoryStatus = 'done' | 'late';
export type CalendarViewType = 'month' | 'week' | 'day';

export interface TaskGroup {
  id: number;
  title: string;
  desc: string;
  priority: Priority;
  completed: number;
  total: number;
  deadline: string;
  theme: ThemeMode;
}

export interface TimelineTask {
  id: number;
  title: string;
  status: TaskStatus;
  date: string;
  priority?: Priority;
  pomodoros?: number;
  desc?: string;
  groupId: number;
  completedPomodoros?: number;
  pomodorosSinceLastLongBreak?: number;
}

export interface CalendarTask {
  id: number;
  title: string;
  date: number; // Day of the month for simplicity
  priority: Priority;
  status: TaskStatus;
  pomodoros: number;
  completedPomodoros: number;
}

export interface HistoryTask {
  id: number;
  icon: ReactNode;
  name: string;
  pomodoros: number;
  time: string;
  deadline: string;
  date: string;
  status: HistoryStatus;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LanguageItem {
  code: string;
  name: string;
  native: string;
}
