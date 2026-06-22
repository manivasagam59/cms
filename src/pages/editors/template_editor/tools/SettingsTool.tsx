import React from 'react';
import { Settings, Globe, Shield, Zap, Bell, Command } from 'lucide-react';

export const SettingsTool: React.FC = () => {
    const sections = [
        { icon: Globe, label: 'General', desc: 'Title, URL, Favicon' },
        { icon: Shield, label: 'Hosting', desc: 'Custom domain, SSL' },
        { icon: Zap, label: 'SEO', desc: 'Meta tags, indexing' },
        { icon: Bell, label: 'Forms', desc: 'Notifications, spam' },
        { icon: Command, label: 'Advanced', desc: 'Integrations, code' },
    ];

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Page Settings</span>
            </div>

            <div className="flex-1">
                {sections.map((sec, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-3 px-3 py-3 hover:bg-slate-50 group cursor-pointer border-b border-slate-50 transition-all"
                    >
                        <div className="p-1.5 rounded-md bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                            <sec.icon size={14} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold text-slate-700">{sec.label}</span>
                            <span className="text-[8px] text-slate-400 leading-tight">{sec.desc}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-slate-900 text-white mt-4 mx-2 rounded-xl flex flex-col gap-2 shadow-lg shadow-slate-200">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-70">Live Status</span>
                </div>
                <p className="text-[10px] font-medium leading-relaxed">Your site is currently published and performing at peak speed.</p>
                <button className="mt-1 py-1.5 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-bold transition-all border border-white/10">
                    View Project Dashboard
                </button>
            </div>
        </div>
    );
};

export default SettingsTool;
