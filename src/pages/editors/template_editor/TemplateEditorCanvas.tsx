import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trash2, Copy, ArrowUp, Move, Plus } from 'lucide-react';

interface ElementMetrics {
    top: number;
    left: number;
    width: number;
    height: number;
    padding: { top: number; right: number; bottom: number; left: number };
    margin: { top: number; right: number; bottom: number; left: number };
}

export const TemplateEditorCanvas = () => {
    const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const [metrics, setMetrics] = useState<ElementMetrics | null>(null);
    const [hoverMetrics, setHoverMetrics] = useState<{ top: number, left: number, width: number, height: number } | null>(null);
    const [isDragging, setIsDragging] = useState<{ side: string, type: 'padding' | 'margin', startVal: number, startPos: number } | null>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const canvasRootRef = useRef<HTMLDivElement>(null);

    // Initial Iframe Setup
    useEffect(() => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;

        // Inject initial content & tailwind for the sandbox
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        body { margin: 0; min-height: 100vh; padding: 48px; background: white; cursor: default; }
                        * { transition: outline 0.1s ease; }
                        .editor-selected { outline: 2px solid transparent !important; }
                    </style>
                </head>
                <body id="canvas-body">
                    <div class="space-y-16 flex flex-col">
                        <!-- Hero Section -->
                        <div class="py-32 px-12 bg-slate-900 rounded-[2rem] text-center space-y-8 overflow-hidden relative">
                            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
                            <h1 class="text-7xl font-black text-white tracking-tighter relative z-10">
                                Sandboxed <br/> <span class="text-indigo-400">Environment</span>
                            </h1>
                            <p class="text-slate-400 text-xl max-w-xl mx-auto relative z-10 leading-relaxed font-medium">
                                Styles here are isolated. Notice how the visual handles stay on top and never clip.
                            </p>
                        </div>

                        <!-- Grid -->
                        <div class="grid grid-cols-3 gap-8">
                            <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h3 class="text-xl font-bold mb-2">Isolated Styling</h3>
                                <p class="text-slate-500 text-sm">Main app CSS doesn't leak into this window.</p>
                            </div>
                            <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h3 class="text-xl font-bold mb-2">Clean Export</h3>
                                <p class="text-slate-500 text-sm">The DOM here represents perfectly the final output.</p>
                            </div>
                            <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h3 class="text-xl font-bold mb-2">Professional</h3>
                                <p class="text-slate-500 text-sm">Industry standard technique for visual builders.</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `);
        doc.close();

        // Relay Events from Iframe to Main Window
        const handleIframeClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.id === 'canvas-body') {
                setSelectedElement(null);
                return;
            }
            setSelectedElement(target);
        };

        const handleIframeMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.id === 'canvas-body') {
                setHoveredElement(null);
                return;
            }
            setHoveredElement(target);
        };

        doc.addEventListener('click', handleIframeClick);
        doc.addEventListener('mousemove', handleIframeMouseMove);
        
        return () => {
            doc.removeEventListener('click', handleIframeClick);
            doc.removeEventListener('mousemove', handleIframeMouseMove);
        };
    }, []);

    // Selection Logic for Parent
    const selectParent = useCallback(() => {
        if (selectedElement && selectedElement.parentElement && selectedElement.parentElement.id !== 'canvas-body') {
            setSelectedElement(selectedElement.parentElement);
        }
    }, [selectedElement]);

    // Update selection metrics
    const updateMetrics = useCallback(() => {
        if (!selectedElement || !iframeRef.current) {
            setMetrics(null);
            return;
        }

        const rect = selectedElement.getBoundingClientRect();
        const iframeRect = iframeRef.current.getBoundingClientRect();
        const style = iframeRef.current.contentWindow?.getComputedStyle(selectedElement);
        if (!style) return;

        setMetrics({
            top: rect.top + iframeRect.top,
            left: rect.left + iframeRect.left,
            width: rect.width,
            height: rect.height,
            padding: {
                top: parseFloat(style.paddingTop),
                right: parseFloat(style.paddingRight),
                bottom: parseFloat(style.paddingBottom),
                left: parseFloat(style.paddingLeft),
            },
            margin: {
                top: parseFloat(style.marginTop),
                right: parseFloat(style.marginRight),
                bottom: parseFloat(style.marginBottom),
                left: parseFloat(style.marginLeft),
            }
        });
    }, [selectedElement]);

    // Drag Logic
    useEffect(() => {
        if (!isDragging || !selectedElement) return;

        const handleMouseMove = (e: MouseEvent) => {
            const delta = isDragging.side === 'top' || isDragging.side === 'left' 
                ? isDragging.startPos - (isDragging.side === 'top' ? e.clientY : e.clientX)
                : (isDragging.side === 'bottom' ? e.clientY : e.clientX) - isDragging.startPos;
            
            const newVal = Math.max(0, isDragging.startVal + delta);
            const property = `${isDragging.type}${isDragging.side.charAt(0).toUpperCase() + isDragging.side.slice(1)}`;
            
            selectedElement.style[property as any] = `${newVal}px`;
            updateMetrics();
        };

        const handleMouseUp = () => {
            setIsDragging(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, selectedElement, updateMetrics]);

    const startDrag = (e: React.MouseEvent, type: 'padding' | 'margin', side: string) => {
        if (!metrics) return;
        e.preventDefault(); e.stopPropagation();
        
        const startVal = type === 'padding' ? (metrics.padding as any)[side] : (metrics.margin as any)[side];
        const startPos = side === 'top' || side === 'bottom' ? e.clientY : e.clientX;
        
        setIsDragging({ side, type, startVal, startPos });
    };

    // Update hover metrics
    const updateHoverMetrics = useCallback(() => {
        if (!hoveredElement || hoveredElement === selectedElement || !iframeRef.current) {
            setHoverMetrics(null);
            return;
        }

        const rect = hoveredElement.getBoundingClientRect();
        const iframeRect = iframeRef.current.getBoundingClientRect();

        setHoverMetrics({
            top: rect.top + iframeRect.top,
            left: rect.left + iframeRect.left,
            width: rect.width,
            height: rect.height,
        });
    }, [hoveredElement, selectedElement]);

    useEffect(() => {
        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        window.addEventListener('scroll', updateMetrics, true);
        
        // Listen to iframe internal events too
        const win = iframeRef.current?.contentWindow;
        win?.addEventListener('scroll', updateMetrics, true);

        return () => {
            window.removeEventListener('resize', updateMetrics);
            window.removeEventListener('scroll', updateMetrics, true);
            win?.removeEventListener('scroll', updateMetrics, true);
        };
    }, [selectedElement, updateMetrics]);

    useEffect(() => {
        updateHoverMetrics();
    }, [hoveredElement, updateHoverMetrics]);

    return (
        <div className="flex-1 bg-slate-200/50 overflow-hidden relative flex flex-col">
            {/* The Sandboxed Iframe */}
            <iframe 
                ref={iframeRef}
                className="w-full h-full border-none bg-white"
                title="Editor Canvas"
            />

            {/* Selection Visualizer (Fixed on top of EVERYTHING) */}
            <div className={`fixed inset-0 pointer-events-none z-[100] ${isDragging ? 'cursor-grabbing' : ''}`}>
               
                {/* Hover Highlighter */}
                {hoverMetrics && (
                    <div 
                        className="absolute border border-indigo-400/50 bg-indigo-500/5 transition-all duration-150 rounded-sm"
                        style={{
                            top: hoverMetrics.top,
                            left: hoverMetrics.left,
                            width: hoverMetrics.width,
                            height: hoverMetrics.height,
                        }}
                    />
                )}

                {/* Selection Details */}
                {metrics && (
                    <div 
                        className="absolute transition-[top,left,width,height] duration-200"
                        style={{
                            top: metrics.top,
                            left: metrics.left,
                            width: metrics.width,
                            height: metrics.height,
                        }}
                    >
                        {/* Border */}
                        <div className="absolute -inset-[1px] border-[1.5px] border-indigo-500 pointer-events-none rounded-[1px] shadow-[0_0_10px_rgba(99,102,241,0.2)]" />

                        {/* Actions Toolbar */}
                        <div className="absolute -top-8 right-0 flex items-center gap-px bg-indigo-500 p-0.5 rounded-t-md pointer-events-auto">
                            <button onClick={(e) => { e.stopPropagation(); selectParent(); }} className="p-1 hover:bg-white/20 text-white rounded transition-colors"><ArrowUp size={12}/></button>
                            <button className="p-1 hover:bg-white/20 text-white rounded transition-colors"><Move size={12}/></button>
                            <button className="p-1 hover:bg-white/20 text-white rounded transition-colors"><Copy size={12}/></button>
                            <button className="p-1 bg-rose-500 hover:bg-rose-600 text-white rounded transition-colors ml-1"><Trash2 size={12}/></button>
                        </div>

                        {/* Label */}
                        <div className="absolute -top-8 left-0 px-2 py-1 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-tighter rounded-t-md">
                            {selectedElement?.tagName.toLowerCase()}
                        </div>

                        {/* PADDING HIGHLIGHTS */}
                        <div className="absolute top-0 inset-x-0 bg-emerald-400/20 border-b border-emerald-400/10" style={{ height: metrics.padding.top }} />
                        <div className="absolute bottom-0 inset-x-0 bg-emerald-400/20 border-t border-emerald-400/10" style={{ height: metrics.padding.bottom }} />
                        <div className="absolute left-0 inset-y-0 bg-emerald-400/20 border-r border-emerald-400/10" style={{ width: metrics.padding.left }} />
                        <div className="absolute right-0 inset-y-0 bg-emerald-400/20 border-l border-emerald-400/10" style={{ width: metrics.padding.right }} />

                        {/* MARGIN HIGHLIGHTS */}
                        <div className="absolute inset-x-0 bg-orange-400/20 border-b border-orange-400/10" style={{ height: metrics.margin.top, top: -metrics.margin.top }} />
                        <div className="absolute inset-x-0 bg-orange-400/20 border-t border-orange-400/10" style={{ height: metrics.margin.bottom, bottom: -metrics.margin.bottom }} />
                        <div className="absolute inset-y-0 bg-orange-400/20 border-r border-orange-400/10" style={{ width: metrics.margin.left, left: -metrics.margin.left }} />
                        <div className="absolute inset-y-0 bg-orange-400/20 border-l border-orange-400/10" style={{ width: metrics.margin.right, right: -metrics.margin.right }} />

                        {/* ADJUSTMENT HANDS */}
                        {/* Padding */}
                        <div onMouseDown={(e) => startDrag(e, 'padding', 'top')} className="absolute left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-500 rounded-full cursor-ns-resize pointer-events-auto hover:scale-x-125 transition-transform flex items-center justify-center group" style={{ top: Math.max(0, metrics.padding.top - 2) }}>
                            <span className="absolute -top-4 bg-emerald-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.padding.top}px</span>
                        </div>
                        <div onMouseDown={(e) => startDrag(e, 'padding', 'bottom')} className="absolute left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-500 rounded-full cursor-ns-resize pointer-events-auto hover:scale-x-125 transition-transform flex items-center justify-center group" style={{ bottom: Math.max(0, metrics.padding.bottom - 2) }}>
                            <span className="absolute -bottom-4 bg-emerald-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.padding.bottom}px</span>
                        </div>
                        <div onMouseDown={(e) => startDrag(e, 'padding', 'left')} className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-full cursor-ew-resize pointer-events-auto hover:scale-y-125 transition-transform flex items-center justify-center group" style={{ left: Math.max(0, metrics.padding.left - 2) }}>
                            <span className="absolute -left-10 bg-emerald-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.padding.left}px</span>
                        </div>
                        <div onMouseDown={(e) => startDrag(e, 'padding', 'right')} className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-full cursor-ew-resize pointer-events-auto hover:scale-y-125 transition-transform flex items-center justify-center group" style={{ right: Math.max(0, metrics.padding.right - 2) }}>
                            <span className="absolute -right-10 bg-emerald-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.padding.right}px</span>
                        </div>

                        {/* Margin */}
                        <div onMouseDown={(e) => startDrag(e, 'margin', 'top')} className="absolute left-1/2 -translate-x-1/2 w-10 h-1 bg-orange-500/80 rounded-full cursor-ns-resize pointer-events-auto hover:scale-x-125 transition-transform flex items-center justify-center group" style={{ top: -metrics.margin.top / 2 - 2, opacity: metrics.margin.top > 0 ? 1 : 0.2 }}>
                             <span className="absolute -top-4 bg-orange-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.margin.top}px</span>
                        </div>
                        <div onMouseDown={(e) => startDrag(e, 'margin', 'bottom')} className="absolute left-1/2 -translate-x-1/2 w-10 h-1 bg-orange-500/80 rounded-full cursor-ns-resize pointer-events-auto hover:scale-x-125 transition-transform flex items-center justify-center group" style={{ bottom: -metrics.margin.bottom / 2 - 2, opacity: metrics.margin.bottom > 0 ? 1 : 0.2 }}>
                             <span className="absolute -bottom-4 bg-orange-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.margin.bottom}px</span>
                        </div>
                        <div onMouseDown={(e) => startDrag(e, 'margin', 'left')} className="absolute top-1/2 -translate-y-1/2 w-1 h-10 bg-orange-500/80 rounded-full cursor-ew-resize pointer-events-auto hover:scale-y-125 transition-transform flex items-center justify-center group" style={{ left: -metrics.margin.left / 2 - 2, opacity: metrics.margin.left > 0 ? 1 : 0.2 }}>
                            <span className="absolute -left-10 bg-orange-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.margin.left}px</span>
                        </div>
                        <div onMouseDown={(e) => startDrag(e, 'margin', 'right')} className="absolute top-1/2 -translate-y-1/2 w-1 h-10 bg-orange-500/80 rounded-full cursor-ew-resize pointer-events-auto hover:scale-y-125 transition-transform flex items-center justify-center group" style={{ right: -metrics.margin.right / 2 - 2, opacity: metrics.margin.right > 0 ? 1 : 0.2 }}>
                            <span className="absolute -right-10 bg-orange-600 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100">{metrics.margin.right}px</span>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default TemplateEditorCanvas;