import EditorCanvas from "./content_editor/EditorCanvas";
import ContentEditorHeader from "./content_editor/ContentEditorHeader";
import PostSettings from "./content_editor/PostSettings";
import TreeSidebar from "./content_editor/TreeSidebar";
import { useHistory } from "../../hooks/useHistory";
import { useState } from "react";
import type { BlockData } from "./content_editor/EditorCanvas";


const uid = () => Math.random().toString(36).slice(2, 8);
const DEFAULT_BLOCKS: BlockData[] = [
    {
        id: uid(), type: "paragraph",
        content: "We've all been there: staring at a blank screen, waiting for inspiration to strike. But the truth is, the best way to supercharge your creativity isn't to wait for it—it's to <span style=\"color:#6366f1;font-weight:700;font-style:italic;text-decoration:underline;text-decoration-color:#a5b4fc;text-underline-offset:4px\">build something</span>.",
    },
    { id: uid(), type: "heading2", content: "1. The Personal Knowledge Base" },
    {
        id: uid(), type: "paragraph",
        content: "Think of this as your \"second brain\". Building a personal knowledge base isn't just about saving articles—it's about processing information and making it your own.",
    },
    { id: uid(), type: "quote", content: "Ideas are easy. Implementation is hard." },
    { id: uid(), type: "heading2", content: "2. The Micro-SaaS Tool" },
    {
        id: uid(), type: "paragraph",
        content: "Pick one pain point you experience daily and build the simplest possible tool to solve it. Constraints breed creativity, and shipping something real teaches you more than any tutorial.",
    },
    { id: uid(), type: "image", content: "", src: "", alt: "Featured image", caption: "" },
    { id: uid(), type: "code", content: "// Your creative code here\nconst idea = spark();\nidea.ship();" },
    { id: uid(), type: "divider", content: "" },
    { id: uid(), type: "heading2", content: "3. The Open Source Contribution" },
    {
        id: uid(), type: "paragraph",
        content: "Contributing to open source is one of the fastest ways to grow. Pick a project you use and love, find a small issue labelled \"good first issue\", and dive in.",
    },
    { id: uid(), type: "bullet-list", items: ["Read the contributing guidelines", "Set up the dev environment", "Fix the issue, write tests", "Open a PR with a clear description"] },
];


export default function ContentEditor() {
    const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
    const history = useHistory({
        blocks: DEFAULT_BLOCKS,
        title: "10 Side-Project Ideas To Supercharge Your Creativity (& Boost Your Skills)"
    }, 100);

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-white">
            <ContentEditorHeader
                title={history.state.title}
                onBack={() => console.log("go back")}
                undoStatus={{ canUndo: history.canUndo, canRedo: history.canRedo }}
                onUndo={history.undo}
                onRedo={history.redo}
            />

            <div className="grow flex min-h-0 bg-[#FDFEFF]">
                <TreeSidebar
                    blocks={history.state.blocks}
                    activeBlockId={activeBlockId}
                    onSelectBlock={setActiveBlockId}
                />
                <EditorCanvas
                    blocks={history.state.blocks}
                    title={history.state.title}
                    activeBlockId={activeBlockId}
                    onSetActiveBlock={setActiveBlockId}
                    onUpdate={(newState: { blocks: BlockData[]; title: string }, transient?: boolean) => transient ? history.updateState(newState) : history.pushState(newState)}
                    onCommit={history.commitHistory}
                    undo={history.undo}
                    redo={history.redo}
                />
                <PostSettings />
            </div>

        </div>
    );
}
