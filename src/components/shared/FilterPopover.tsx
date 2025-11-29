import React from 'react';
import { ListFilter, X } from 'lucide-react';

export type FilterType = 'group' | 'task';

interface FilterPopoverProps {
    type: FilterType;
    onClose: () => void;
    isOpen: boolean;
    sortOption: string;
    onSortChange: (option: string) => void;
    filterOptions: {
        highPriority: boolean;
        mediumPriority: boolean;
        lowPriority?: boolean; // Added low priority
        showDone?: boolean;
    };
    onFilterChange: (key: string, checked: boolean) => void;
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({
    type,
    onClose,
    isOpen,
    sortOption,
    onSortChange,
    filterOptions,
    onFilterChange
}) => {
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
                                <input
                                    type="radio"
                                    name="sort"
                                    className="accent-black"
                                    checked={sortOption === 'priority'}
                                    onChange={() => onSortChange('priority')}
                                /> Priority (High to Low)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="accent-black"
                                    checked={sortOption === 'deadline'}
                                    onChange={() => onSortChange('deadline')}
                                /> Deadline (Nearest)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="accent-black"
                                    checked={sortOption === 'name'}
                                    onChange={() => onSortChange('name')}
                                /> Name (A-Z)
                            </label>
                        </>
                    ) : (
                        <>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="accent-black"
                                    checked={sortOption === 'deadline'}
                                    onChange={() => onSortChange('deadline')}
                                /> Deadline
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="accent-black"
                                    checked={sortOption === 'priority'}
                                    onChange={() => onSortChange('priority')}
                                /> Priority
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="accent-black"
                                    checked={sortOption === 'name'}
                                    onChange={() => onSortChange('name')}
                                /> Name
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="accent-black"
                                    checked={sortOption === 'pomodoros'}
                                    onChange={() => onSortChange('pomodoros')}
                                /> Pomodoros
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
                        <input
                            type="checkbox"
                            className="accent-black rounded"
                            checked={filterOptions.highPriority}
                            onChange={(e) => onFilterChange('highPriority', e.target.checked)}
                        /> High Priority
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                        <input
                            type="checkbox"
                            className="accent-black rounded"
                            checked={filterOptions.mediumPriority}
                            onChange={(e) => onFilterChange('mediumPriority', e.target.checked)}
                        /> Medium Priority
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                        <input
                            type="checkbox"
                            className="accent-black rounded"
                            checked={filterOptions.lowPriority}
                            onChange={(e) => onFilterChange('lowPriority', e.target.checked)}
                        /> Low Priority
                    </label>
                    {type === 'task' && (
                        <label className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-1.5 rounded cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-black rounded"
                                checked={filterOptions.showDone}
                                onChange={(e) => onFilterChange('showDone', e.target.checked)}
                            /> Show Done Tasks
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
};
