import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface MiniInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    shortcut?: string;
    className?: string;
}

export const MiniInput: React.FC<MiniInputProps> = ({
    icon: Icon,
    shortcut,
    className = "",
    ...props
}) => {
    return (
        <div className={`relative group/input ${className}`}>
            {Icon && (
                <Icon
                    size={12}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors"
                />
            )}
            <input
                {...props}
                className={`w-full bg-slate-50 border border-slate-200 py-1.5 rounded-lg text-[9px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 focus:border-indigo-500/40 transition-all font-sans outline-none ${Icon ? 'pl-7' : 'px-3'
                    } ${shortcut ? 'pr-10' : 'pr-3'}`}
            />
            {shortcut && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5 opacity-30 group-focus-within/input:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-[8px] font-black text-slate-400 font-mono uppercase">{shortcut}</span>
                </div>
            )}
        </div>
    );
};

export default MiniInput;
