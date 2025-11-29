import type { TaskGroup, TimelineTask } from '../types';
import { TASK_GROUPS, TIMELINE_TASKS } from '../data/mockData';

const STORAGE_KEYS = {
    GROUPS: 'totorodo_groups',
    TASKS: 'totorodo_tasks',
};

// Helper to simulate async delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const taskService = {
    getTaskGroups: async (): Promise<TaskGroup[]> => {
        await delay(300); // Simulate network latency
        const stored = localStorage.getItem(STORAGE_KEYS.GROUPS);
        if (!stored) {
            // Initialize with mock data if empty
            localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(TASK_GROUPS));
            return TASK_GROUPS;
        }
        return JSON.parse(stored);
    },

    createTaskGroup: async (group: Omit<TaskGroup, 'id'>): Promise<TaskGroup> => {
        await delay(300);
        const stored = localStorage.getItem(STORAGE_KEYS.GROUPS);
        const groups: TaskGroup[] = stored ? JSON.parse(stored) : TASK_GROUPS;

        const newGroup: TaskGroup = {
            ...group,
            id: Date.now(), // Simple ID generation
        };

        const updatedGroups = [...groups, newGroup];
        localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(updatedGroups));
        return newGroup;
    },

    getTasks: async (): Promise<TimelineTask[]> => {
        await delay(300);
        const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(TIMELINE_TASKS));
            return TIMELINE_TASKS;
        }
        return JSON.parse(stored);
    },

    createTask: async (task: Omit<TimelineTask, 'id'>): Promise<TimelineTask> => {
        await delay(300);
        const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
        const tasks: TimelineTask[] = stored ? JSON.parse(stored) : TIMELINE_TASKS;

        const newTask: TimelineTask = {
            ...task,
            id: Date.now(),
        };

        const updatedTasks = [...tasks, newTask];
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
        return newTask;
    }
};
