import type { TaskGroup, TimelineTask } from '../types';
import { TASK_GROUPS, TIMELINE_TASKS } from '../data/mockData';

const STORAGE_KEYS = {
    GROUPS: 'totorodo_groups_v4',
    TASKS: 'totorodo_tasks_v4',
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

    updateTaskGroup: async (group: TaskGroup): Promise<void> => {
        await delay(300);
        const stored = localStorage.getItem(STORAGE_KEYS.GROUPS);
        const groups: TaskGroup[] = stored ? JSON.parse(stored) : TASK_GROUPS;

        const updatedGroups = groups.map(g => g.id === group.id ? group : g);
        localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(updatedGroups));
    },

    deleteTaskGroup: async (groupId: number): Promise<void> => {
        await delay(300);
        const stored = localStorage.getItem(STORAGE_KEYS.GROUPS);
        const groups: TaskGroup[] = stored ? JSON.parse(stored) : TASK_GROUPS;

        const updatedGroups = groups.filter(g => g.id !== groupId);
        localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(updatedGroups));

        // Also delete tasks associated with this group
        const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (storedTasks) {
            const tasks: TimelineTask[] = JSON.parse(storedTasks);
            const updatedTasks = tasks.filter(t => t.groupId !== groupId); // Assuming tasks have groupId
            localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
        }
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
            completedPomodoros: 0
        };

        const updatedTasks = [...tasks, newTask];
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
        return newTask;
    },

    updateTask: async (task: TimelineTask): Promise<void> => {
        await delay(100);
        const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
        const tasks: TimelineTask[] = stored ? JSON.parse(stored) : TIMELINE_TASKS;

        const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
    },

    updateTasks: async (tasksToUpdate: TimelineTask[]): Promise<void> => {
        await delay(100);
        const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
        const allTasks: TimelineTask[] = stored ? JSON.parse(stored) : TIMELINE_TASKS;

        // Create a map for faster lookup
        const updatesMap = new Map(tasksToUpdate.map(t => [t.id, t]));

        const updatedTasks = allTasks.map(t => updatesMap.has(t.id) ? updatesMap.get(t.id)! : t);
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
    }
};
