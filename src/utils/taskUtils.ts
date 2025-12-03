import type { TimelineTask } from '../types';

export interface FilterOptions {
    highPriority: boolean;
    mediumPriority: boolean;
    lowPriority: boolean;
    showDone: boolean;
}

export const getFilteredAndSortedTasks = (
    tasks: TimelineTask[],
    groupId: number,
    filterOptions: FilterOptions,
    sortOption: string,
    selectedTaskId: number | null
): TimelineTask[] => {
    return tasks
        .filter(task => {
            // Filter by group first
            if (task.groupId !== groupId) return false;

            const matchesStatus = filterOptions.showDone ? true : task.status !== 'done';
            const matchesPriority =
                (filterOptions.highPriority && task.priority === 'High') ||
                (filterOptions.mediumPriority && task.priority === 'Medium') ||
                (filterOptions.lowPriority && task.priority === 'Low');

            // Always show selected task even if it doesn't match filters
            return (matchesStatus && matchesPriority) || task.id === selectedTaskId;
        })
        .sort((a, b) => {
            if (sortOption === 'priority') {
                const priorityOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
                const pA = a.priority ? priorityOrder[a.priority] : 0;
                const pB = b.priority ? priorityOrder[b.priority] : 0;
                return (pB || 0) - (pA || 0);
            }
            if (sortOption === 'deadline') {
                // Assuming tasks have a date field or we sort by ID/creation if not
                return (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0);
            }
            if (sortOption === 'name') {
                return a.title.localeCompare(b.title);
            }
            if (sortOption === 'pomodoros') {
                return (b.pomodoros || 0) - (a.pomodoros || 0);
            }
            return 0;
        });
};
