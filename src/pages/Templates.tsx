import { useState, useEffect } from 'react';
import {
    LayoutTemplate,
    Plus,
    Search,
    Filter,
    Copy,
    Edit3,
    Trash2,
    Eye,
    Star,
    Monitor,
    Smartphone,
    Tablet,
    ArrowUpRight,
    CheckCircle2,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Templates() {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        setMounted(true);
    }, []);

    const categories = ['All', 'Landing Pages', 'Blog', 'E-commerce', 'Portfolio', 'Custom'];

    const templates = [
        {
            id: 1,
            name: 'Modern SaaS Landing',
            category: 'Landing Pages',
            status: 'Official',
            lastEdited: '2 days ago',
            preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
            rating: 4.9,
            installs: '1.2k'
        },
        {
            id: 2,
            name: 'Minimal Portfolio',
            category: 'Portfolio',
            status: 'Official',
            lastEdited: '1 week ago',
            preview: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=400',
            rating: 4.7,
            installs: '850'
        },
        {
            id: 3,
            name: 'Dev Documentation',
            category: 'Custom',
            status: 'Draft',
            lastEdited: '3 hours ago',
            preview: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400',
            rating: 0,
            installs: '0'
        },
        {
            id: 4,
            name: 'High-Convert Shop',
            category: 'E-commerce',
            status: 'Official',
            lastEdited: '5 days ago',
            preview: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=400',
            rating: 4.8,
            installs: '3.4k'
        },
        {
            id: 5,
            name: 'Clean Blog Grid',
            category: 'Blog',
            status: 'Community',
            lastEdited: 'Oct 12, 2023',
            preview: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400',
            rating: 4.5,
            installs: '2.1k'
        },
        {
            id: 6,
            name: 'Agency Dark Theme',
            category: 'Landing Pages',
            status: 'Official',
            lastEdited: '2 weeks ago',
            preview: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400',
            rating: 4.9,
            installs: '1.5k'
        }
    ];

    const filteredTemplates = templates.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Template management</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Choose from our pre-built layouts or create your own custom framework.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Plus size={18} />
                        Create New Template
                    </button>
                </div>
            </div>

            {/* Quick Stats & Filters */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                                activeCategory === cat
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    : "bg-white text-slate-500 border border-slate-100 hover:border-slate-300 shadow-sm"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 outline-none transition-all"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-indigo-600 transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-600/10 transition-all overflow-hidden relative">
                        {/* Preview Image Container */}
                        <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img
                                src={template.preview}
                                alt={template.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-90">
                                    <Eye size={20} />
                                </button>
                                <button className="p-3 bg-indigo-600 text-white rounded-full hover:bg-white hover:text-indigo-600 transition-all shadow-xl active:scale-90">
                                    <Zap size={20} />
                                </button>
                            </div>

                            {/* Tags/Badges */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className={cn(
                                    "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm",
                                    template.status === 'Official' ? "bg-indigo-600 text-white" : template.status === 'Draft' ? "bg-slate-900 text-white" : "bg-emerald-500 text-white"
                                )}>
                                    {template.status}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{template.category}</span>
                                {template.rating > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Star size={12} className="text-amber-400 fill-amber-400" />
                                        <span className="text-xs font-black text-slate-700">{template.rating}</span>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{template.name}</h3>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex items-center -space-x-1">
                                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200">
                                        <Monitor size={12} />
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200">
                                        <Tablet size={12} />
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200">
                                        <Smartphone size={12} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 p-1 px-2.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-600" />
                                    <span className="text-[10px] font-black text-slate-500 group-hover:text-indigo-600 uppercase tracking-tighter">{template.installs} Installs</span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Quick Actions */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg border border-white/20 p-1 flex flex-col gap-1">
                                <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all"><Edit3 size={16} /></button>
                                <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all"><Copy size={16} /></button>
                                <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Card (Empty State Trigger) */}
                <div className="group border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-center hover:border-indigo-300 hover:bg-indigo-50/10 transition-all cursor-pointer min-h-[300px]">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all mb-4">
                        <Plus size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Build from scratch</h3>
                    <p className="text-xs text-slate-400 font-medium">Start with a blank canvas and design your own structure.</p>
                </div>
            </div>

            {/* Template Info Card */}
            <div className="mt-12 bg-slate-900 rounded-[40px] p-8 xl:p-12 text-white relative overflow-hidden group">
                <div className="relative z-10 flex flex-col xl:flex-row items-center gap-8 justify-between">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <Zap size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Pro Feature</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Advanced Hybrid Templates Engine</h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            OpenCMS supports dynamic component injection and atomic design principles. Build complex nested layouts that scale effortlessly across thousands of pages.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                <CheckCircle2 size={16} className="text-indigo-400" />
                                <span className="text-sm font-bold">SEO Optimized</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                <CheckCircle2 size={16} className="text-indigo-400" />
                                <span className="text-sm font-bold">Lighthouse Core Web Vitals 100/100</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                <CheckCircle2 size={16} className="text-indigo-400" />
                                <span className="text-sm font-bold">Tailwind Native</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-base font-black hover:bg-indigo-50 transition-all flex items-center gap-3 active:scale-95">
                            Read Framework Docs
                            <ArrowUpRight size={20} />
                        </button>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <LayoutTemplate className="absolute -left-12 -bottom-12 opacity-5 scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0" size={300} />
            </div>
        </div>
    );
}
