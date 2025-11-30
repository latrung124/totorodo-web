import React, { useState } from 'react';
import { Layers, CheckCircle2, X, Minus, Plus, Save } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';

type Priority = 'High' | 'Medium' | 'Low';

interface CreateModalProps {
    type: 'group' | 'task';
    isOpen: boolean;
    onClose: () => void;
    selectedGroupId?: number;
}

export const CreateModal: React.FC<CreateModalProps> = ({ type, isOpen, onClose, selectedGroupId }) => {
    if (!isOpen) return null;

    // Form State
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');
    const [deadline, setDeadline] = useState('');
    const [pomodoros, setPomodoros] = useState(1);

    const { addTaskGroup, addTask } = useTaskStore();

    // Handlers
    const handleSave = async () => {
        if (!name) return alert('Name is required');

        if (type === 'group') {
            await addTaskGroup({
                title: name,
                desc,
                priority,
                deadline: deadline || 'No deadline',
                theme: 'light', // Default theme
                completed: 0,
                total: 0
            });
        } else {
            if (!selectedGroupId) return alert('No group selected');
            await addTask({
                title: name,
                desc,
                priority,
                date: deadline ? `Deadline: ${deadline}` : '',
                status: 'todo',
                pomodoros,
                groupId: selectedGroupId
            });
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${type === 'group' ? 'bg-black text-white' : 'bg-red-500 text-white'}`}>
                            {type === 'group' ? <Layers size={20} /> : <CheckCircle2 size={20} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {type === 'group' ? 'New Task Group' : 'New Task'}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {type === 'group' ? 'Organize your goals.' : 'Break it down into steps.'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">

                    {/* Icon Picker (Group Only) */}
                    {type === 'group' && (
                        <div className="flex items-center justify-center">
                            <button className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 transition-all">
                                🏴
                            </button>
                            <span className="ml-4 text-xs text-gray-400">Choose an icon to represent<br />this group of tasks.</span>
                        </div>
                    )}

                    {/* Name Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                            {type === 'group' ? 'Group Name' : 'Task Name'} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={type === 'group' ? "e.g. Learn React Native" : "e.g. Read Chapter 4"}
                            maxLength={255}
                            autoFocus
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Description</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Add details, goals, or notes..."
                            maxLength={500}
                            rows={3}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priority */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Priority)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black appearance-none cursor-pointer"
                            >
                                <option value="High">High Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="Low">Low Priority</option>
                            </select>
                        </div>

                        {/* Deadline */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Deadline</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                            />
                        </div>
                    </div>

                    {/* Pomodoros (Task Only) */}
                    {type === 'task' && (
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
                            <div>
                                <span className="block text-sm font-bold text-orange-900">Estimated Pomodoros</span>
                                <span className="text-xs text-orange-600">How many sessions?</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-1 shadow-sm border border-orange-100">
                                <button
                                    onClick={() => setPomodoros(Math.max(1, pomodoros - 1))}
                                    className="p-2 hover:bg-gray-50 rounded-md text-gray-500"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-mono font-bold text-lg w-6 text-center">{pomodoros}</span>
                                <button
                                    onClick={() => setPomodoros(pomodoros + 1)}
                                    className="p-2 hover:bg-gray-50 rounded-md text-gray-500"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transform active:scale-95 transition-all flex items-center gap-2 ${type === 'group' ? 'bg-black hover:bg-gray-800 shadow-gray-200' : 'bg-red-500 hover:bg-red-600 shadow-red-200'}`}
                    >
                        <Save size={16} /> Create {type === 'group' ? 'Group' : 'Task'}
                    </button>
                </div>

            </div>
        </div>
    );
};
