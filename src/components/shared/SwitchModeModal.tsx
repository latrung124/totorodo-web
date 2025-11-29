import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SwitchModeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const SwitchModeModal: React.FC<SwitchModeModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            {/* Modal Card */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                    <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Switch Timer Mode?</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Switching modes will reset the current timer. Are you sure you want to proceed?
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 transition-colors"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};
