import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Layers,
    Plus
} from 'lucide-react';
import type { CalendarViewType, CalendarTask } from '../../types';
import { useTaskStore } from '../../store/useTaskStore';

const CalendarView: React.FC = () => {
    const { tasks, fetchTasks } = useTaskStore();
    const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // Start at Oct 1, 2025
    const [viewMode, setViewMode] = useState<CalendarViewType>('month');

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Helper to parse date string "Deadline: 24 Oct, 2025" -> Date object
    const parseTaskDate = (dateStr: string): Date | null => {
        if (!dateStr) return null;
        // Remove prefixes like "Deadline: " or "Finished: "
        const cleanDateStr = dateStr.replace(/^(Deadline|Finished):\s*/i, '').trim();
        const date = new Date(cleanDateStr);
        return isNaN(date.getTime()) ? null : date;
    };

    // Process tasks into scheduled and unscheduled
    const processedTasks = tasks.map(task => {
        const date = parseTaskDate(task.date);
        return {
            ...task,
            parsedDate: date,
            calendarTask: {
                id: task.id,
                title: task.title,
                date: date ? date.getDate() : 0,
                fullDate: date,
                priority: task.priority || 'Medium',
                status: task.status,
                pomodoros: task.pomodoros || 1,
                completedPomodoros: task.status === 'done' ? (task.pomodoros || 1) : 0
            } as CalendarTask & { fullDate: Date | null }
        };
    });

    const scheduledTasks = processedTasks
        .filter(t => t.parsedDate !== null)
        .map(t => t.calendarTask)
        .filter(t =>
            t.fullDate!.getMonth() === currentDate.getMonth() &&
            t.fullDate!.getFullYear() === currentDate.getFullYear()
        );

    const unscheduledTasks = processedTasks
        .filter(t => t.parsedDate === null)
        .map(t => t.calendarTask);

    // Days in month generator
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 = Sun

    const days = [];
    const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startDay = startDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    // Fill empty slots for start of month
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    // Fill days
    for (let i = 1; i <= totalDays; i++) {
        days.push(i);
    }

    // Helper to find tasks for a day
    const getTasksForDay = (day: number) => {
        return scheduledTasks.filter(task => task.date === day);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] rounded-tl-3xl overflow-hidden">
            {/* Header */}
            <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
                    <p className="text-gray-400 text-sm">Manage your schedule & deadlines.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Navigation */}
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors shadow-sm"><ChevronLeft size={16} /></button>
                        <span className="px-4 text-sm font-bold text-gray-700 w-32 text-center">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors shadow-sm"><ChevronRight size={16} /></button>
                    </div>

                    {/* View Switcher */}
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        {(['month', 'week', 'day'] as const).map(v => (
                            <button
                                key={v}
                                onClick={() => setViewMode(v)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${viewMode === v ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Calendar Grid */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        {/* Days Header */}
                        <div className="grid grid-cols-7 mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                            {days.map((day, index) => (
                                <div key={index} className={`min-h-[120px] bg-white p-2 flex flex-col gap-1 relative group hover:bg-gray-50/50 transition-colors`}>
                                    {day && (
                                        <>
                                            <span className={`text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${day === new Date().getDate() &&
                                                    currentDate.getMonth() === new Date().getMonth() &&
                                                    currentDate.getFullYear() === new Date().getFullYear()
                                                    ? 'bg-black text-white'
                                                    : 'text-gray-500'
                                                }`}>
                                                {day}
                                            </span>

                                            {/* Tasks for the day */}
                                            {getTasksForDay(day).map(task => (
                                                <div
                                                    key={task.id}
                                                    className={`
                                text-[10px] p-1.5 rounded-md border-l-2 cursor-grab active:cursor-grabbing shadow-sm transition-all hover:scale-[1.02]
                                ${task.priority === 'High' ? 'bg-red-50 border-red-500 text-red-700' :
                                                            task.priority === 'Medium' ? 'bg-orange-50 border-orange-500 text-orange-700' :
                                                                'bg-blue-50 border-blue-500 text-blue-700'}
                                ${task.status === 'done' ? 'opacity-50 grayscale' : ''}
                              `}
                                                >
                                                    <div className="font-bold truncate">{task.title}</div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span>{task.completedPomodoros}/{task.pomodoros}</span>
                                                        {task.status !== 'done' && (day || 0) < 25 && <AlertCircle size={10} className="text-red-500" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Unscheduled Sidebar */}
                <div className="w-72 bg-white border-l border-gray-100 p-6 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Layers size={16} /> Unscheduled
                    </h3>
                    <div className="flex-1 space-y-3 overflow-y-auto">
                        {unscheduledTasks.length > 0 ? (
                            unscheduledTasks.map(task => (
                                <div key={task.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-grab hover:bg-white hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-gray-700">{task.title}</span>
                                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-400">Drag to calendar to schedule</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 text-xs py-4">
                                No unscheduled tasks
                            </div>
                        )}

                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 text-xs">
                            <Plus size={20} className="mb-2 opacity-50" />
                            <span>Drop tasks here to unschedule</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
