import React from 'react';
import { Upload, Search, Filter, MoreVertical, Image as ImageIcon } from 'lucide-react';

export const AssetsTool: React.FC = () => {
    const assets = [
        { id: '1', name: 'hero-bg.jpg', size: '1.2MB' },
        { id: '2', name: 'logo-dark.svg', size: '45KB' },
        { id: '3', name: 'feature-01.png', size: '800KB' },
        { id: '4', name: 'user-av.webp', size: '12KB' },
        { id: '5', name: 'icon-set.zip', size: '4.5MB' },
        { id: '6', name: 'footer-map.png', size: '1.1MB' },
    ];

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            <div className="p-2 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 sticky top-0 z-10">
                <button className="flex items-center gap-1.5 px-2 py-1 bg-indigo-600 text-white rounded text-[10px] font-semibold uppercase tracking-widest hover:bg-indigo-700 transition-all w-full justify-center">
                    <Upload size={14} />
                    Upload
                </button>
            </div>

            <div className="p-2 grid grid-cols-2 gap-2">
                {assets.map((asset) => (
                    <div
                        key={asset.id}
                        className="aspect-square bg-slate-50 border border-slate-200 rounded-lg overflow-hidden group cursor-pointer hover:border-indigo-400 relative"
                    >
                        <div className="w-full h-full flex items-center justify-center text-slate-200 group-hover:text-indigo-100 transition-colors">
                            <ImageIcon size={32} strokeWidth={1} />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-1.5 bg-white/90 backdrop-blur-sm border-t border-slate-100 translate-y-full group-hover:translate-y-0 transition-transform">
                            <p className="text-[8px] font-bold text-slate-700 truncate">{asset.name}</p>
                            <p className="text-[7px] text-slate-400 uppercase font-black">{asset.size}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetsTool;
