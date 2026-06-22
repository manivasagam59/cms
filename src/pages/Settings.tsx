import { useState, useEffect } from 'react';
import {
    Globe,
    Bell,
    Code,
    Database,
    Moon,
    Upload,
    Save,
    RefreshCw,
    Shield,
    Palette,
    ChevronRight,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('General');

    useEffect(() => {
        setMounted(true);
    }, []);

    const sections = [
        { id: 'General', icon: Globe, label: 'General', desc: 'Site info and identification' },
        { id: 'Branding', icon: Palette, label: 'Branding', desc: 'Visual identity and themes' },
        { id: 'Security', icon: Shield, label: 'Security', desc: 'Authentication and access' },
        { id: 'Notifications', icon: Bell, label: 'Notifications', desc: 'Email and system alerts' },
        { id: 'API', icon: Code, label: 'API & Integrations', desc: 'Connect with third-party apps' },
        { id: 'Advanced', icon: Database, label: 'Backup & Advanced', desc: 'Data management and logs' },
    ];

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Configure your OpenCMS instance and manage site-wide preferences.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Internal Navigation */}
                <aside className="w-full lg:w-72 space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group",
                                activeSection === section.id
                                    ? "bg-white border-indigo-600 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600/20"
                                    : "bg-transparent border-transparent hover:bg-white hover:border-slate-100"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                activeSection === section.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                            )}>
                                <section.icon size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <p className={cn("text-sm font-bold transition-colors", activeSection === section.id ? "text-slate-900" : "text-slate-500")}>{section.label}</p>
                                <p className="text-[10px] text-slate-400 font-medium truncate">{section.desc}</p>
                            </div>
                            <ChevronRight size={16} className={cn("ml-auto transition-all", activeSection === section.id ? "text-indigo-600 opacity-100" : "text-slate-300 opacity-0")} />
                        </button>
                    ))}
                </aside>

                {/* Settings Editor */}
                <main className="flex-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50">
                            <h2 className="text-lg font-bold text-slate-900">{activeSection} Settings</h2>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-[0.2em] mt-1">Configuration Panel</p>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* General Section Demo */}
                            {activeSection === 'General' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Site Title</label>
                                            <input
                                                type="text"
                                                defaultValue="OpenCMS Premium"
                                                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none font-bold"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Site Tagline</label>
                                            <input
                                                type="text"
                                                defaultValue="The future of headless content management"
                                                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Description</label>
                                        <textarea
                                            rows={3}
                                            defaultValue="OpenCMS is a high-performance, open-source headless CMS built for modern web developers."
                                            className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <div className="pt-4 flex items-center justify-between p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                                                <Upload size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Favicon & Site Logo</h4>
                                                <p className="text-xs text-slate-500">Recommended size: 512x512px, PNG or SVG.</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-white border border-indigo-200 text-indigo-600 text-xs font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                            Select Image
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Branding Section Demo */}
                            {activeSection === 'Branding' && (
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-4">Color Palette</h4>
                                        <div className="flex flex-wrap gap-4">
                                            {['#4f46e5', '#10b981', '#f59e0b', '#f43f5e', '#0f172a'].map((color) => (
                                                <div key={color} className="flex flex-col items-center gap-2">
                                                    <div className="w-12 h-12 rounded-2xl shadow-inner border border-white" style={{ backgroundColor: color }} />
                                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{color}</span>
                                                </div>
                                            ))}
                                            <button className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-indigo-300 hover:text-indigo-400 transition-all">
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-900 rounded-[32px] text-white">
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-sm font-bold flex items-center gap-2">
                                                <Moon size={18} className="text-indigo-400" />
                                                Dark Mode Options
                                            </h4>
                                            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                                                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-lg" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed">Enable automatic theme switching based on user's system preferences or provide a manual toggle in the footer.</p>
                                    </div>
                                </div>
                            )}

                            {/* Notifications / Feedback */}
                            <div className="mt-8 flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest border-t border-slate-50 pt-8">
                                <RefreshCw size={14} className="animate-spin-slow" />
                                <span>Changes are periodically autosaved locally</span>
                                <div className="h-4 w-px bg-slate-100 mx-2" />
                                <span className="text-indigo-400">Last saved: Just now</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Helper */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-indigo-100 transition-colors group">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <ExternalLink size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 leading-none mb-1">View Public Site</h4>
                                <p className="text-xs text-slate-400 font-medium tracking-tight">Open your site in a new tab</p>
                            </div>
                        </div>
                        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-rose-100 transition-colors group">
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
                                <Database size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 leading-none mb-1">Clear Cache</h4>
                                <p className="text-xs text-slate-400 font-medium tracking-tight">Purge all server-side assets</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function Plus({ size }: { size?: number }) {
    return (
        <svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    )
}
