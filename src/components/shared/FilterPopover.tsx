import React from 'react';
import { ListFilter, X } from 'lucide-react';

export type FilterType = 'group' | 'task';

interface FilterPopoverProps {
    type: FilterType;
    onClose: () => void;
    isOpen: boolean;
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({ type, onClose, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <ListFilter size={14} /> Sort & Filter
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X size={14} />
                </button>
            </div>

            {/* Sort Section */}
            <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-wider">Sort By</p>
                <div className="space-y-1">
                    {type === 'group' ? (
                        <>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input type="radio" name="sort" className="accent-black" defaultChecked /> Priority (High to Low)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input type="radio" name="sort" className="accent-black" /> Deadline (Nearest)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input type="radio" name="sort" className="accent-black" /> Name (A-Z)
                            </label>
                        </>
                    ) : (
                        <>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input type="radio" name="sort" className="accent-black" defaultChecked /> Deadline
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input type="radio" name="sort" className="accent-black" /> Priority
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input type="radio" name="sort" className="accent-black" /> Name
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input type="radio" name="sort" className="accent-black" /> Pomodoros
                            </label>
                        </>
                    )}
                </div>
            </div>

            {/* Filter Section */}
            <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-wider">Filter By</p>
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                        <input type="checkbox" className="accent-black rounded" defaultChecked /> High Priority
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                        <input type="checkbox" className="accent-black rounded" defaultChecked /> Medium Priority
                    </label>
                    {type === 'task' && (
                        <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                            <input type="checkbox" className="accent-black rounded" /> Show Done Tasks
                        </label>
                    )}
                </div>
            </div>

            <button className="w-full mt-4 bg-black text-white text-xs font-bold py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Apply
            </button>
        </div>
    );
};
