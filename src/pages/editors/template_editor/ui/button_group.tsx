import React from 'react';

interface ButtonGroupOption {
    label: string;
    value: string;
}

interface MiniButtonGroupProps {
    options: ButtonGroupOption[];
    activeValue: string;
    onChange: (value: string) => void;
    className?: string;
}

export const MiniButtonGroup: React.FC<MiniButtonGroupProps> = ({
    options,
    activeValue,
    onChange,
    className = ""
}) => {
    return (
        <div className={`flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/50  ${className}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`flex-1 py-1 text-[9px] font-semibold uppercase tracking-wider rounded-md transition-all ${activeValue === option.value
                        ? 'bg-white text-indigo-600 border border-indigo-400'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default MiniButtonGroup;
