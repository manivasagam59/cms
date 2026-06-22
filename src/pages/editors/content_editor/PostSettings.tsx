import { useState } from "react"
import {
    Calendar,
    Tag,
    Image,
    Globe,
    User,
    Eye
} from "lucide-react"

export default function PostSettings() {

    const [status, setStatus] = useState("draft")
    const [slug, setSlug] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")

    const addTag = () => {
        if (!tagInput.trim()) return
        setTags([...tags, tagInput])
        setTagInput("")
    }

    return (
        <div className="w-72 border-l bg-[#FDFEFF] h-full flex flex-col overflow-hidden shadow-2xl shadow-slate-200">

            {/* Header */}
            <div className="p-3 px-4 border-b bg-white flex items-center justify-between">
                <div>
                    <h2 className="font-extrabold text-[10px] text-slate-900 uppercase tracking-widest leading-none">Settings</h2>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5 leading-none">POST CONFIG</p>
                </div>
                <div className="p-1 bg-slate-50 rounded-md border border-slate-100">
                    <Globe size={12} className="text-slate-400" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">

                {/* Status */}
                <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 block">Status</label>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setStatus("draft")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${status === "draft"
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/25"
                                : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                                }`}
                        >
                            Draft
                        </button>

                        <button
                            onClick={() => setStatus("published")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${status === "published"
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                                : "bg-indigo-50/50 text-indigo-600 border border-indigo-100 hover:bg-indigo-50"
                                }`}
                        >
                            Published
                        </button>
                    </div>
                </div>

                {/* Publish Date */}
                <div>
                    <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar size={10} className="text-slate-400" />
                        Publish Date
                    </label>

                    <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Globe size={10} className="text-slate-400" />
                        Slug
                    </label>

                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="slug..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User size={10} className="text-slate-400" />
                        Author
                    </label>

                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none appearance-none">
                        <option>Admin User</option>
                        <option>Content Editor</option>
                    </select>
                </div>

                {/* Tags */}
                <div>
                    <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Tag size={10} className="text-slate-400" />
                        Tags
                    </label>

                    <div className="flex gap-1.5">
                        <input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                            placeholder="Add..."
                        />

                        <button
                            onClick={addTag}
                            className="px-3 bg-slate-900 text-white text-[10px] font-bold rounded-xl hover:bg-black transition-all active:scale-95"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Featured Image */}
                <div>
                    <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Image size={10} className="text-slate-400" />
                        Featured Image
                    </label>

                    <div className="p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer text-center group">
                        <Image size={16} className="mx-auto text-slate-300 group-hover:text-indigo-400 transition-colors mb-1" />
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Upload</p>
                    </div>
                </div>

                {/* Visibility */}
                <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Eye size={12} className="text-slate-400" />
                        Visibility
                    </label>

                    <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-700 focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none appearance-none">
                        <option>Public</option>
                        <option>Private</option>
                        <option>Members Only</option>
                    </select>
                </div>

                {/* SEO */}
                <div className="pt-4 border-t border-slate-100">
                    <label className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest mb-4 block">
                        SEO Optimisation
                    </label>

                    <input
                        placeholder="SEO Meta Title"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-700 focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none"
                    />

                    <textarea
                        placeholder="Meta Description..."
                        rows={3}
                        className="mt-3 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-700 focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all outline-none resize-none"
                    />
                </div>

            </div>
        </div>
    )
}