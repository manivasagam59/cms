import {
    Settings2, Box, MousePointer2, GripVertical, Plus,
    Layout, MoveHorizontal, MoveVertical, AlignStartVertical,
    AlignCenterVertical, AlignEndVertical, AlignStartHorizontal,
    AlignCenterHorizontal, AlignEndHorizontal, Maximize2,
    Eye, EyeOff, Zap, ChevronDown, AlignJustify,
    CornerRightDown, Smartphone, Monitor
} from 'lucide-react';
import { useState } from 'react';
import { MiniTabs } from './ui/tabs';


export const TemplatePropertyEditor = () => {
    const [selectedElement, setSelectedElement] = useState<string | null>('hero');
    const [activeInspectorTab, setActiveInspectorTab] = useState('style');
    return (
        <>
            {/* Highly-Dense Pro Inspector */}
            <aside className="w-[260px] border-l border-slate-200 bg-white flex flex-col z-40 select-none">
                {/* Compact Tabs */}
                <MiniTabs
                    activeTab={activeInspectorTab}
                    onChange={(value: string) => setActiveInspectorTab(value)}
                    tabs={['Style', 'Settings', 'Interactions']}
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Style Selector Section */}
                    <div className="p-3 border-b border-slate-50 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Selector</span>
                            <span className="text-[8px] font-semibold text-indigo-500 hover:underline cursor-pointer">Inherit (2)</span>
                        </div>
                        <div className="bg-slate-50/50 border border-slate-200/60 p-1.5 rounded-lg flex items-center gap-2 group transition-all hover:border-slate-300">
                            <div className="px-1.5 py-0.5 bg-indigo-100 border border-indigo-200 text-indigo-600 rounded text-[9px] font-mono font-semibold shadow-sm">.hero-section</div>
                            <Plus size={10} className="text-slate-300 ml-auto cursor-pointer hover:text-indigo-600" />
                        </div>
                    </div>

                    {/* Layout Engine Section */}
                    <div className="p-3 space-y-4">
                        <div className="flex items-center justify-between group cursor-pointer">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-900">Layout</span>
                            <Settings2 size={12} className="text-slate-400 group-hover:text-slate-900 transition-all" />
                        </div>

                        {/* Display Grid */}
                        <div className="space-y-1.5">
                            <label className="text-[8px] font-semibold text-slate-400 uppercase tracking-tight">Display</label>
                            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-50 rounded-lg border border-slate-100">
                                {[Layout, MoveHorizontal, MoveVertical, AlignJustify].map((Icon, i) => (
                                    <button key={i} className={`p-1.5 flex justify-center rounded transition-all ${i === 1 ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}>
                                        <Icon size={12} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Alignment & Justification */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label className="text-[8px] font-semibold text-slate-400 uppercase tracking-tight">Direction</label>
                                <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-100">
                                    <button className="flex-1 py-1.5 flex justify-center text-slate-400 hover:text-indigo-600 transition-all"><MoveHorizontal size={11} /></button>
                                    <button className="flex-1 py-1.5 flex justify-center bg-white border border-slate-100 rounded text-indigo-600 shadow-sm"><MoveVertical size={11} /></button>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[8px] font-semibold text-slate-400 uppercase tracking-tight">Gap</label>
                                <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg hover:border-slate-200 transition-all">
                                    <span className="text-[10px] font-semibold text-slate-800">32</span>
                                    <span className="text-[7px] font-black text-slate-300 ml-auto px-1">PX</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[8px] font-semibold text-slate-400 uppercase tracking-tight">Align</label>
                            <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-100 gap-0.5">
                                {[AlignStartVertical, AlignCenterVertical, AlignEndVertical, Maximize2].map((Icon, i) => (
                                    <button key={i} className={`flex-1 py-1 flex justify-center rounded transition-all ${i === 1 ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}>
                                        <Icon size={11} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Spacing Box - Pro visualizer */}
                    <div className="p-3 space-y-3">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-900 border-b border-slate-50 block pb-1">Spacing</span>
                        <div className="relative p-7 bg-slate-100/50 border border-slate-200/50 rounded-xl flex items-center justify-center transition-all hover:shadow-inner">
                            <div className="absolute top-1 text-[7px] font-semibold text-slate-500 uppercase tracking-widest">Margin</div>

                            <div className="w-full h-12 border-2 border-white rounded flex items-center justify-center relative bg-white/40 group">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-indigo-500/50">32</div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-slate-300">0</div>
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-slate-300 -rotate-90">0</div>
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-slate-300 rotate-90">0</div>

                                <div className="w-14 h-6 border-2 border-dashed border-slate-200/50 rounded flex items-center justify-center bg-indigo-50/30 group-hover:border-indigo-200/50 transition-all">
                                    <span className="text-[9px] font-semibold text-indigo-400 uppercase tracking-tighter">Auto</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Size Section - Compact Grid */}
                    <div className="p-3 space-y-3 border-t border-slate-50">
                        <div className="flex items-center justify-between group">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-900">Size</span>
                            <ChevronDown size={10} className="text-slate-300" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: 'Width', val: 'Auto' },
                                { label: 'Height', val: 'Auto' },
                                { label: 'Min W', val: '0' },
                                { label: 'Min H', val: '0' },
                                { label: 'Max W', val: 'None' },
                                { label: 'Max H', val: 'None' }
                            ].map(item => (
                                <div key={item.label} className="flex flex-col gap-0.5">
                                    <label className="text-[8px] font-semibold text-slate-400 uppercase">{item.label}</label>
                                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-md px-1.5 py-1 hover:border-slate-200 transition-all group/inp">
                                        <span className="text-[9px] font-semibold text-slate-800 flex-1">{item.val}</span>
                                        <span className="text-[7px] font-black text-slate-300 opacity-0 group-hover/inp:opacity-100 transition-opacity">PX</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tiny Switchers */}
                    <div className="p-3 border-t border-slate-50 mt-2 flex flex-col gap-2">
                        <div className="flex items-center justify-between px-1 py-1 hover:bg-slate-50 rounded cursor-pointer group">
                            <div className="flex items-center gap-2">
                                <Eye size={11} className="text-slate-400 group-hover:text-indigo-600" />
                                <span className="text-[9px] font-semibold text-slate-700">Overflow</span>
                            </div>
                            <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 scale-90">
                                <div className="px-1 py-0.5 bg-white shadow-sm rounded border border-slate-100"><Eye size={9} /></div>
                                <div className="px-1 py-0.5 text-slate-400"><EyeOff size={9} /></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inspector Footer Status */}
                <div className="p-2 bg-slate-50/50 border-t border-slate-100 text-center">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Editing Section-Hero-01</span>
                </div>
            </aside>
        </>
    );
}  