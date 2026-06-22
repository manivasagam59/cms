import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface BoxButtonProps {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    accent?: 'indigo';
    className?: string;
}

export const BoxButton: React.FC<BoxButtonProps> = ({
    label,
    icon: Icon,
    onClick,
    accent,
    className = ""
}) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-2 py-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group ${className}`}
        >
            <div className={`mb-1.5 p-1.5 rounded-md transition-all duration-300 ${accent === 'indigo'
                ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm'
                : 'text-slate-500 group-hover:text-indigo-600 group-hover:scale-110'
                }`}>
                <Icon size={18} />
            </div>
            <span className="text-[8px] font-semibold text-slate-500 group-hover:text-slate-900 text-center leading-[1.1] max-w-full px-1">
                {label}
            </span>
        </button>
    );
};

export default BoxButton;
