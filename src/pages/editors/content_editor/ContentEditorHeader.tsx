import { ArrowLeft, Trash2, Info, Maximize2, Check, Globe } from "lucide-react";
import { LuRedo, LuUndo } from 'react-icons/lu';

type HeaderProps = {
    title: string;
    onBack?: () => void;
    undoStatus?: { canUndo: boolean; canRedo: boolean };
    onUndo?: () => void;
    onRedo?: () => void;
};

const ContentEditorHeader: React.FC<HeaderProps> = ({ title, onBack, undoStatus, onUndo, onRedo }) => {
    return (
        <div className="w-full flex items-center justify-between border-b bg-white/80 backdrop-blur-md px-4 py-2 sticky top-0 z-50">

            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-all active:scale-95 group"
                >
                    <ArrowLeft size={18} className="text-slate-500 group-hover:text-indigo-600" />
                </button>
                <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Editing Post</span>
                    <h1 className="text-sm font-extrabold text-slate-900 tracking-tight line-clamp-1 max-w-[400px]">
                        {title}
                    </h1>
                </div>


            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

                <div className="flex items-center gap-1 mr-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Draft Saved</span>
                </div>

                {/* Undo/Redo in Header */}
                <div className="flex items-center gap-1 ml-4 py-0.5 px-1 bg-slate-50 border border-slate-100 rounded-xl">
                    <button
                        onClick={onUndo}
                        disabled={!undoStatus?.canUndo}
                        className={`p-1.5 rounded-lg transition-all ${undoStatus?.canUndo ? "text-slate-600 hover:bg-white hover:shadow-sm" : "text-slate-300 cursor-not-allowed"}`}
                        title="Undo (Ctrl+Z)"
                    >
                        <LuUndo size={16} />
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!undoStatus?.canRedo}
                        className={`p-1.5 rounded-lg transition-all ${undoStatus?.canRedo ? "text-slate-600 hover:bg-white hover:shadow-sm" : "text-slate-300 cursor-not-allowed"}`}
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <LuRedo size={16} />
                    </button>
                </div>



                <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                        <Maximize2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                        <Info size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-2 pl-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                        <Globe size={16} />
                        Preview
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/25 transition-all active:scale-[0.98]">
                        <Check size={16} />
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentEditorHeader;