import React from 'react';

interface MiniTabOption {
    label: string;
    value: string;
}

interface MiniTabsProps {
    tabs: (string | MiniTabOption)[];
    activeTab: string;
    onChange: (value: string) => void;
    className?: string;
}

export const MiniTabs: React.FC<MiniTabsProps> = ({
    tabs,
    activeTab,
    onChange,
    className = ""
}) => {
    return (
        <div className={`flex border-b border-slate-100 bg-slate-50/20 p-0.5 sticky top-0 z-10 transition-colors ${className}`}>
            {tabs.map((tab) => {
                const label = typeof tab === 'string' ? tab : tab.label;
                const value = typeof tab === 'string' ? tab.toLowerCase() : tab.value;
                const isActive = activeTab === value;

                return (
                    <button
                        key={value}
                        onClick={() => onChange(value)}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest transition-all font-semibold ${isActive
                                ? 'bg-white text-indigo-600 shadow-sm border-b-2 border-b-indigo-500'
                                : 'text-slate-400 hover:text-slate-700'
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};

export default MiniTabs;
