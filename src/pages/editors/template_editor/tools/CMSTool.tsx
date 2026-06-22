import React from 'react';
import { Database, Plus, ChevronRight, Settings } from 'lucide-react';

export const CMSTool: React.FC = () => {
    const collections = [
        { id: '1', name: 'Blog Posts', count: 12, color: 'bg-emerald-500' },
        { id: '2', name: 'Authors', count: 4, color: 'bg-indigo-500' },
        { id: '3', name: 'Categories', count: 6, color: 'bg-amber-500' },
        { id: '4', name: 'Projects', count: 15, color: 'bg-rose-500' },
    ];

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            <div className="p-2 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Collections</span>
                <Plus size={14} className="text-indigo-600 cursor-pointer hover:scale-110 transition-transform" />
            </div>

            <div className="flex-1 py-1">
                {collections.map((col) => (
                    <div
                        key={col.id}
                        className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50 group cursor-pointer border-l-2 border-transparent hover:border-indigo-400"
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${col.color}`} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-700">{col.name}</span>
                            <span className="text-[8px] text-slate-400 uppercase font-black tracking-tight">{col.count} Items</span>
                        </div>
                        <ChevronRight size={10} className="ml-auto text-slate-300 group-hover:text-slate-600 transition-all" />
                    </div>
                ))}
            </div>

            <div className="p-3 bg-indigo-50/30 border-t border-slate-50 flex items-center gap-2">
                <Settings size={12} className="text-indigo-400" />
                <span className="text-[9px] font-bold text-indigo-600">CMS Settings</span>
            </div>
        </div>
    );
};

export default CMSTool;
