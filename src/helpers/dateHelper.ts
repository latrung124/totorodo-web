import { differenceInCalendarDays, parseISO, isValid, isToday, isPast } from 'date-fns';

export const formatDeadline = (deadline: string): string => {
    // If it's already a "X days left" string or not a date, try to parse it
    // But for now, let's assume if it doesn't look like a date, return as is
    // Simple check for YYYY-MM-DD format or ISO string
    const date = parseISO(deadline);

    if (!isValid(date)) {
        return deadline;
    }

    if (isToday(date)) {
        return 'Today';
    }

    if (isPast(date)) {
        return 'Overdue';
    }

    const daysLeft = differenceInCalendarDays(date, new Date());

    if (daysLeft === 1) {
        return '1 day left';
    }

    return `${daysLeft} days left`;
};
