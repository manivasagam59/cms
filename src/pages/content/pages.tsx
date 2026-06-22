import { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    MoreHorizontal,
    FileText,
    Copy,
    Trash2,
    Edit3,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    Clock,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Pages() {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        setMounted(true);
    }, []);

    const pages = [
        { id: 1, title: 'Home Page', slug: '/', status: 'Published', author: 'Sarah J.', lastModified: '2 hours ago', type: 'Static', views: '12.4k' },
        { id: 2, title: 'About Us', slug: '/about', status: 'Published', author: 'Mark D.', lastModified: '5 hours ago', type: 'Static', views: '2.1k' },
        { id: 3, title: 'Q4 Product Roadmap', slug: '/roadmap-2023', status: 'Draft', author: 'Alex T.', lastModified: 'Yesterday', type: 'Internal', views: '0' },
        { id: 4, title: 'Contact Sales', slug: '/contact', status: 'Scheduled', author: 'Sarah J.', lastModified: 'Oct 24, 2023', type: 'Form', views: '842' },
        { id: 5, title: 'Pricing Plans', slug: '/pricing', status: 'Published', author: 'Mark D.', lastModified: 'Oct 22, 2023', type: 'Dynamic', views: '5.6k' },
        { id: 6, title: 'Service Terms', slug: '/terms', status: 'Published', author: 'Sarah J.', lastModified: 'Oct 15, 2023', type: 'Legal', views: '1.2k' },
        { id: 7, title: 'Privacy Policy', slug: '/privacy', status: 'Published', author: 'Sarah J.', lastModified: 'Oct 15, 2023', type: 'Legal', views: '1.1k' },
    ];

    const tabs = ['All', 'Published', 'Draft', 'Scheduled', 'Archived'];

    const filteredPages = pages.filter(page => {
        const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) || page.slug.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || page.status === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pages</h1>
                    <p className="text-slate-500 font-medium">Manage and publish content across your platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Plus size={18} />
                        Create New Page
                    </button>
                </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pages</p>
                        <p className="text-xl font-extrabold text-slate-900">48</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Published</p>
                        <p className="text-xl font-extrabold text-slate-900">42</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drafts/Pending</p>
                        <p className="text-xl font-extrabold text-slate-900">6</p>
                    </div>
                </div>
            </div>

            {/* Table Control Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl w-fit">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                    activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search pages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Title & Path</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50"><div className="flex items-center gap-1">Views <ArrowUpDown size={10} /></div></th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Last Edited</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPages.map((page) => (
                                <tr key={page.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{page.title}</p>
                                                <p className="text-xs text-slate-400 font-medium">{page.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold",
                                            page.status === 'Published' && "bg-emerald-50 text-emerald-600",
                                            page.status === 'Draft' && "bg-slate-100 text-slate-600",
                                            page.status === 'Scheduled' && "bg-indigo-50 text-indigo-600",
                                        )}>
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                page.status === 'Published' && "bg-emerald-600",
                                                page.status === 'Draft' && "bg-slate-600",
                                                page.status === 'Scheduled' && "bg-indigo-600",
                                            )} />
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-slate-600">{page.views}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200" />
                                            <div>
                                                <p className="text-xs font-bold text-slate-700">{page.author}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">{page.lastModified}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Duplicate">
                                                <Copy size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="w-px h-4 bg-slate-100 mx-1" />
                                            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">Showing 1 to 7 of 48 results</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-all border border-slate-100 rounded-lg" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, '...', 12].map((n, i) => (
                                <button
                                    key={i}
                                    className={cn(
                                        "w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all",
                                        n === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:bg-slate-50"
                                    )}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-all border border-slate-100 rounded-lg">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty State Illustration Placeholder (if needed later) */}
            {filteredPages.length === 0 && (
                <div className="mt-12 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No pages found</h3>
                    <p className="text-slate-500 text-sm mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
                        className="text-indigo-600 text-sm font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
