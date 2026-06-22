import { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Eye,
    Clock,
    MousePointer2,
    Globe,
    Smartphone,
    Monitor,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    ChevronDown,
    Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Analytics() {
    const [mounted, setMounted] = useState(false);
    const [timeRange] = useState('Last 30 Days');

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = [
        { label: 'Total Views', value: '42,891', trend: '+12.5%', isUp: true, icon: Eye, color: 'indigo' },
        { label: 'Unique Visitors', value: '18,240', trend: '+8.2%', isUp: true, icon: Users, color: 'emerald' },
        { label: 'Avg. Session', value: '4m 32s', trend: '-2.1%', isUp: false, icon: Clock, color: 'violet' },
        { label: 'Bounce Rate', value: '38.4%', trend: '+4.5%', isUp: true, icon: MousePointer2, color: 'amber' },
    ];

    const topPages = [
        { path: '/blog/future-of-strategy', views: '12.4k', unique: '8.2k', bounce: '24%' },
        { path: '/', views: '8.1k', unique: '6.5k', bounce: '42%' },
        { path: '/docs/api-guide', views: '5.2k', unique: '3.1k', bounce: '18%' },
        { path: '/pricing', views: '3.8k', unique: '2.4k', bounce: '56%' },
        { path: '/blog/headless-cms-success', views: '2.1k', unique: '1.4k', bounce: '22%' },
    ];

    const trafficSources = [
        { name: 'Organic Search', value: 45, color: 'bg-indigo-600' },
        { name: 'Direct Traffic', value: 25, color: 'bg-emerald-500' },
        { name: 'Social Media', value: 15, color: 'bg-sky-400' },
        { name: 'Referral sites', value: 10, color: 'bg-violet-500' },
        { name: 'Other', value: 5, color: 'bg-slate-300' },
    ];

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Performance Analytics</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Real-time insights into your site's audience and content.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
                            <Calendar size={16} className="text-slate-400" />
                            {timeRange}
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>
                    </div>
                    <button className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95">
                        <Filter size={18} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Metric Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg shadow-transparent group-hover:shadow-current/10",
                                stat.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                                stat.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                                stat.color === 'violet' && "bg-violet-50 text-violet-600",
                                stat.color === 'amber' && "bg-amber-50 text-amber-600",
                            )}>
                                <stat.icon size={22} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-tight",
                                stat.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            )}>
                                {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>

                        {/* Micro Chart Decorator */}
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <stat.icon size={120} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Visual Chart - Audience Chart */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[460px] relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">Audience Growth</h3>
                                <p className="text-xs text-slate-400 font-medium">Daily impressions & unique visits</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Views</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unique</span>
                                </div>
                            </div>
                        </div>

                        {/* Dummy Premium Styling Chart (using SVG for high fidelity) */}
                        <div className="h-64 mt-12 w-full relative group/chart">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.1" />
                                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <path
                                    d="M0 160 Q 150 20, 300 120 T 600 80 T 1000 140"
                                    className="stroke-indigo-600 stroke-[5] fill-none"
                                    style={{ filter: 'url(#glow)', strokeLinecap: 'round' }}
                                />
                                <path
                                    d="M0 180 Q 150 140, 300 180 T 600 160 T 1000 170"
                                    className="stroke-slate-200 stroke-[4] fill-none"
                                    style={{ strokeLinecap: 'round', opacity: 0.5 }}
                                />
                                {/* Overlay Interactions */}
                                <circle cx="300" cy="120" r="10" className="fill-white stroke-indigo-600 stroke-[4] cursor-pointer" />
                                <circle cx="600" cy="80" r="10" className="fill-white stroke-indigo-600 stroke-[4] cursor-pointer" />
                            </svg>
                            <div className="absolute left-[300px] top-[40px] opacity-0 group-hover/chart:opacity-100 transition-opacity bg-slate-900 text-white p-3 rounded-xl shadow-2xl pointer-events-none -translate-x-1/2">
                                <p className="text-[8px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Oct 12, 2023</p>
                                <p className="text-xs font-bold whitespace-nowrap">Views: 3,421</p>
                                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45" />
                            </div>
                        </div>

                        {/* Y-Axis scale deco */}
                        <div className="absolute left-6 h-64 top-28 flex flex-col justify-between items-end pr-3 border-r border-slate-50">
                            <span className="text-[10px] font-bold text-slate-300">5k</span>
                            <span className="text-[10px] font-bold text-slate-300">2.5k</span>
                            <span className="text-[10px] font-bold text-slate-300">0</span>
                        </div>
                    </div>

                    {/* Top Content Table */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-left">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-lg font-extrabold text-slate-900 leading-none">Popular Content</h3>
                            <button className="text-indigo-600 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline underline-offset-4">
                                Full Breakdown <ArrowUpRight size={14} />
                            </button>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Path</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Views</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unique</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Bounce</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {topPages.map((page, i) => (
                                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-600 transition-colors" />
                                                <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-all font-mono italic">{page.path}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-900">{page.views}</td>
                                        <td className="px-6 py-4 text-xs font-bold text-slate-500">{page.unique}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={cn(
                                                "px-2 py-1 rounded-lg text-[10px] font-black",
                                                parseInt(page.bounce) > 50 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                                            )}>{page.bounce}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Sidebar - Traffic & Device Breakdown */}
                <div className="space-y-8">
                    {/* Traffic Sources */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-extrabold text-slate-900 mb-6">Traffic Sources</h3>
                        <div className="space-y-6">
                            {trafficSources.map((source, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-slate-600">{source.name}</span>
                                        <span className="text-xs font-black text-slate-900">{source.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-1000", source.color)}
                                            style={{ width: mounted ? `${source.value}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Device & Location */}
                    <div className="bg-indigo-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
                        <Globe className="absolute -right-12 -top-12 opacity-10 group-hover:scale-125 transition-transform duration-[3s]" size={240} />
                        <h3 className="text-xl font-bold mb-8 relative z-10">Global reach</h3>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-3xl rounded-3xl flex items-center justify-center border border-white/10 shadow-xl group-hover:bg-white/20 transition-all">
                                    <Monitor size={24} className="text-indigo-200" />
                                </div>
                                <div>
                                    <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest">Desktop</p>
                                    <h4 className="text-2xl font-black">64.2%</h4>
                                </div>
                                <div className="ml-auto text-emerald-400 flex items-center gap-1 font-bold text-xs bg-emerald-400/10 px-2 py-1 rounded-lg">
                                    <ArrowUpRight size={14} /> 2%
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-3xl rounded-3xl flex items-center justify-center border border-white/10 shadow-xl group-hover:bg-white/20 transition-all">
                                    <Smartphone size={24} className="text-indigo-200" />
                                </div>
                                <div>
                                    <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest">Mobile</p>
                                    <h4 className="text-2xl font-black">35.8%</h4>
                                </div>
                                <div className="ml-auto text-rose-400 flex items-center gap-1 font-bold text-xs bg-rose-400/10 px-2 py-1 rounded-lg">
                                    <ArrowDownRight size={14} /> 5%
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                                <span>Top Location</span>
                                <span className="text-white">USA (42%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
