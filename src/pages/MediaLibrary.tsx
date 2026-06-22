import { useState, useEffect } from 'react';
import {
    Search,
    Upload,
    MoreVertical,
    Image as ImageIcon,
    Video,
    FileText,
    Folder,
    Filter,
    Grid,
    List,
    Trash2,
    Download,
    ExternalLink,
    Maximize2,
    HardDrive,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MediaLibrary() {
    const [mounted, setMounted] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const mediaItems = [
        { id: 1, name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', date: '2 hours ago', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', dimensions: '1920x1080' },
        { id: 2, name: 'product-demo.mp4', type: 'video', size: '45.8 MB', date: '5 hours ago', url: '', duration: '0:45' },
        { id: 3, name: 'annual-report-2023.pdf', type: 'document', size: '1.2 MB', date: 'Yesterday', url: '' },
        { id: 4, name: 'team-photos-q3.zip', type: 'archive', size: '128.5 MB', date: 'Oct 24, 2023', url: '' },
        { id: 5, name: 'abstract-bg.png', type: 'image', size: '840 KB', date: 'Oct 22, 2023', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80', dimensions: '1200x800' },
        { id: 6, name: 'interface-assets.fig', type: 'document', size: '8.4 MB', date: 'Oct 15, 2023', url: '' },
        { id: 7, name: 'customer-interview.mov', type: 'video', size: '82.1 MB', date: 'Oct 12, 2023', url: '', duration: '3:12' },
        { id: 8, name: 'marketing-copy.docx', type: 'document', size: '45 KB', date: 'Oct 10, 2023', url: '' },
    ];

    const tabs = ['All', 'Images', 'Videos', 'Documents', 'Other'];

    const filteredMedia = mediaItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' ||
            (activeTab === 'Images' && item.type === 'image') ||
            (activeTab === 'Videos' && item.type === 'video') ||
            (activeTab === 'Documents' && item.type === 'document') ||
            (activeTab === 'Other' && (item.type === 'archive' || item.type === 'other'));
        return matchesSearch && matchesTab;
    });

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Media Library</h1>
                    <p className="text-slate-500 font-medium">Manage images, videos, and documents for your site.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Upload size={18} />
                        Upload Files
                    </button>
                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Storage Quota */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex items-center gap-4 min-w-[240px]">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <HardDrive size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Storage Usage</p>
                        <p className="text-lg font-black text-slate-900">42.8 GB <span className="text-slate-300 font-medium">/ 100 GB</span></p>
                    </div>
                </div>
                <div className="flex-1 w-full relative">
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[42.8%] rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]" />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-[10px] font-bold text-slate-400">42% Used</span>
                        <span className="text-[10px] font-bold text-slate-400">57.2 GB Available</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
                            placeholder="Search media..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none w-full md:w-64"
                        />
                    </div>

                    <div className="h-8 w-px bg-slate-100 mx-1" />

                    <div className="flex items-center bg-slate-50 p-1 rounded-xl">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                viewMode === 'grid' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                viewMode === 'list' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <List size={18} />
                        </button>
                    </div>

                    <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Media Grid */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredMedia.map((item) => (
                        <div key={item.id} className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            {/* Preview Area */}
                            <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center">
                                {item.type === 'image' ? (
                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : item.type === 'video' ? (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                                        <Video size={48} className="text-white/20" />
                                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white">
                                            {item.duration}
                                        </span>
                                    </div>
                                ) : item.type === 'document' ? (
                                    <div className="w-full h-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                        <FileText size={48} className="text-indigo-200" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                        <Folder size={48} className="text-slate-300" />
                                    </div>
                                )}

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center gap-2">
                                    <button className="p-2 bg-white rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg">
                                        <Maximize2 size={18} />
                                    </button>
                                    <button className="p-2 bg-white rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg">
                                        <Download size={18} />
                                    </button>
                                    <button className="p-2 bg-white rounded-lg text-rose-600 hover:bg-rose-50 transition-colors shadow-lg">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Info Area */}
                            <div className="p-4">
                                <p className="text-sm font-bold text-slate-900 truncate mb-1">{item.name}</p>
                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>{item.size}</span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* List View */
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-left">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">File Name</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Size</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Upload Date</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Type</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-left">
                            {filteredMedia.map((item) => (
                                <tr key={item.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all overflow-hidden">
                                                {item.type === 'image' ? (
                                                    <img src={item.url} className="w-full h-full object-cover" />
                                                ) : <ImageIcon size={20} />}
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-slate-600">{item.size}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-slate-500">{item.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">{item.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
                                                <ExternalLink size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
                                                <Download size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <MoreVertical size={16} className="text-slate-300 ml-auto group-hover:hidden" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Empty State */}
            {filteredMedia.length === 0 && (
                <div className="mt-12 text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                        <ImageIcon size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No media found</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8">Try adjusting your search or upload new files to your library.</p>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                        Upload First Media Item
                    </button>
                </div>
            )}
        </div>
    );
}
