import { useState, useEffect } from 'react';
import {
    Activity,
    FileText,
    Users,
    CheckCircle2,
    TrendingUp,
    Clock,
    ArrowUpRight,
    MoreHorizontal,
    Plus,
    LayoutTemplate,
    Globe,
    ArrowRight,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = [
        { label: 'Total Traffic', value: '124.5k', change: '+14.2%', icon: Globe, color: 'indigo' },
        { label: 'Published Pages', value: '48', change: '+4', icon: FileText, color: 'emerald' },
        { label: 'Team Members', value: '12', change: '+2', icon: Users, color: 'amber' },
        { label: 'Site Health', value: '98%', change: '+1.5%', icon: CheckCircle2, color: 'blue' },
    ];

    const recentPages = [
        { title: 'The Future of Content Strategy', author: 'Sarah J.', date: '2 hours ago', status: 'Published', type: 'Blog Post' },
        { title: 'API Documentation v2.1', author: 'Mark D.', date: '5 hours ago', status: 'Draft', type: 'Guide' },
        { title: 'New Customer Success Stories', author: 'Alex T.', date: 'Yesterday', status: 'Scheduled', type: 'Case Study' },
        { title: 'Quarterly Product Roadmap', author: 'Sarah J.', date: 'Oct 24, 2023', status: 'Published', type: 'Internal' },
    ];

    const trafficData = [40, 70, 45, 90, 65, 80, 55, 100, 85, 95, 75, 110];

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 font-medium">Welcome back, here's what's happening with <span className="text-indigo-600">OpenCMS</span> today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                        <TrendingUp size={16} className="text-slate-400" />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Plus size={16} />
                        New Content
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
                    >
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                            <stat.icon size={120} />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn(
                                "p-3 rounded-xl shadow-sm",
                                stat.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                                stat.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                                stat.color === 'amber' && "bg-amber-50 text-amber-600",
                                stat.color === 'blue' && "bg-blue-50 text-blue-600",
                            )}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                                <ArrowUpRight size={12} />
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
                        <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Chart Card */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Traffic Analysis</h3>
                            <p className="text-sm text-slate-500">Real-time visitor trends across all domains</p>
                        </div>
                        <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-600 px-3 py-1.5 focus:ring-2 focus:ring-indigo-600/10 transition-all outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last year</option>
                        </select>
                    </div>

                    <div className="relative h-64 w-full flex items-end gap-2 px-2">
                        {trafficData.map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="w-full bg-slate-50 rounded-lg relative overflow-hidden transition-all duration-500 group-hover:bg-indigo-50"
                                >
                                    <div
                                        style={{ height: '100%' }}
                                        className="absolute inset-0 bg-indigo-600/40 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 rounded-lg"
                                    />
                                    {/* Default accent bar for visual weight */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600/20" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F'][i]}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Peak Traffic</p>
                                <p className="text-lg font-extrabold text-slate-900">22.4k <span className="text-xs font-medium text-slate-400 font-sans">v/day</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Avg. Session</p>
                                <p className="text-lg font-extrabold text-slate-900">4m 32s <span className="text-xs font-medium text-slate-400 font-sans">min</span></p>
                            </div>
                        </div>
                        <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 flex items-center gap-1 group">
                            Full Analytics
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Recent Content Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Recent Content</h3>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {recentPages.map((page, i) => (
                            <div key={i} className="group p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest">{page.type}</span>
                                    <span className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                        page.status === 'Published' && "bg-emerald-50 text-emerald-600",
                                        page.status === 'Draft' && "bg-slate-100 text-slate-600",
                                        page.status === 'Scheduled' && "bg-indigo-50 text-indigo-600",
                                    )}>
                                        {page.status}
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{page.title}</h4>
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-slate-200" />
                                        <span className="font-medium">{page.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1 font-medium">
                                        <Clock size={12} />
                                        {page.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-sm font-bold transition-all active:scale-[0.98]">
                        View All Pages
                    </button>
                </div>
            </div>

            {/* Quick Actions / Integration Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-600/20 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <LayoutTemplate size={120} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 relative z-10">New Feature Release</h3>
                    <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed">
                        We've just launched our new AI-powered content assistant. Boost your production speed by up to 40%.
                    </p>
                    <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all active:scale-95 relative z-10">
                        Try it now
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6 group cursor-pointer hover:border-indigo-100 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <Search size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Universal Search</h4>
                        <p className="text-xs text-slate-500">Quickly find pages, media or team members across all sites.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6 group cursor-pointer hover:border-indigo-100 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Health Signals</h4>
                        <p className="text-xs text-slate-500">Infrastructure monitoring and platform response times.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
