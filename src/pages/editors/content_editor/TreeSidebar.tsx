import { ChevronRight } from "lucide-react"
import { useState } from "react"

export type TreeNode = {
    id: string
    label: string
    type: string
    children?: TreeNode[]
}

import {
    Image as ImageIcon,
    Calendar,
    FileText,
    Box,
    Hash,
    Link,
    File,
    ListTree,
    Heading1,
    Heading2,
    Heading3,
    Type,
    Quote,
    Code,
    List,
    ListOrdered,
    Minus
} from "lucide-react"

export const iconMap: Record<string, any> = {
    image: ImageIcon,
    heading1: Heading1,
    heading2: Heading2,
    heading3: Heading3,
    paragraph: Type,
    quote: Quote,
    code: Code,
    "bullet-list": List,
    "numbered-list": ListOrdered,
    divider: Minus,
    date: Calendar,
    editor: FileText,
    block: Box,
    number: Hash,
    link: Link,
    file: File,
    group: ListTree
}



type Props = {
    node: any
    level?: number
    onSelect: (node: any) => void
    selectedId?: string
}


function TreeNode({
    node,
    level = 0,
    onSelect,
    selectedId
}: Props) {
    const [open, setOpen] = useState(true)

    const Icon = iconMap[node.type] || iconMap.group
    const isSelected = selectedId === node.id

    return (
        <div className="mb-0.5">
            <div
                className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg transition-all duration-200 group
        ${isSelected
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                    }`}
                style={{ paddingLeft: level * 12 + 6 }}
                onClick={() => onSelect(node)}
            >
                {node.children && (
                    <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${open ? "rotate-90" : ""} ${isSelected ? "text-white/70" : "text-slate-400"
                            }`}
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpen(!open)
                        }}
                    />
                )}

                <Icon
                    size={16}
                    className={`${isSelected ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                        } transition-colors`}
                />

                <span className={`text-xs font-medium ${isSelected ? "font-semibold text-white" : ""}`}>
                    {node.label}
                </span>
            </div>

            {open && node.children && (
                <div className="mt-1 ml-4 border-l border-slate-100 pl-1">
                    {node.children.map((child: any) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            level={level + 0.5}
                            onSelect={onSelect}
                            selectedId={selectedId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

import { Search } from "lucide-react"
import type { BlockData } from "./EditorCanvas"

interface TreeSidebarProps {
    blocks: BlockData[];
    activeBlockId?: string | null;
    onSelectBlock?: (id: string) => void;
}

export default function TreeSidebar({ blocks = [], activeBlockId, onSelectBlock }: TreeSidebarProps) {
    const [filter, setFilter] = useState("")

    const getBlockLabel = (block: BlockData) => {
        if (block.type === "image") return block.alt || "Image";
        if (block.type === "divider") return "Divider";
        if (block.type === "bullet-list" || block.type === "numbered-list") {
            const count = block.items?.length || 0;
            return `${block.type === "bullet-list" ? "Bullet" : "Numbered"} List (${count})`;
        }

        const rawText = (block.content || "").replace(/<[^>]+>/g, " ").trim();
        if (!rawText) return block.type.charAt(0).toUpperCase() + block.type.slice(1);

        return rawText.length > 25 ? rawText.substring(0, 25) + "..." : rawText;
    }

    const treeNodes: TreeNode[] = blocks.map(block => ({
        id: block.id,
        label: getBlockLabel(block),
        type: block.type
    }));

    const filterTree = (nodes: any[]): any[] =>
        nodes
            .map((node) => {
                if (node.label.toLowerCase().includes(filter.toLowerCase()))
                    return node

                if (node.children) {
                    const children = filterTree(node.children)
                    if (children.length) return { ...node, children }
                }

                return null
            })
            .filter(Boolean)

    const tree = filter ? filterTree(treeNodes) : treeNodes

    return (
        <div className="w-64 border-r bg-[#F8FAFC] h-full flex flex-col shadow-inner">

            {/* Search */}
            <div className="p-3 bg-white/50 backdrop-blur-sm border-b">
                <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200/50 px-2.5 py-1.5 rounded-lg focus-within:ring-2 focus-within:ring-indigo-600/10 focus-within:border-indigo-600/30 transition-all duration-300">
                    <Search size={14} className="text-slate-400" />
                    <input
                        className="bg-transparent outline-none text-xs w-full font-medium placeholder:text-slate-400 text-slate-700"
                        placeholder="Filter items..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="p-3 px-4 border-b bg-white flex items-center justify-between">
                <p className="text-[9px] text-indigo-500 font-bold mt-0.5 leading-none">STRUCTURE</p>

            </div>


            {/* Tree */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
                {tree.map((node) => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        onSelect={(n) => onSelectBlock?.(n.id)}
                        selectedId={activeBlockId || undefined}
                    />
                ))}

                {tree.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-3">
                            <Search size={20} className="text-slate-300" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">No results found</p>
                        <p className="text-[11px] text-slate-400 mt-1">Try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    )
}