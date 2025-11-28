import React from 'react';
import { Flag, Edit3, Layers } from 'lucide-react';
import type { TaskGroup, TimelineTask, HistoryTask, FaqItem, LanguageItem } from '../types';

export const TASK_GROUPS: TaskGroup[] = [
    {
        id: 1,
        title: "Chinese learning",
        desc: "Learn chinese from Mrs.Lee ebook.",
        priority: "High",
        completed: 6,
        total: 8,
        deadline: "1 day left",
        theme: "dark"
    },
    {
        id: 2,
        title: "Mid Autumn charity event planning",
        desc: "Make a plan for Mid Autumn Charity Event.",
        priority: "Medium",
        completed: 0,
        total: 3,
        deadline: "7 days left",
        theme: "light"
    },
    {
        id: 3,
        title: "72 Solomon Demon redrawing...",
        desc: "Remake the 72 Solomon demon and New Year Chinese Zodiac 2025",
        priority: "Low",
        completed: 12,
        total: 84,
        deadline: "34 days left",
        theme: "light"
    }
];

export const TIMELINE_TASKS: TimelineTask[] = [
    { id: 1, title: "Lesson 5", status: "done", date: "Finished: 23 Oct, 2025" },
    { id: 2, title: "Lesson 6", status: "done", date: "Finished: 23 Oct, 2025" },
    {
        id: 3,
        title: "Lesson 7",
        status: "current",
        date: "Deadline: 24 Oct, 2025",
        priority: "Medium",
        pomodoros: 2,
        desc: "Learn something about business."
    },
    { id: 4, title: "Lesson 8", status: "todo", date: "Deadline: 24 Oct, 2025" }
];

export const HISTORY_TASKS: HistoryTask[] = [
    { id: 101, icon: React.createElement(Flag, { size: 16 }), name: "Read Chapter 1", pomodoros: 4, time: "100 mins", deadline: "20/11/2025", date: "20/11/2025", status: "done" },
    { id: 102, icon: React.createElement(Edit3, { size: 16 }), name: "Write Essay Draft", pomodoros: 3, time: "75 mins", deadline: "21/11/2025", date: "21/11/2025", status: "done" },
    { id: 103, icon: React.createElement(Layers, { size: 16 }), name: "Design System Update", pomodoros: 6, time: "150 mins", deadline: "19/11/2025", date: "22/11/2025", status: "late" },
];

export const FAQS: FaqItem[] = [
    { q: "What is the Pomodoro Technique?", a: "The Pomodoro Technique is a time management method developed by Francesco Cirillo. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks." },
    { q: "How do I customize the timer?", a: "Go to Settings > Timer. You can adjust the Pomodoro, Short Break, and Long Break durations using the sliders." },
    { q: "Does the app work offline?", a: "Yes! Totodoro works completely offline. Your data will sync automatically when you reconnect to the internet." },
    { q: "How do streaks work?", a: "A streak is counted for every consecutive day you complete at least one Pomodoro session." },
];

export const LANGUAGES: LanguageItem[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'zh', name: 'Chinese', native: '中文' },
];
