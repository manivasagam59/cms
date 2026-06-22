import { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    MoreHorizontal,
    Layers,
    Trash2,
    Edit3,
    Filter,
    ChevronLeft,
    ChevronRight,
    Activity,
    FileText,
    Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Categories() {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const categories = [
        { id: 1, name: 'Strategy', slug: 'strategy', postCount: 24, status: 'Active', color: 'indigo' },
        { id: 2, name: 'Development', slug: 'development', postCount: 18, status: 'Active', color: 'emerald' },
        { id: 3, name: 'Guides', slug: 'guides', postCount: 12, status: 'Active', color: 'amber' },
        { id: 4, name: 'Tech', slug: 'tech', postCount: 31, status: 'Active', color: 'violet' },
        { id: 5, name: 'Announcements', slug: 'announcements', postCount: 8, status: 'Active', color: 'rose' },
        { id: 6, name: 'Case Studies', slug: 'case-studies', postCount: 15, status: 'Inactive', color: 'slate' },
        { id: 7, name: 'Internal', slug: 'internal', postCount: 5, status: 'Active', color: 'blue' },
    ];

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Categories</h1>
                    <p className="text-slate-500 font-medium">Organize your content with hierarchical categories.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Plus size={18} />
                        Add New Category
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Quick Form Placeholder */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Plus size={16} className="text-indigo-600" />
                            Quick Add Category
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Technology"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Slug</label>
                                <div className="relative">
                                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <input
                                        type="text"
                                        placeholder="technology"
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all active:scale-[0.98] mt-2">
                                Save Category
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-xl shadow-indigo-200">
                        <Activity className="mb-4 opacity-80" size={24} />
                        <h3 className="font-bold text-lg mb-2">Category Insights</h3>
                        <p className="text-indigo-100 text-xs leading-relaxed mb-4">
                            Organizing content into focused categories improves your site's SEO ranking by up to 25%.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-3 py-1.5 rounded-lg">
                            Structure is Key
                        </div>
                    </div>
                </div>

                {/* Right: Table management */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-left">
                        <div className="p-4 border-b border-slate-50 flex items-center justify-between gap-4">
                            <div className="relative group flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none w-full"
                                />
                            </div>
                            <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                                <Filter size={18} />
                            </button>
                        </div>

                        <div className="overflow-x-auto text-left">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Category</th>
                                        <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Slug</th>
                                        <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Posts</th>
                                        <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredCategories.map((cat) => (
                                        <tr key={cat.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                                        cat.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                                                        cat.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                                                        cat.color === 'amber' && "bg-amber-50 text-amber-600",
                                                        cat.color === 'violet' && "bg-violet-50 text-violet-600",
                                                        cat.color === 'rose' && "bg-rose-50 text-rose-600",
                                                        cat.color === 'slate' && "bg-slate-100 text-slate-500",
                                                        cat.color === 'blue' && "bg-blue-50 text-blue-600",
                                                    )}>
                                                        <Layers size={16} />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium text-slate-400 italic">/{cat.slug}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={14} className="text-slate-300" />
                                                    <span className="text-xs font-bold text-slate-700">{cat.postCount}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold",
                                                    cat.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    <div className={cn(
                                                        "w-1 h-1 rounded-full",
                                                        cat.status === 'Active' ? "bg-emerald-600" : "bg-slate-400"
                                                    )} />
                                                    {cat.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-30 border border-slate-100 rounded-lg" disabled>
                                    <ChevronLeft size={16} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-slate-900 border border-slate-100 rounded-lg">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Page 1 of 1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
