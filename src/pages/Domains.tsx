import { useState, useEffect } from 'react';
import {
    Globe,
    Plus,
    CheckCircle2,
    AlertCircle,
    Clock,
    ShieldCheck,
    ExternalLink,
    MoreVertical,
    Trash2,
    Settings,
    Copy,
    ArrowRight,
    Search,
    RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Domains() {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const domains = [
        { id: 1, host: 'www.opencms.io', type: 'Primary', status: 'Active', ssl: 'Active', lastCheck: '2 mins ago' },
        { id: 2, host: 'blog.opencms.io', type: 'Subdomain', status: 'Active', ssl: 'Active', lastCheck: '5 hours ago' },
        { id: 3, host: 'shop.opencms.io', type: 'Subdomain', status: 'Pending', ssl: 'In Progress', lastCheck: 'Just now' },
        { id: 4, host: 'old-landing.com', type: 'Redirect', status: 'Inactive', ssl: 'Expired', lastCheck: '2 days ago' },
    ];

    const filteredDomains = domains.filter(d => d.host.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Domain Management</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Connect and configure custom domains for your OpenCMS site.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Plus size={18} />
                        Add Custom Domain
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* DNS Info Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                        <Globe className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-1000" size={160} />
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-indigo-400" size={20} />
                            Universal SSL
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-6">
                            All domains connected to OpenCMS receive free, automatic SSL certificates via Let's Encrypt.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                            Status: Secure
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">DNS Settings Guide</h3>
                        <p className="text-xs text-slate-500 mb-6 font-medium">Point your domain's A record to our server IP to get started.</p>

                        <div className="space-y-4">
                            <div className="p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</span>
                                    <span className="text-[10px] font-black text-indigo-600 uppercase">Required</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900">A Record</span>
                                    <code className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-100">76.76.21.21</code>
                                </div>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</span>
                                    <span className="text-[10px] font-black text-emerald-600 uppercase">Recommended</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900">CNAME</span>
                                    <code className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-100">cname.opencms.io</code>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-6 flex items-center justify-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-widest hover:bg-indigo-50 py-3 rounded-xl transition-all">
                            Copy DNS Values <Copy size={14} />
                        </button>
                    </div>
                </div>

                {/* Domains List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-50 flex items-center justify-between gap-4">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search domains..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none w-full"
                                />
                            </div>
                            <button className="p-2.5 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-xl transition-all">
                                <RefreshCw size={18} />
                            </button>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {filteredDomains.map((domain) => (
                                <div key={domain.id} className="p-6 hover:bg-slate-50/50 transition-all group cursor-pointer">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "p-3 rounded-2xl flex items-center justify-center transition-all",
                                                domain.status === 'Active' ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"
                                            )}>
                                                <Globe size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{domain.host}</h3>
                                                    {domain.type === 'Primary' && (
                                                        <span className="px-2 py-0.5 bg-indigo-600 text-[9px] font-black text-white uppercase tracking-widest rounded-full">Primary</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5">
                                                        {domain.status === 'Active' ? <CheckCircle2 size={12} className="text-emerald-500" /> : domain.status === 'Pending' ? <Clock size={12} className="text-amber-500" /> : <AlertCircle size={12} className="text-rose-500" />}
                                                        {domain.status}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className="flex items-center gap-1.5">
                                                        <ShieldCheck size={12} className={domain.ssl === 'Active' ? "text-emerald-500" : "text-slate-300"} />
                                                        SSL: {domain.ssl}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center md:justify-end gap-2 px-14 md:px-0">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100">
                                                <Settings size={18} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100">
                                                <ExternalLink size={18} />
                                            </button>
                                            <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />
                                            <button className="p-2 text-slate-300 hover:text-rose-600 group-hover:text-slate-400 transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-2 text-slate-300 md:hidden ml-auto">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {domain.status === 'Pending' && (
                                        <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <AlertCircle size={18} className="text-amber-600" />
                                                <p className="text-[11px] font-bold text-amber-800 tracking-tight">Configuration detected. Propagation might take up to 24 hours.</p>
                                            </div>
                                            <button className="text-[10px] font-black uppercase text-amber-600 hover:underline">Check Again</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {filteredDomains.length === 0 && (
                            <div className="p-20 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">No domains found</h3>
                                <p className="text-slate-500 text-sm">We couldn't find any domains matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-gradient-to-tr from-indigo-50 to-white p-6 rounded-3xl border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900 tracking-tight">Automatic Apex Redirects</h4>
                                <p className="text-xs text-slate-500 font-medium">We automatically redirect non-www to www (or vice versa) for you.</p>
                            </div>
                        </div>
                        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-xs font-black shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                            Advanced Redirection <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
