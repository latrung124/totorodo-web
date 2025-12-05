import type { TimelineTask } from "../types";

/**
 * Iterates over tasks. If a task has 0 pomodoros left (completed >= total)
 * but is NOT marked 'done', it fixes the status.
 */
export function isTaskFinished(task: TimelineTask): boolean {
    const total = Number(task.pomodoros);
    const completed = Number(task.completedPomodoros || 0);

    return (total > 0 && completed >= total) ||
        (!total && completed > 0);
}

/**
 * Iterates over tasks. If a task has 0 pomodoros left (completed >= total)
 * but is NOT marked 'done', it fixes the status.
 */
export function sanitizeTaskStatuses(tasks: TimelineTask[]) {
    const validTasks: TimelineTask[] = [];
    const tasksToSync: TimelineTask[] = [];

    tasks.forEach(task => {
        const isFinished = isTaskFinished(task);

        // Check if status is mismatching OR if done but date is missing
        if ((isFinished && task.status !== 'done') || (task.status === 'done' && !task.date)) {
            // 1. Create a corrected version of the task
            const fixedTask: TimelineTask = {
                ...task,
                status: 'done',
                date: task.date || 'Finished'
            };

            // 2. Add to lists
            validTasks.push(fixedTask);
            tasksToSync.push(fixedTask); // This one needs saving to DB
        } else {
            // No changes needed
            validTasks.push(task);
        }
    });

    return { validTasks, tasksToSync };
}
