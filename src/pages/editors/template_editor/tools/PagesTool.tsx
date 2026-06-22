import React from 'react';
import { FileText, Plus, Search, MoreVertical, Layout } from 'lucide-react';

export const PagesTool: React.FC = () => {
    const pages = [
        { id: '1', title: 'Home', url: '/', icon: Layout, isHome: true },
        { id: '2', title: 'About Us', url: '/about', icon: FileText },
        { id: '3', title: 'Contact', url: '/contact', icon: FileText },
        { id: '4', title: 'Blog', url: '/blog', icon: FileText },
    ];

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            <div className="p-2 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Site Pages</span>
                <button className="p-1 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all text-indigo-600">
                    <Plus size={14} />
                </button>
            </div>

            <div className="flex-1 py-1">
                {pages.map((page) => (
                    <div
                        key={page.id}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-indigo-50/50 group cursor-pointer transition-colors"
                    >
                        <page.icon size={14} className={page.isHome ? 'text-indigo-500' : 'text-slate-400'} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                {page.title}
                            </span>
                            <span className="text-[8px] text-slate-400 font-mono">{page.url}</span>
                        </div>
                        <MoreVertical size={12} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-all hover:text-slate-600" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PagesTool;
