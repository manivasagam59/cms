import { useState } from 'react';
import {
    Globe, FileText, MoreHorizontal,
    Monitor, Tablet, Smartphone, Pencil,
    CheckCircle2, Code2, Layers, Play, UserPlus, Rocket,
    Command,
    Save
} from 'lucide-react';
import { MiniDropdown } from './ui/dropdown';

export const TemplateEditorHeader = () => {
    const [viewMode, setViewMode] = useState('desktop');

    return (
        <header className="h-10 w-full bg-white border-b border-slate-200 flex items-center justify-between px-2 text-slate-500 select-none z-[100] sticky top-0 shadow-sm">
            {/* Left Section: Ultra-Compact Logo & Selectors */}
            <div className="flex items-center gap-1">
                <div className="p-1.5 hover:bg-slate-100 rounded-md transition-all cursor-pointer group active:scale-90 text-slate-700">
                    <Command size={16} />
                </div>

                <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>

                {/* Page - Mini Card */}
                <MiniDropdown
                    label="Home"
                    icon={FileText}
                    items={[
                        { label: 'Home Page', icon: FileText, onClick: () => console.log('Home') },
                        { label: 'About Us', icon: Globe, onClick: () => console.log('About') },
                        { label: 'Contact', icon: Globe, onClick: () => console.log('Contact') },
                    ]}
                />
            </div>

            {/* Center Section: Viewport Switcher */}
            <div className="flex items-center gap-1">

                <div className="flex items-center gap-0.5 bg-slate-100/50 px-1.5 py-0.5 rounded-lg border border-slate-200/60">
                    {[
                        { id: 'desktop', icon: Monitor, label: 'Desktop' },
                        { id: 'tablet', icon: Tablet, label: 'Tablet' },
                        { id: 'mobile-l', icon: Smartphone, rotate: true, label: 'Mobile Landscape' },
                        { id: 'mobile', icon: Smartphone, label: 'Mobile Portrait' },
                    ].map(({ id, icon: Icon, rotate, label }) => (
                        <button
                            key={id}
                            onClick={() => setViewMode(id)}
                            title={label}
                            className={`p-1 rounded-md transition-all duration-200 ${viewMode === id
                                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 border-none"
                                : "text-slate-400 hover:text-slate-600 hover:bg-white"
                                }`}
                        >
                            <Icon size={14} className={rotate ? "rotate-90" : ""} />
                        </button>
                    ))}

                    <div className="h-3.5 w-[1px] bg-slate-200 mx-1"></div>

                    <span className=" select-all cursor-text min-w-[50px] text-[10px] text-center  text-slate-400 font-sans uppercase">
                        1080 <span className="text-[7px]">px</span>
                    </span>
                </div>
            </div>

            {/* Right Section: Pro Actions */}
            <div className="flex items-center gap-2">

                <button className="p-1.5 text-emerald-500 hover:text-emerald-600 transition-all active:scale-90" title="Saved">
                    <CheckCircle2 size={14} />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all" title="Source">
                    <Code2 size={14} />
                </button>


                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all group " title="Preview">
                    <Play size={14} fill="currentColor" className="opacity-40 group-hover:opacity-100" />
                </button>

                <button className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold text-slate-700 hover:bg-slate-100 rounded-md transition-all border border-slate-200">
                    <Save size={14} className="text-slate-400" />
                </button>

            </div>
        </header>
    );
};

export default TemplateEditorHeader;