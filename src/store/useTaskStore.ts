import { create } from 'zustand';
import type { TaskGroup, TimelineTask } from '../types';
import { taskService } from '../services/taskService';
import { sanitizeTaskStatuses, isTaskFinished } from '../helpers/statusTaskHelper';

interface TaskState {
    taskGroups: TaskGroup[];
    tasks: TimelineTask[];
    isLoading: boolean;
    error: string | null;

    fetchTaskGroups: () => Promise<void>;
    addTaskGroup: (group: Omit<TaskGroup, 'id'>) => Promise<void>;
    updateTaskGroup: (group: TaskGroup) => Promise<void>;
    deleteTaskGroup: (groupId: number) => Promise<void>;

    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<TimelineTask, 'id'>) => Promise<void>;
    incrementTaskPomodoro: (taskId: number) => Promise<void>;
    resetTaskPomodorosSinceLongBreak: (taskId: number) => Promise<void>;
    setCurrentTask: (taskId: number) => Promise<void>;
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

    updateTaskGroup: async (group: TaskGroup) => {
        set({ isLoading: true, error: null });
        try {
            await taskService.updateTaskGroup(group);
            set((state) => ({
                taskGroups: state.taskGroups.map(g => g.id === group.id ? group : g),
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to update task group', isLoading: false });
        }
    },

    deleteTaskGroup: async (groupId: number) => {
        set({ isLoading: true, error: null });
        try {
            await taskService.deleteTaskGroup(groupId);
            set((state) => ({
                taskGroups: state.taskGroups.filter(g => g.id !== groupId),
                // Also remove tasks for this group from local state
                tasks: state.tasks.filter(t => t.groupId !== groupId),
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to delete task group', isLoading: false });
        }
    },

    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const tasks = await taskService.getTasks();
            const { validTasks, tasksToSync } = sanitizeTaskStatuses(tasks);

            if (tasksToSync.length > 0) {
                taskService.updateTasks(tasksToSync).catch(err => console.error('Failed to sync sanitized tasks', err));
            }

            set({ tasks: validTasks, isLoading: false });
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
        updatedTask.pomodorosSinceLastLongBreak = (updatedTask.pomodorosSinceLastLongBreak || 0) + 1;

        if (isTaskFinished(updatedTask)) {
            updatedTask.status = 'done';
        }

        // Optimistic update
        set((state) => ({
            tasks: state.tasks.map(t => t.id === taskId ? updatedTask : t)
        }));

        try {
            await taskService.updateTask(updatedTask);
        } catch (error) {
            console.error('Failed to update task', error);
        }
    },

    resetTaskPomodorosSinceLongBreak: async (taskId) => {
        const { tasks } = get();
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const updatedTask = { ...task, pomodorosSinceLastLongBreak: 0 };

        set((state) => ({
            tasks: state.tasks.map(t => t.id === taskId ? updatedTask : t)
        }));

        try {
            await taskService.updateTask(updatedTask);
        } catch (error) {
            console.error('Failed to update task', error);
        }
    },

    setCurrentTask: async (taskId: number) => {
        const { tasks } = get();
        const taskToSet = tasks.find(t => t.id === taskId);
        if (!taskToSet) return;

        // Find currently active task to unset
        const previousCurrent = tasks.find(t => t.status === 'current' && t.id !== taskId);

        const updatedTasks = tasks.map(t => {
            if (t.id === taskId) {
                return { ...t, status: 'current' as const };
            }
            if (previousCurrent && t.id === previousCurrent.id) {
                const newStatus = isTaskFinished(t) ? 'done' : 'todo';
                return { ...t, status: newStatus };
            }
            return t;
        });

        set({ tasks: updatedTasks });

        try {
            if (previousCurrent) {
                const newStatus = isTaskFinished(previousCurrent) ? 'done' : 'todo';
                await taskService.updateTask({ ...previousCurrent, status: newStatus });
            }
            await taskService.updateTask({ ...taskToSet, status: 'current' });
        } catch (error) {
            console.error('Failed to update task status', error);
        }
    }
}));
