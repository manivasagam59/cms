import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, type LucideIcon } from 'lucide-react';

interface DropdownItem {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
}

interface MiniDropdownProps {
    label: string;
    icon: LucideIcon;
    items?: DropdownItem[];
    className?: string;
}

export const MiniDropdown: React.FC<MiniDropdownProps> = ({
    label,
    icon: Icon,
    items = [],
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:bg-white transition-all group shadow-sm active:scale-95"
            >
                <Icon size={13} className="text-indigo-500" />
                <span className="text-[10px] font-bold text-slate-900">{label}</span>
                <ChevronDown
                    size={10}
                    className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {isOpen && items.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-xl z-[110] py-1 animate-in fade-in zoom-in-95 duration-100 origin-top-left overflow-hidden">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                item.onClick?.();
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-indigo-50/50 cursor-pointer transition-colors group/item"
                        >
                            {item.icon && <item.icon size={12} className="text-slate-400 group-hover/item:text-indigo-500 transition-colors" />}
                            <span className="text-[10px] font-medium text-slate-600 group-hover/item:text-indigo-600">{item.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MiniDropdown;
