import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Grid,
    Columns,
    List,
    Plus,
    Layers,
    CheckCircle2,
    Play,
    Clock
} from 'lucide-react';
import type { CalendarViewType, CalendarTask } from '../../types';
import { useTaskStore } from '../../store/useTaskStore';

const CalendarView: React.FC = () => {
    const { tasks, fetchTasks } = useTaskStore();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<CalendarViewType>('month');

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    // Helpers for Navigation Logic
    const navigate = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        if (viewMode === 'month') {
            newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
        } else if (viewMode === 'week') {
            newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
        } else {
            newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
        }
        setCurrentDate(newDate);
    };

    const getHeaderLabel = () => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
        if (viewMode === 'month') return currentDate.toLocaleDateString('en-US', options);
        if (viewMode === 'day') return currentDate.toLocaleDateString('en-US', { ...options, day: 'numeric', weekday: 'long' });

        // Week Label Logic (Start - End)
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    // Helper to parse date string "Deadline: 24 Oct, 2025" -> Date object
    const parseTaskDate = (dateStr: string): Date | null => {
        if (!dateStr) return null;
        // Remove prefixes like "Deadline: " or "Finished: "
        const cleanDateStr = dateStr.replace(/^(Deadline|Finished):\s*/i, '').trim();
        const date = new Date(cleanDateStr);
        return isNaN(date.getTime()) ? null : date;
    };

    // Helper to format Date to YYYY-MM-DD
    const formatDateToIso = (date: Date): string => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
                date: date ? formatDateToIso(date) : '',
                deadlineTime: "10:00", // Default time
                priority: task.priority || 'Medium',
                status: task.status,
                pomodoros: task.pomodoros || 1,
                completedPomodoros: task.status === 'done' ? (task.pomodoros || 1) : 0
            } as CalendarTask
        };
    });

    const getTasksForDay = (dayStr: string) => { // Expects YYYY-MM-DD
        return processedTasks
            .filter(t => t.parsedDate !== null && t.calendarTask.date === dayStr)
            .map(t => t.calendarTask);
    };

    const unscheduledTasks = processedTasks
        .filter(t => t.parsedDate === null)
        .map(t => t.calendarTask);

    // View Logic Generators
    const days = [];
    const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startDay = startDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);

    // Helper to generate ISO Date string for comparison
    const getIsoDate = (d: number) => {
        return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    };

    const getWeekDaysDates = () => {
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] rounded-tl-3xl overflow-hidden">
            <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <div><h1 className="text-2xl font-bold text-gray-900">Calendar</h1><p className="text-gray-400 text-sm">Manage your schedule & deadlines.</p></div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                        <button onClick={() => navigate('prev')} className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors shadow-sm"><ChevronLeft size={16} /></button>
                        <span className="px-4 text-sm font-bold text-gray-700 min-w-[140px] text-center">{getHeaderLabel()}</span>
                        <button onClick={() => navigate('next')} className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors shadow-sm"><ChevronRight size={16} /></button>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        {(['month', 'week', 'day'] as const).map(v => (
                            <button key={v} onClick={() => setViewMode(v)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all flex items-center gap-2 ${viewMode === v ? 'bg-white shadow-sm text-gray-900 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}>
                                {v === 'month' && <Grid size={14} />} {v === 'week' && <Columns size={14} />} {v === 'day' && <List size={14} />} {v}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">

                        {/* MONTH VIEW */}
                        {viewMode === 'month' && (
                            <>
                                <div className="grid grid-cols-7 mb-4">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (<div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>))}</div>
                                <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100 flex-1">
                                    {days.map((day, index) => (
                                        <div key={index} className={`min-h-[100px] bg-white p-2 flex flex-col gap-1 relative group hover:bg-gray-50/50 transition-colors`}>
                                            {day && (
                                                <>
                                                    <span className={`text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? 'bg-black text-white' : 'text-gray-500'}`}>{day}</span>
                                                    {getTasksForDay(getIsoDate(day)).map(task => (
                                                        <div key={task.id} className={`text-[10px] p-1.5 rounded-md border-l-2 cursor-grab shadow-sm transition-all hover:scale-[1.02] mb-1 ${task.priority === 'High' ? 'bg-red-50 border-red-500 text-red-700' : task.priority === 'Medium' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-orange-50/50 border-orange-300 text-orange-600'} ${task.status === 'done' ? 'opacity-50 grayscale' : ''}`}>
                                                            <div className="font-bold truncate">{task.title}</div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* WEEK VIEW */}
                        {viewMode === 'week' && (
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-7 mb-4 border-b border-gray-100 pb-4">
                                    {getWeekDaysDates().map((d, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-xs font-bold text-gray-400 uppercase mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                            <div className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full mx-auto ${d.getDate() === new Date().getDate() && d.getMonth() === new Date().getMonth() ? 'bg-black text-white' : 'text-gray-900'}`}>{d.getDate()}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-4 flex-1">
                                    {getWeekDaysDates().map((day) => {
                                        const dayIso = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                                        return (
                                            <div key={dayIso} className="flex flex-col gap-2 h-full border-r border-gray-100 last:border-0 pr-2">
                                                {getTasksForDay(dayIso).map(task => (
                                                    <div key={task.id} className={`p-3 rounded-xl border-l-4 shadow-sm cursor-pointer hover:shadow-md transition-all ${task.priority === 'High' ? 'bg-red-50 border-red-500' : task.priority === 'Medium' ? 'bg-orange-50 border-orange-500' : 'bg-orange-50/30 border-orange-300'}`}>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-200 text-red-800' : task.priority === 'Medium' ? 'bg-orange-200 text-orange-800' : 'bg-orange-100 text-orange-600'}`}>{task.priority}</span>
                                                            {task.status === 'done' && <CheckCircle2 size={12} className="text-green-600" />}
                                                        </div>
                                                        <h4 className="text-xs font-bold text-gray-900 mb-1 line-clamp-2">{task.title}</h4>
                                                        <div className="flex items-center gap-1 text-[10px] text-gray-500"><div className={`w-1.5 h-1.5 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-orange-500' : 'bg-orange-300'}`}></div>{task.completedPomodoros}/{task.pomodoros} Pomodoros</div>
                                                    </div>
                                                ))}
                                                <div className="flex-1 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-xs hover:border-gray-300 hover:text-gray-400 transition-colors cursor-pointer"><Plus size={16} /></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* DAY VIEW */}
                        {viewMode === 'day' && (
                            <div className="flex h-full gap-6">
                                <div className="w-16 flex flex-col justify-between py-4 text-xs text-gray-400 font-mono border-r border-gray-100 pr-4">
                                    {['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map(t => (<div key={t}>{t}</div>))}
                                </div>

                                <div className="flex-1 relative">
                                    <div className="absolute top-[40%] left-0 w-full h-px bg-red-500 z-10 flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div></div>

                                    <div className="space-y-4 mt-4">
                                        {getTasksForDay(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`).map(task => (
                                            <div key={task.id} className={`p-4 rounded-xl border-l-4 shadow-sm flex justify-between items-center ${task.priority === 'High' ? 'bg-red-50 border-red-500' : task.priority === 'Medium' ? 'bg-orange-50 border-orange-500' : 'bg-orange-50/30 border-orange-300'}`}>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-200 text-red-800' : task.priority === 'Medium' ? 'bg-orange-200 text-orange-800' : 'bg-orange-100 text-orange-600'}`}>{task.priority}</span>
                                                        <span className="text-xs text-gray-500">Deadline: {task.deadlineTime}</span>
                                                    </div>
                                                    <h3 className="font-bold text-gray-900">{task.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right"><div className="text-xs text-gray-500">Progress</div><div className="font-mono font-bold text-gray-900">{task.completedPomodoros}/{task.pomodoros}</div></div>
                                                    <button className={`p-2 rounded-lg text-white shadow-md hover:opacity-90 transition-opacity ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-orange-500' : 'bg-orange-300'}`}><Play size={16} fill="currentColor" /></button>
                                                </div>
                                            </div>
                                        ))}

                                        {getTasksForDay(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`).length === 0 && (
                                            <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl"><Clock size={48} className="mb-4 opacity-20" /><p>No tasks scheduled for this day.</p><button className="mt-4 text-xs font-bold text-black hover:underline">Add a Task</button></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Unscheduled Sidebar */}
                <div className="w-72 bg-white border-l border-gray-100 p-6 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Layers size={16} /> Unscheduled</h3>
                    <div className="flex-1 space-y-3 overflow-y-auto">
                        {unscheduledTasks.map(task => (
                            <div key={task.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-grab hover:bg-white hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-1"><span className="text-xs font-bold text-gray-700">{task.title}</span><span className={`text-[8px] px-1.5 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-orange-50 text-orange-600'}`}>{task.priority}</span></div>
                                <p className="text-[10px] text-gray-400">Drag to calendar to schedule</p>
                            </div>
                        ))}
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 text-xs"><Plus size={20} className="mb-2 opacity-50" /><span>Drop tasks here to unschedule</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
