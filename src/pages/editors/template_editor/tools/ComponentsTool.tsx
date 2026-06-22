import React from 'react';
import { Layers, Plus, Search, Box } from 'lucide-react';

export const ComponentsTool: React.FC = () => {
    const components = [
        { id: '1', name: 'Navbar Main', items: 12 },
        { id: '2', name: 'Footer Dark', items: 8 },
        { id: '3', name: 'CTA Section', items: 5 },
        { id: '4', name: 'Service Card', items: 24 },
    ];

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            <div className="p-2 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Global Library</span>
                <button className="text-indigo-600 hover:text-indigo-700">
                    <Plus size={14} />
                </button>
            </div>

            <div className="p-2">
                <div className="grid grid-cols-2 gap-2">
                    {components.map((comp) => (
                        <div
                            key={comp.id}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center gap-2 hover:border-indigo-400 hover:bg-white transition-all cursor-grab active:cursor-grabbing group"
                        >
                            <Box size={24} className="text-slate-300 group-hover:text-indigo-500 transition-colors" strokeWidth={1.5} />
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-bold text-slate-700 text-center">{comp.name}</span>
                                <span className="text-[7px] text-slate-400 uppercase font-black">{comp.items} Instances</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto p-4 flex flex-col items-center text-center gap-2 border-t border-slate-50">
                <Layers size={20} className="text-slate-200" />
                <p className="text-[9px] text-slate-400 font-medium">Create reusable symbols to build faster across multiple pages.</p>
            </div>
        </div>
    );
};

export default ComponentsTool;
