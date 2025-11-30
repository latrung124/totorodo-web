import { create } from 'zustand';
import type { TaskGroup, TimelineTask } from '../types';
import { taskService } from '../services/taskService';

interface TaskState {
    taskGroups: TaskGroup[];
    tasks: TimelineTask[];
    isLoading: boolean;
    error: string | null;

    fetchTaskGroups: () => Promise<void>;
    addTaskGroup: (group: Omit<TaskGroup, 'id'>) => Promise<void>;

    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<TimelineTask, 'id'>) => Promise<void>;
    incrementTaskPomodoro: (taskId: number) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    taskGroups: [],
    tasks: [],
    isLoading: false,
    error: null,

    fetchTaskGroups: async () => {
        set({ isLoading: true, error: null });
        try {
            const groups = await taskService.getTaskGroups();
            set({ taskGroups: groups, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch task groups', isLoading: false });
        }
    },

    addTaskGroup: async (group) => {
        set({ isLoading: true, error: null });
        try {
            const newGroup = await taskService.createTaskGroup(group);
            set((state) => ({
                taskGroups: [...state.taskGroups, newGroup],
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to create task group', isLoading: false });
        }
    },

    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const tasks = await taskService.getTasks();
            set({ tasks: tasks, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tasks', isLoading: false });
        }
    },

    addTask: async (task) => {
        set({ isLoading: true, error: null });
        try {
            const newTask = await taskService.createTask(task);
            set((state) => ({
                tasks: [...state.tasks, newTask],
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to create task', isLoading: false });
        }
    },

    incrementTaskPomodoro: async (taskId) => {
        const { tasks } = get();
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const updatedTask = { ...task };
        updatedTask.completedPomodoros = (updatedTask.completedPomodoros || 0) + 1;

        if (updatedTask.pomodoros && updatedTask.completedPomodoros >= updatedTask.pomodoros) {
            updatedTask.status = 'done';
        }

        // Optimistic update
        set((state) => ({
            tasks: state.tasks.map(t => t.id === taskId ? updatedTask : t)
        }));

        try {
            await taskService.updateTask(updatedTask);
        } catch (error) {
            // Revert on failure (omitted for simplicity, but good practice)
            console.error('Failed to update task', error);
        }
    }
}));
