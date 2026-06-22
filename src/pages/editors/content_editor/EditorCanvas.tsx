import { useState, useRef, useEffect, useCallback } from "react";
import {
    Heading1, Heading2, Heading3, Type, Image as ImageIcon, Code, Quote, List,
    Plus, GripVertical, Bold, Italic, Underline, Strikethrough, Link,
    AlignLeft, AlignCenter, AlignRight, AlignJustify, ListOrdered,
    Highlighter, Palette, X, Settings2, ChevronDown, Move,
    CornerUpLeft, CornerUpRight, Eye, Lock, Unlock, Crop, Trash2,
    FlipHorizontal, FlipVertical, Maximize2, Minimize2,
    Sun, Contrast, Droplets, Sliders, Check, FileText,
    Minus, Hash, MoreHorizontal, Globe, Link2, Upload, Search
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface BlockData {
    id: string;
    type: string;
    content?: string;
    src?: string;
    alt?: string;
    caption?: string;
    items?: string[];
    align?: "left" | "center" | "right" | "full";
    width?: number;
    radius?: number;
    ratio?: string;
    brightness?: number;
    contrast?: number;
    saturate?: number;
    blur?: number;
    flipH?: boolean;
    flipV?: boolean;
    filterPreset?: string;
    opacity?: number;
    border?: "none" | "thin" | "medium" | "shadow" | "glow";
    [key: string]: any;
}

interface Extension {
    icon: any;
    title: string;
    action: (onFormat: (cmd: string, value?: string) => void) => void;
}


// ─── Utility ────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 8);

// ─── Image Settings Panel ───────────────────────────────────────────────────
interface ImageSettingsPanelProps {
    block: BlockData;
    onUpdate: (block: BlockData) => void;
    onClose: () => void;
}

function ImageSettingsPanel({ block, onUpdate, onClose }: ImageSettingsPanelProps) {
    const [tab, setTab] = useState("source");
    const tabs = ["source", "layout", "adjust", "style"];
    const fileInputRef = useRef<HTMLInputElement>(null);

    const update = (key: string, val: any) => onUpdate({ ...block, [key]: val });

    return (
        <div
            className="absolute top-10 right-0 z-50 w-80 rounded-2xl shadow-2xl border border-slate-200 bg-white overflow-hidden"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={e => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                    <Settings2 size={14} className="text-indigo-500" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Image Settings</span>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400"><X size={14} /></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100">
                {tabs.map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${tab === t ? "text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50/50" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                {tab === "source" && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Image URL</label>
                            <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                value={block.src || ""}
                                onChange={e => update("src", e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 outline-none focus:border-indigo-400 bg-slate-50"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-300"><span className="bg-white px-2">or</span></div>
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-xs font-bold text-slate-500 transition-all"
                        >
                            <Upload size={14} /> Upload New File
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => update("src", event.target?.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                )}
                {tab === "layout" && (
                    <>
                        {/* Alignment */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Alignment</label>
                            <div className="flex gap-1">
                                {["left", "center", "right", "full"].map(a => (
                                    <button
                                        key={a}
                                        onClick={() => update("align", a)}
                                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${(block.align || "full") === a ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                    >
                                        {a === "full" ? "Full" : a.charAt(0).toUpperCase() + a.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Width — {block.width || 100}%</label>
                            <input
                                type="range" min={20} max={100} step={5}
                                value={block.width || 100}
                                onChange={e => update("width", Number(e.target.value))}
                                className="w-full accent-indigo-600"
                            />
                        </div>

                        {/* Border Radius */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Border Radius — {block.radius || 12}px</label>
                            <input
                                type="range" min={0} max={32} step={2}
                                value={block.radius || 12}
                                onChange={e => update("radius", Number(e.target.value))}
                                className="w-full accent-indigo-600"
                            />
                        </div>

                        {/* Aspect Ratio */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Aspect Ratio</label>
                            <div className="grid grid-cols-3 gap-1">
                                {["16/9", "4/3", "1/1", "3/2", "21/9", "free"].map(r => (
                                    <button
                                        key={r}
                                        onClick={() => update("ratio", r)}
                                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${(block.ratio || "16/9") === r ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Caption */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Caption</label>
                            <input
                                type="text"
                                placeholder="Add a caption..."
                                value={block.caption || ""}
                                onChange={e => update("caption", e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 outline-none focus:border-indigo-400 bg-slate-50"
                            />
                        </div>

                        {/* Alt Text */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Alt Text</label>
                            <input
                                type="text"
                                placeholder="Describe the image..."
                                value={block.alt || ""}
                                onChange={e => update("alt", e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 outline-none focus:border-indigo-400 bg-slate-50"
                            />
                        </div>
                    </>
                )}

                {tab === "adjust" && (
                    <>
                        {[
                            { key: "brightness", label: "Brightness", icon: Sun, min: 50, max: 200, default: 100 },
                            { key: "contrast", label: "Contrast", icon: Contrast, min: 50, max: 200, default: 100 },
                            { key: "saturate", label: "Saturation", icon: Droplets, min: 0, max: 200, default: 100 },
                            { key: "blur", label: "Blur", icon: Sliders, min: 0, max: 10, default: 0 },
                        ].map(({ key, label, icon: Icon, min, max, default: def }) => (
                            <div key={key}>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                        <Icon size={11} />{label}
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-slate-400">{block[key] ?? def}</span>
                                        <button
                                            onClick={() => update(key, def)}
                                            className="text-[9px] text-indigo-500 hover:text-indigo-700 font-bold"
                                        >Reset</button>
                                    </div>
                                </div>
                                <input
                                    type="range" min={min} max={max}
                                    value={block[key] ?? def}
                                    onChange={e => update(key, Number(e.target.value))}
                                    className="w-full accent-indigo-600"
                                />
                            </div>
                        ))}

                        {/* Flip */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Transform</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => update("flipH", !block.flipH)}
                                    className={`flex-1 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all ${block.flipH ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                >
                                    <FlipHorizontal size={12} /> Flip H
                                </button>
                                <button
                                    onClick={() => update("flipV", !block.flipV)}
                                    className={`flex-1 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all ${block.flipV ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                >
                                    <FlipVertical size={12} /> Flip V
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {tab === "style" && (
                    <>
                        {/* Filter presets */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Filter Preset</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { name: "None", filter: "none" },
                                    { name: "Grayscale", filter: "grayscale(100%)" },
                                    { name: "Sepia", filter: "sepia(80%)" },
                                    { name: "Cool", filter: "hue-rotate(180deg) saturate(150%)" },
                                    { name: "Warm", filter: "sepia(30%) saturate(150%)" },
                                    { name: "Faded", filter: "opacity(70%) saturate(60%)" },
                                ].map(({ name, filter }) => (
                                    <button
                                        key={name}
                                        onClick={() => update("filterPreset", filter)}
                                        className={`py-2 rounded-xl text-[10px] font-bold transition-all ${(block.filterPreset || "none") === filter ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Border */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Border Style</label>
                            <div className="flex gap-1">
                                {["none", "thin", "medium", "shadow", "glow"].map(b => (
                                    <button
                                        key={b}
                                        onClick={() => update("border", b)}
                                        className={`flex-1 py-2 rounded-lg text-[9px] font-bold transition-all ${(block.border || "none") === b ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                    >
                                        {b.charAt(0).toUpperCase() + b.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Opacity */}
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Opacity — {block.opacity ?? 100}%</label>
                            <input
                                type="range" min={10} max={100}
                                value={block.opacity ?? 100}
                                onChange={e => update("opacity", Number(e.target.value))}
                                className="w-full accent-indigo-600"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Footer actions */}
            <div className="flex gap-2 p-3 border-t border-slate-100 bg-slate-50">
                <button
                    onClick={() => update("src", "")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-[10px] font-bold text-slate-600 transition-all"
                >
                    <Trash2 size={11} /> Remove
                </button>
                <button
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-[10px] font-bold text-white transition-all"
                >
                    <Check size={11} /> Apply
                </button>
            </div>
        </div>
    );
}

// ─── Floating Rich Text Toolbar ─────────────────────────────────────────────
interface FloatingToolbarProps {
    position: { top: number; left: number } | null;
    onFormat: (cmd: string, value?: string) => void;
    extensions?: any[];
}

function FloatingToolbar({ position, onFormat, extensions = [] }: FloatingToolbarProps) {
    if (!position) return null;

    const groups = [
        {
            id: "text-style",
            items: [
                { icon: Bold, cmd: "bold", title: "Bold" },
                { icon: Italic, cmd: "italic", title: "Italic" },
                { icon: Underline, cmd: "underline", title: "Underline" },
                { icon: Strikethrough, cmd: "strikeThrough", title: "Strikethrough" },
                { icon: Highlighter, cmd: "hiliteColor", value: "#fef08a", title: "Highlight" },
            ]
        },
        {
            id: "alignment",
            items: [
                { icon: AlignLeft, cmd: "justifyLeft", title: "Align Left" },
                { icon: AlignCenter, cmd: "justifyCenter", title: "Align Center" },
                { icon: AlignRight, cmd: "justifyRight", title: "Align Right" },
            ]
        },
        {
            id: "extras",
            items: [
                { icon: Link, cmd: "link", title: "Link" },
                { icon: Code, cmd: "code", title: "Inline Code" },
            ]
        },
    ];

    return (
        <div
            style={{
                position: "fixed",
                top: position.top - 54,
                left: position.left,
                transform: "translateX(-50%)",
                zIndex: 9999,
                pointerEvents: "all",
            }}
            className="flex items-center gap-1 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] px-2 py-1.5 border border-white/10 fade-in"
            onMouseDown={e => e.preventDefault()}
        >
            {/* Arrow */}
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/95 rotate-45 border-r border-b border-white/10" />

            {groups.map((group, gi) => (
                <div key={group.id} className={`flex items-center gap-0.5 ${gi < groups.length - 1 ? "border-r border-white/5 pr-1 mr-0.5" : ""}`}>
                    {group.items.map(({ icon: Icon, cmd, value, title }) => (
                        <button
                            key={cmd}
                            title={title}
                            onMouseDown={e => { e.preventDefault(); onFormat(cmd, value); }}
                            className="p-1.5 hover:bg-white/10 active:bg-indigo-600 rounded-xl transition-all text-slate-300 hover:text-white hover:scale-110 active:scale-95"
                        >
                            <Icon size={13} />
                        </button>
                    ))}
                </div>
            ))}

            {/* Color picker */}
            <div className="relative border-l border-white/5 pl-1.5 ml-0.5">
                <label title="Text Color" className="p-1.5 hover:bg-white/10 rounded-xl cursor-pointer flex items-center transition-all hover:scale-110 active:scale-95">
                    <Palette size={13} className="text-slate-300" />
                    <input
                        type="color"
                        className="absolute opacity-0 w-0 h-0"
                        onChange={e => onFormat("foreColor", e.target.value)}
                    />
                </label>
            </div>

            {/* Extensions slot */}
            {extensions.length > 0 && (
                <div className="flex items-center gap-0.5 border-l border-white/5 pl-1.5 ml-0.5">
                    {extensions.map((ext, i) => (
                        <button
                            key={i}
                            title={ext.title}
                            onMouseDown={e => { e.preventDefault(); ext.action(onFormat); }}
                            className="p-1.5 hover:bg-white/10 rounded-xl transition-all text-indigo-400 hover:text-indigo-300 hover:scale-110 active:scale-95"
                        >
                            <ext.icon size={13} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Add Block Menu ──────────────────────────────────────────────────────────
interface AddBlockMenuProps {
    onAdd: (type: string) => void;
    onClose: () => void;
}

function AddBlockMenu({ onAdd, onClose }: AddBlockMenuProps) {
    const blockTypes = [
        { type: "paragraph", label: "Paragraph", icon: Type, desc: "Plain text block" },
        { type: "heading1", label: "Heading 1", icon: Heading1, desc: "Large section title" },
        { type: "heading2", label: "Heading 2", icon: Heading2, desc: "Medium section title" },
        { type: "heading3", label: "Heading 3", icon: Heading3, desc: "Small section title" },
        { type: "quote", label: "Quote", icon: Quote, desc: "Blockquote callout" },
        { type: "code", label: "Code Block", icon: Code, desc: "Monospace code block" },
        { type: "bullet-list", label: "Bullet List", icon: List, desc: "Unordered list" },
        { type: "numbered-list", label: "Numbered List", icon: ListOrdered, desc: "Ordered list" },
        { type: "image", label: "Image", icon: ImageIcon, desc: "Embed an image" },
        { type: "divider", label: "Divider", icon: Minus, desc: "Horizontal rule" },
    ];

    return (
        <div className="absolute left-8 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 w-72 overflow-hidden" style={{ top: "100%", marginTop: 4 }}>
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Add Block</p>
            </div>
            <div className="p-2 grid grid-cols-1 gap-0.5 max-h-72 overflow-y-auto">
                {blockTypes.map(({ type, label, icon: Icon, desc }) => (
                    <button
                        key={type}
                        onClick={() => { onAdd(type); onClose(); }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 transition-all group text-left"
                    >
                        <div className="p-1.5 bg-slate-100 group-hover:bg-indigo-100 rounded-lg transition-colors">
                            <Icon size={14} className="text-slate-500 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">{label}</p>
                            <p className="text-[10px] text-slate-400">{desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Individual Block ────────────────────────────────────────────────────────
function ListItem({ content, onUpdate, onBlur, onKeyDown, placeholder }: { content: string, onUpdate: (html: string) => void, onBlur: () => void, onKeyDown: (e: React.KeyboardEvent) => void, placeholder: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const lastContent = useRef(content);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (ref.current && ((content !== lastContent.current && content !== ref.current.innerHTML) || isFirstLoad.current)) {
            ref.current.innerHTML = content || "";
            lastContent.current = content;
            isFirstLoad.current = false;
        }
    }, [content]);

    return (
        <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            className="flex-1 text-sm text-slate-600 font-medium outline-none leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300"
            data-placeholder={placeholder}
            onInput={e => {
                const html = e.currentTarget.innerHTML;
                lastContent.current = html;
                onUpdate(html);
            }}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    );
}

interface BlockProps {
    block: BlockData;
    isActive: boolean;
    onUpdate: (block: BlockData, transient?: boolean) => void;
    onDelete: (id: string) => void;
    onAddAfter: (id: string, type: string) => void;
    onSelect: () => void;
    onCommit?: () => void;
    index: number;
    draggedIdx: number | null;
    dragOverIdx: number | null;
    onDragStart: (idx: number) => void;
    onDragOver: (e: React.DragEvent, idx: number) => void;
    onDragEnd: () => void;
}

function Block({
    block,
    isActive,
    onUpdate,
    onDelete,
    onAddAfter,
    onSelect,
    onCommit,
    index,
    draggedIdx,
    dragOverIdx,
    onDragStart,
    onDragOver,
    onDragEnd
}: BlockProps) {
    const [showImageSettings, setShowImageSettings] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [isUrlMode, setIsUrlMode] = useState(false);
    const [tempUrl, setTempUrl] = useState("");
    const isDragging = draggedIdx === index;
    const isDragOver = dragOverIdx === index;
    const contentRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);
    const lastContent = useRef("");
    const isFirstLoad = useRef(true);

    // Sync contentEditable on external content change
    useEffect(() => {
        if (contentRef.current && block.type !== "image" && block.type !== "divider" &&
            !block.type.includes("list") && block.type !== "code") {
            const currentHTML = contentRef.current.innerHTML;
            if ((currentHTML !== block.content && block.content !== lastContent.current) || isFirstLoad.current) {
                contentRef.current.innerHTML = block.content || "";
                lastContent.current = block.content || "";
                isFirstLoad.current = false;
            }
        }
    }, [block.content, block.type]);

    const handleInput = () => {
        if (contentRef.current) {
            const html = contentRef.current.innerHTML;
            lastContent.current = html;
            onUpdate({ ...block, content: html }, true);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onUpdate({ ...block, src: event.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };



    const getImageStyle = () => {
        const filters = [];
        if (block.brightness !== undefined && block.brightness !== 100) filters.push(`brightness(${block.brightness}%)`);
        if (block.contrast !== undefined && block.contrast !== 100) filters.push(`contrast(${block.contrast}%)`);
        if (block.saturate !== undefined && block.saturate !== 100) filters.push(`saturate(${block.saturate}%)`);
        if (block.blur) filters.push(`blur(${block.blur}px)`);
        if (block.filterPreset && block.filterPreset !== "none") filters.push(block.filterPreset);

        const transforms = [];
        if (block.flipH) transforms.push("scaleX(-1)");
        if (block.flipV) transforms.push("scaleY(-1)");

        const borderMap = {
            thin: "1px solid #e2e8f0",
            medium: "2px solid #6366f1",
            shadow: "none",
            glow: "none",
        };
        const boxShadowMap = {
            shadow: "0 8px 32px rgba(0,0,0,0.18)",
            glow: "0 0 32px 8px rgba(99,102,241,0.25)",
        };

        return {
            filter: filters.join(" ") || "none",
            transform: transforms.join(" ") || "none",
            opacity: (block.opacity ?? 100) / 100,
            borderRadius: `${block.radius ?? 12}px`,
            border: block.border && block.border !== "none" ? (borderMap as any)[block.border] : "none",
            boxShadow: block.border && block.border !== "none" ? (boxShadowMap as any)[block.border] : "none",
        };
    };

    const getImageWrapStyle = () => {
        const alignMap: Record<string, string> = { left: "flex-start", center: "center", right: "flex-end", full: "stretch" };
        return {
            width: block.align === "full" || !block.align ? "100%" : `${block.width || 100}%`,
            alignSelf: alignMap[block.align || "full"] || "stretch",
        };
    };

    const renderBlock = () => {
        switch (block.type) {
            case "heading1":
                return (
                    <h1
                        ref={contentRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        onBlur={onCommit}
                        onClick={onSelect}
                        className="text-3xl font-extrabold text-slate-900 tracking-tight outline-none leading-tight empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300"
                        data-placeholder="Heading 1..."
                    />
                );
            case "heading2":
                return (
                    <h2
                        ref={contentRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        onBlur={onCommit}
                        onClick={onSelect}
                        className="text-xl font-extrabold text-slate-900 tracking-tight outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300"
                        data-placeholder="Heading 2..."
                    />
                );
            case "heading3":
                return (
                    <h3
                        ref={contentRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        onBlur={onCommit}
                        onClick={onSelect}
                        className="text-lg font-bold text-slate-800 tracking-tight outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300"
                        data-placeholder="Heading 3..."
                    />
                );
            case "quote":
                return (
                    <div className="bg-slate-50 border-l-4 border-indigo-500 px-5 py-4 rounded-xl rounded-tl-none">
                        <Quote size={18} className="text-indigo-400 mb-2" />
                        <div
                            ref={contentRef}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput}
                            onBlur={onCommit}
                            onClick={onSelect}
                            className="text-sm font-bold text-slate-700 italic leading-relaxed outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 empty:before:font-normal empty:before:not-italic"
                            data-placeholder="Add a quote..."
                        />
                    </div>
                );
            case "code":
                return (
                    <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-800">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <span className="ml-2 text-[10px] font-mono text-slate-500">code block</span>
                        </div>
                        <pre
                            ref={contentRef}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput}
                            onBlur={onCommit}
                            onClick={onSelect}
                            className="p-4 text-sm font-mono text-emerald-400 outline-none leading-relaxed whitespace-pre-wrap empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600"
                            data-placeholder="// Write your code here..."
                        />
                    </div>
                );
            case "bullet-list":
                return (
                    <div className="space-y-1">
                        {(block.items || [""]).map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="mt-2 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                                <ListItem
                                    content={item}
                                    placeholder="List item..."
                                    onUpdate={(html) => {
                                        const newItems = [...(block.items || [""])];
                                        newItems[i] = html;
                                        onUpdate({ ...block, items: newItems }, true);
                                    }}
                                    onBlur={onCommit || (() => { })}
                                    onKeyDown={(e: React.KeyboardEvent) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            const newItems = [...(block.items || [""]), ""];
                                            onUpdate({ ...block, items: newItems });
                                        }
                                        if (e.key === "Backspace" && !item && block.items && block.items.length > 1) {
                                            e.preventDefault();
                                            const newItems = block.items.filter((_: string, idx: number) => idx !== i);
                                            onUpdate({ ...block, items: newItems });
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                );
            case "numbered-list":
                return (
                    <div className="space-y-1">
                        {(block.items || [""]).map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="mt-0.5 text-xs font-bold text-indigo-500 w-5 text-right flex-shrink-0">{i + 1}.</span>
                                <ListItem
                                    content={item}
                                    placeholder="List item..."
                                    onUpdate={(html) => {
                                        const newItems = [...(block.items || [""])];
                                        newItems[i] = html;
                                        onUpdate({ ...block, items: newItems }, true);
                                    }}
                                    onBlur={onCommit || (() => { })}
                                    onKeyDown={(e: React.KeyboardEvent) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            const newItems = [...(block.items || [""]), ""];
                                            onUpdate({ ...block, items: newItems });
                                        }
                                        if (e.key === "Backspace" && !item && block.items && block.items.length > 1) {
                                            e.preventDefault();
                                            const newItems = block.items.filter((_: string, idx: number) => idx !== i);
                                            onUpdate({ ...block, items: newItems });
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                );
            case "image":
                return (
                    <div className="relative group/img" style={getImageWrapStyle()}>
                        {/* Image settings button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowImageSettings(v => !v); }}
                            className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 opacity-0 group-hover/img:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-300"
                        >
                            <Settings2 size={14} className="text-slate-600" />
                        </button>

                        {showImageSettings && (
                            <ImageSettingsPanel
                                block={block}
                                onUpdate={onUpdate}
                                onClose={() => setShowImageSettings(false)}
                            />
                        )}

                        {block.src ? (
                            <div>
                                <img
                                    src={block.src}
                                    alt={block.alt || ""}
                                    style={getImageStyle()}
                                    className="w-full object-cover"
                                />
                                {block.caption && (
                                    <p className="text-center text-xs text-slate-400 mt-2 italic">{block.caption}</p>
                                )}
                            </div>
                        ) : isUrlMode ? (
                            <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-200 aspect-video bg-indigo-50/20 flex flex-col items-center justify-center p-8 transition-all">
                                <Link2 size={24} className="text-indigo-400 mb-3" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Paste image URL here..."
                                    value={tempUrl}
                                    onChange={e => setTempUrl(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" && tempUrl) {
                                            onUpdate({ ...block, src: tempUrl });
                                            setIsUrlMode(false);
                                        }
                                        if (e.key === "Escape") setIsUrlMode(false);
                                    }}
                                    className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-indigo-100 shadow-sm text-sm outline-none focus:ring-2 ring-indigo-500/20 mb-4"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsUrlMode(false)}
                                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (tempUrl) {
                                                onUpdate({ ...block, src: tempUrl });
                                                setIsUrlMode(false);
                                            }
                                        }}
                                        className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Embed Image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-indigo-400 transition-all aspect-video bg-slate-50 flex flex-col items-center justify-center group/upload">
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-md hover:scale-105 transition-all active:scale-95 group/btn"
                                    >
                                        <Upload size={20} className="text-indigo-500 group-hover/btn:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Upload File</span>
                                    </button>
                                    <button
                                        onClick={() => setIsUrlMode(true)}
                                        className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-md hover:scale-105 transition-all active:scale-95 group/btn"
                                    >
                                        <Globe size={20} className="text-indigo-500 group-hover/btn:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Embed URL</span>
                                    </button>
                                </div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Select an option to add image</p>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </div>
                        )}
                    </div>
                );
            case "divider":
                return (
                    <div className="flex items-center gap-4 py-6 cursor-default">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>
                );
            default: // paragraph
                return (
                    <div
                        ref={contentRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        onBlur={onCommit}
                        onClick={onSelect}
                        className="text-sm text-slate-600 leading-relaxed font-medium outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300"
                        data-placeholder="Start writing..."
                    />
                );
        }
    };

    return (
        <div
            ref={blockRef}
            data-active-block={block.id}
            className={`group relative transition-all duration-300 ${isDragging ? "opacity-20 scale-95" : ""} ${isActive ? "z-10" : "z-0 hover:z-20"} ${isDragOver && !isDragging ? "border-t-2 border-indigo-500 pt-2" : ""}`}
            onMouseLeave={() => setShowAddMenu(false)}
            onDragOver={(e) => onDragOver(e, index)}
        >
            {/* Hover expansion hit-area - expands left to cover the gap to controls and adds vertical buffer */}
            <div className="absolute -left-20 -top-10 -bottom-10 w-24 pointer-events-auto" />

            {/* Block highlight indicator - removed z-index to stay in normal stacking within z-10 block */}
            {isActive && (
                <div className="absolute -inset-x-6 -inset-y-3 bg-indigo-50/15 border border-indigo-100/20 rounded-2xl -z-10 fade-in shadow-sm shadow-indigo-100/30" />
            )}

            {/* Block side controls */}
            <div className={`absolute -left-12 top-0 bottom-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ${showAddMenu ? "z-50" : "z-20"}`}>
                <div className="relative">
                    <button
                        onClick={() => setShowAddMenu(v => !v)}
                        className="p-2 hover:bg-white hover:shadow-md hover:scale-110 active:scale-95 rounded-xl text-slate-300 hover:text-indigo-600 border border-transparent hover:border-slate-100 transition-all group/plus"
                    >
                        <Plus size={14} strokeWidth={3} className="group-hover/plus:rotate-90 transition-transform duration-300" />
                    </button>
                    {showAddMenu && (
                        <AddBlockMenu onAdd={(type) => onAddAfter(block.id, type)} onClose={() => setShowAddMenu(false)} />
                    )}
                </div>
                <button
                    draggable
                    onDragStart={() => onDragStart(index)}
                    onDragEnd={onDragEnd}
                    className="p-2 hover:bg-white hover:shadow-md hover:scale-110 active:scale-95 rounded-xl cursor-grab text-slate-300 hover:text-slate-600 border border-transparent hover:border-slate-100 transition-all active:cursor-grabbing"
                >
                    <GripVertical size={14} />
                </button>
                <button
                    onClick={() => onDelete(block.id)}
                    className="p-2 hover:bg-white hover:shadow-md hover:scale-110 active:scale-95 rounded-xl text-slate-300 hover:text-red-500 border border-transparent hover:border-slate-100 transition-all"
                >
                    <Trash2 size={13} />
                </button>
            </div>

            {/* Block Content */}
            <div>{renderBlock()}</div>
        </div>
    );
}

// ─── Main Editor Canvas ──────────────────────────────────────────────────────
interface EditorCanvasProps {
    extensions?: Extension[];
    blocks: BlockData[];
    title: string;
    onUpdate: (newState: { blocks: BlockData[]; title: string }, transient?: boolean) => void;
    onCommit: () => void;
    undo: () => void;
    redo: () => void;
    activeBlockId: string | null;
    onSetActiveBlock: (id: string | null) => void;
}

export default function EditorCanvas({
    extensions = [],
    blocks,
    title,
    onUpdate,
    onCommit,
    undo,
    redo,
    activeBlockId,
    onSetActiveBlock
}: EditorCanvasProps) {
    const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);
    const [wordCount, setWordCount] = useState(0);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    // Scroll to block when activeBlockId changes from outside (e.g. Sidebar)
    useEffect(() => {
        if (activeBlockId) {
            const el = document.querySelector(`[data-active-block='${activeBlockId}']`);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [activeBlockId]);

    // Keyboard Shortcuts for Undo/Redo
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey)) {
                if (e.key === "z") {
                    e.preventDefault();
                    if (e.shiftKey) redo();
                    else undo();
                } else if (e.key === "y") {
                    e.preventDefault();
                    redo();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [undo, redo]);

    // Detect text selection → show floating toolbar
    useEffect(() => {
        const handleSelectionChange = () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed || !sel.toString().trim()) {
                setToolbarPos(null);
                return;
            }

            // Only show toolbar if selection is inside our editor
            const range = sel.getRangeAt(0);
            if (!editorRef.current?.contains(range.commonAncestorContainer)) {
                setToolbarPos(null);
                return;
            }

            const rect = range.getBoundingClientRect();
            setToolbarPos({
                top: rect.top,
                left: rect.left + rect.width / 2,
            });
        };

        document.addEventListener("selectionchange", handleSelectionChange);
        return () => document.removeEventListener("selectionchange", handleSelectionChange);
    }, []);

    // Word count
    useEffect(() => {
        const text = blocks.map(b => {
            if (b.type === "bullet-list" || b.type === "numbered-list") return (b.items || []).join(" ");
            return b.content || "";
        }).join(" ").replace(/<[^>]+>/g, " ");
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(words);
    }, [blocks]);

    const updateBlock = (updated: BlockData, transient = false) => {
        const nextBlocks = blocks.map(b => b.id === updated.id ? updated : b);
        onUpdate({ blocks: nextBlocks, title }, transient);
    };

    const handleFormat = useCallback((cmd: string, value: any) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

        const range = selection.getRangeAt(0);

        // Ensure the selection is within our editor
        if (!editorRef.current?.contains(range.commonAncestorContainer)) return;

        if (cmd === "code") {
            const code = document.createElement("code");
            code.style.background = "#f1f5f9";
            code.style.padding = "2px 6px";
            code.style.borderRadius = "4px";
            code.style.fontFamily = "monospace";
            code.style.fontSize = "0.9em";
            code.textContent = selection.toString() || "code";

            range.deleteContents();
            range.insertNode(code);
            selection.removeAllRanges();
        } else if (cmd === "link") {
            // Check if we are already inside a link to "Unlink"
            const anchor = range.commonAncestorContainer.nodeType === 1 ? (range.commonAncestorContainer as Element).closest("a") : range.commonAncestorContainer.parentElement?.closest("a");

            if (anchor) {
                // If already a link, "Unlink" it by replacing the anchor with its children
                const fragment = document.createDocumentFragment();
                while (anchor.firstChild) {
                    fragment.appendChild(anchor.firstChild);
                }
                anchor.parentNode?.replaceChild(fragment, anchor);
                selection.removeAllRanges();
            } else {
                const url = prompt("Enter URL:");
                if (url) {
                    const a = document.createElement("a");
                    a.href = url;
                    a.style.color = "#6366f1";
                    a.style.textDecoration = "underline";
                    a.target = "_blank";
                    // Use extractContents to preserve formatting inside the link (e.g. bold text)
                    a.appendChild(range.extractContents());
                    range.insertNode(a);
                    selection.removeAllRanges();
                }
            }
        } else if (cmd === "hiliteColor") {
            const span = document.createElement("span");
            span.style.backgroundColor = value;
            span.appendChild(range.extractContents());
            range.insertNode(span);
            selection.removeAllRanges();
        } else if (cmd === "foreColor") {
            const span = document.createElement("span");
            span.style.color = value;
            span.appendChild(range.extractContents());
            range.insertNode(span);
            selection.removeAllRanges();
        } else {
            // For simple commands like bold, italic, underline, we can still use execCommand 
            // as there's no trivial one-line replacement for correctly nesting/unnesting tags,
            // but for the ones the user specifically mentioned we should use modern APIs.
            // If they want a full-blown custom engine, that would be much larger.
            // But let's fix the specific one mentioned.
            document.execCommand(cmd, false, value);
        }

        // Trigger an update for the active block after formatting
        if (activeBlockId) {
            const b = blocks.find(x => x.id === activeBlockId);
            if (b) {
                // Find all contentEditable elements inside active block and update state
                // This is needed because Range operations bypass React's state
                const el = document.querySelector(`[data-active-block='${activeBlockId}'] [contenteditable]`);
                if (el) {
                    updateBlock({ ...b, content: (el as HTMLElement).innerHTML }, true);
                }
            }
        }
    }, [blocks, activeBlockId, updateBlock]);

    const deleteBlock = (id: string) => {
        const nextBlocks = blocks.filter(b => b.id !== id);
        onUpdate({ blocks: nextBlocks, title });
    };

    const addBlockAfter = (afterId: string, type: string) => {
        const newBlock: BlockData = { id: uid(), type, content: "", items: type.includes("list") ? [""] : undefined };
        const idx = blocks.findIndex(b => b.id === afterId);
        const nextBlocks = [...blocks];
        nextBlocks.splice(idx + 1, 0, newBlock);

        onUpdate({ blocks: nextBlocks, title });
        setTimeout(() => onSetActiveBlock(newBlock.id), 50);
    };

    const handleTitleChange = (newTitle: string) => {
        onUpdate({ blocks, title: newTitle }, true);
    };

    const handleDragStart = (idx: number) => {
        setDraggedIdx(idx);
    };

    const handleDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === idx) return;
        setDragOverIdx(idx);
    };

    const handleDragEnd = () => {
        if (draggedIdx !== null && dragOverIdx !== null && draggedIdx !== dragOverIdx) {
            const nextBlocks = [...blocks];
            const [moved] = nextBlocks.splice(draggedIdx, 1);
            nextBlocks.splice(dragOverIdx, 0, moved);
            onUpdate({ blocks: nextBlocks, title });
        }
        setDraggedIdx(null);
        setDragOverIdx(null);
    };

    const readingTime = Math.max(1, Math.round(wordCount / 200));

    return (
        <>
            {/* Font imports */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .editor-root { font-family: 'DM Sans', sans-serif; }
        .editor-title { font-family: 'Fraunces', serif; }

        [contenteditable]:empty:before { pointer-events: none; display: block; }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .entry-animation { animation: fadeUp 0.5s ease both; }

        @keyframes fadeIn { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
        .fade-in { animation: fadeIn 0.25s ease both; }
      `}</style>

            <div className="editor-root flex-1 bg-slate-100 overflow-y-auto custom-scrollbar p-4" ref={editorRef}>

                {/* Floating Toolbar */}
                <FloatingToolbar
                    position={toolbarPos}
                    onFormat={handleFormat}
                    extensions={extensions}
                />

                {/* Page */}
                <div className="">
                    <div className="bg-white border border-slate-200 px-12 py-14 relative overflow-hidden entry-animation">

                        {/* BG decorations */}
                        {/* <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/60 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-50/40 blur-[140px] rounded-full -ml-48 -mb-48 pointer-events-none" /> */}

                        <div className="relative space-y-8">

                            {/* Title */}
                            <div className="space-y-4">
                                <textarea
                                    className="editor-title w-full text-[2.6rem] font-black text-slate-900 tracking-tight placeholder:text-slate-200 outline-none resize-none leading-[1.15] border-none bg-transparent"
                                    placeholder="Post Title..."
                                    rows={3}
                                    value={title}
                                    onChange={e => handleTitleChange(e.target.value)}
                                    onBlur={onCommit}
                                />
                                <div className="flex items-center gap-3 text-slate-400 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[9px] text-white font-black">A</div>
                                        <span className="text-[11px] font-bold text-slate-500">Admin User</span>
                                    </div>
                                    <span className="w-px h-3 bg-slate-200" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">March 10, 2026</span>
                                    <span className="w-px h-3 bg-slate-200" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">{readingTime} min read</span>
                                    <span className="w-px h-3 bg-slate-200" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{wordCount} words</span>
                                </div>
                            </div>

                            {/* Blocks */}
                            <div className="space-y-6 pb-20">
                                {blocks.map((block, idx) => (
                                    <Block
                                        key={block.id}
                                        index={idx}
                                        block={block}
                                        isActive={activeBlockId === block.id}
                                        draggedIdx={draggedIdx}
                                        dragOverIdx={dragOverIdx}
                                        onDragStart={handleDragStart}
                                        onDragOver={handleDragOver}
                                        onDragEnd={handleDragEnd}
                                        onSelect={() => onSetActiveBlock(block.id)}
                                        onUpdate={updateBlock}
                                        onDelete={deleteBlock}
                                        onCommit={onCommit}
                                        onAddAfter={addBlockAfter}
                                    />
                                ))}

                                {/* Add block at end */}
                                <div className="relative group/add pt-4">
                                    <button
                                        onClick={() => addBlockAfter(blocks[blocks.length - 1]?.id, "paragraph")}
                                        className="flex items-center gap-2 text-slate-300 hover:text-indigo-500 transition-all text-xs font-bold group"
                                    >
                                        <div className="p-1.5 rounded-lg border-2 border-dashed border-slate-200 group-hover:border-indigo-400 group-hover:bg-indigo-50 transition-all">
                                            <Plus size={12} />
                                        </div>
                                        Add a block
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-slate-900/95 backdrop-blur-2xl text-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 flex items-center p-1.5 overflow-hidden">

                        {/* Left: Block type switches (contextual) */}
                        <div className="flex items-center gap-1 px-2 border-r border-white/5 mr-1">
                            {[
                                { icon: Heading1, type: "heading1", label: "H1" },
                                { icon: Heading2, type: "heading2", label: "H2" },
                                { icon: Type, type: "paragraph", label: "Text" },
                            ].map(({ icon: Icon, type, label }) => {
                                const b = activeBlockId ? blocks.find(x => x.id === activeBlockId) : null;
                                const active = b?.type === type;
                                return (
                                    <button
                                        key={type}
                                        title={label}
                                        onClick={() => {
                                            if (b) updateBlock({ ...b, type });
                                        }}
                                        className={`p-2.5 rounded-2xl transition-all duration-300 relative group/btn ${active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}
                                    >
                                        <Icon size={16} className={active ? "scale-110" : "group-hover/btn:scale-110"} />
                                    </button>
                                );
                            })}
                        </div>



                        {/* Middle: Insert new blocks */}
                        <div className="flex items-center gap-1 px-2 border-r border-white/5 mr-1">
                            {[
                                { icon: ImageIcon, type: "image", label: "Image" },
                                { icon: Code, type: "code", label: "Code" },
                                { icon: Quote, type: "quote", label: "Quote" },
                                { icon: List, type: "bullet-list", label: "List" },
                                { icon: Minus, type: "divider", label: "Divider" },
                            ].map(({ icon: Icon, type, label }) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        const lastBlock = blocks[blocks.length - 1];
                                        const id = activeBlockId || lastBlock?.id;
                                        if (id) addBlockAfter(id, type);
                                    }}
                                    className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all group/btn"
                                    title={`Insert ${label}`}
                                >
                                    <Icon size={16} className="group-hover/btn:scale-110 group-hover/btn:rotate-3 transition-transform" />
                                </button>
                            ))}
                        </div>

                        {/* Right: Primary Add Block CTA */}
                        <button
                            onClick={() => {
                                const lastBlock = blocks[blocks.length - 1];
                                const id = activeBlockId || lastBlock?.id;
                                if (id) addBlockAfter(id, "paragraph");
                            }}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black uppercase tracking-widest transition-all rounded-[22px] ml-1 shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 group"
                        >
                            <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                                <Plus size={12} strokeWidth={3} />
                            </div>
                            Block
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}