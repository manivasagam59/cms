import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface MiniButtonProps {
    icon: LucideIcon;
    isActive?: boolean;
    onClick?: () => void;
    label?: string;
    className?: string;
}

export const MiniButton: React.FC<MiniButtonProps> = ({
    icon: Icon,
    isActive = false,
    onClick,
    label,
    className = ""
}) => {
    return (
        <button
            onClick={onClick}
            title={label}
            className={`p-2 rounded-lg transition-all border ${isActive
                ? 'text-indigo-600 bg-indigo-400/20   border-indigo-400'
                : 'text-slate-400 hover:text-slate-900 hover:bg-white border-transparent'
                } ${className}`}
        >
            <Icon size={16} />

        </button>
    );
};

export default MiniButton;
