import { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    MoreHorizontal,
    PenTool,
    Copy,
    Trash2,
    Edit3,
    Filter,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Tag,
    Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Posts() {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        setMounted(true);
    }, []);

    const posts = [
        { id: 1, title: 'The Future of Content Strategy', category: 'Strategy', status: 'Published', author: 'Sarah J.', date: '2 hours ago', views: '1.2k', tags: ['AI', 'Digital'] },
        { id: 2, title: 'API Documentation Best Practices', category: 'Development', status: 'Published', author: 'Mark D.', date: '5 hours ago', views: '840', tags: ['API', 'Docs'] },
        { id: 3, title: '10 Tips for Headless CMS Success', category: 'Guides', status: 'Draft', author: 'Alex T.', date: 'Yesterday', views: '0', tags: ['CMS', 'Success'] },
        { id: 4, title: 'How to Scale Your Modern Web Stack', category: 'Tech', status: 'Scheduled', author: 'Sarah J.', date: 'Oct 24, 2023', views: '320', tags: ['React', 'Scale'] },
        { id: 5, title: 'Understanding GraphQL vs REST', category: 'Development', status: 'Published', author: 'Mark D.', date: 'Oct 22, 2023', views: '2.4k', tags: ['GraphQL', 'REST'] },
        { id: 6, title: 'Building with OpenCMS: A Deep Dive', category: 'Announcements', status: 'Published', author: 'OpenCMS Team', date: 'Oct 15, 2023', views: '5.1k', tags: ['OpenCMS', 'Intro'] },
        { id: 7, title: 'The Rise of Serverless CMS', category: 'Tech', status: 'Archived', author: 'Sarah J.', date: 'Oct 10, 2023', views: '150', tags: ['Serverless', 'Cloud'] },
    ];

    const tabs = ['All', 'Published', 'Draft', 'Scheduled', 'Archived'];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || post.status === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Posts</h1>
                    <p className="text-slate-500 font-medium">Create and manage your blog posts and articles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Plus size={18} />
                        New Post
                    </button>
                </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <PenTool size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Posts</p>
                        <p className="text-xl font-extrabold text-slate-900">124</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Layers size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</p>
                        <p className="text-xl font-extrabold text-slate-900">12</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Tag size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Tags</p>
                        <p className="text-xl font-extrabold text-slate-900">34</p>
                    </div>
                </div>
            </div>

            {/* Table Control Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl w-fit overflow-x-auto scrollbar-none">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap",
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
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-slate-100 flex items-center gap-2 px-3">
                            <Filter size={18} />
                            <span className="text-xs font-bold">Filters</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Post Title</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Category</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50"><div className="flex items-center gap-1">Metrics <ArrowUpDown size={10} /></div></th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                                <PenTool size={20} />
                                            </div>
                                            <div className="max-w-xs md:max-w-md lg:max-w-sm">
                                                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{post.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-slate-400 font-medium">{post.author}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className="text-[10px] text-slate-400 font-medium">{post.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold",
                                            post.status === 'Published' && "bg-emerald-50 text-emerald-600",
                                            post.status === 'Draft' && "bg-slate-100 text-slate-600",
                                            post.status === 'Scheduled' && "bg-indigo-50 text-indigo-600",
                                            post.status === 'Archived' && "bg-rose-50 text-rose-600",
                                        )}>
                                            <div className={cn(
                                                "w-1 h-1 rounded-full",
                                                post.status === 'Published' && "bg-emerald-600",
                                                post.status === 'Draft' && "bg-slate-600",
                                                post.status === 'Scheduled' && "bg-indigo-600",
                                                post.status === 'Archived' && "bg-rose-600",
                                            )} />
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Views</p>
                                                <span className="text-xs font-bold text-slate-700">{post.views}</span>
                                            </div>
                                            <div className="h-4 w-px bg-slate-100" />
                                            <div className="flex -space-x-1.5">
                                                <div className="w-5 h-5 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-600" title="SEO Score">92</div>
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
                    <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">Showing 1 to 7 of 124 results</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-all border border-slate-100 rounded-lg" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, '...', 18].map((n, i) => (
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

            {/* Empty State */}
            {filteredPosts.length === 0 && (
                <div className="mt-12 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No posts found</h3>
                    <p className="text-slate-500 text-sm mb-6">We couldn't find any posts matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
                        className="text-indigo-600 text-sm font-bold hover:underline"
                    >
                        Reset search filters
                    </button>
                </div>
            )}
        </div>
    );
}
