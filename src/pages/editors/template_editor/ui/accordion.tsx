import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MiniAccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

export const MiniAccordion: React.FC<MiniAccordionProps> = ({
    title,
    children,
    defaultOpen = true,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`mb-4 ${className}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between px-2 py-1.5 cursor-pointer group select-none"
            >
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                    {title}
                </span>
                <ChevronDown
                    size={10}
                    className={`text-slate-300 group-hover:text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            <div
                className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MiniAccordion;
