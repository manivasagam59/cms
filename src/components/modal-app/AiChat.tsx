import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import WorkSpace from '@/pages/shared/WorkSpace';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    status?: 'typing' | 'sent' | 'error';
}

interface AiChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AiChat({ isOpen, onClose }: AiChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Hello! I am your MedPath AI Assistant. How can I help you today? I can assist with RCM queries, patient data lookups, or system navigation.',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);
    const [canvasType, setCanvasType] = useState<'workspace' | 'markdown'>('workspace');
    const [markdownContent, setMarkdownContent] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    if (!isOpen) return null;

    const handleSend = () => {
        if (!input.trim() || isTyping) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
            status: 'sent'
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setIsTyping(true);

        const textLower = newUserMsg.content.toLowerCase();
        const isSimulationRequest = textLower.includes('simulat') ||
            textLower.includes('rcm') ||
            textLower.includes('workspace');

        const isMarkdownRequest = textLower.includes('markdown') ||
            textLower.includes('note') ||
            textLower.includes('summary') ||
            textLower.includes('draft');

        // Simulate AI response
        setTimeout(() => {
            let responseText = "";
            let triggerCanvas = false;
            let targetCanvasType: 'workspace' | 'markdown' = 'workspace';

            if (isSimulationRequest) {
                responseText = "I've launched the RCM Workspace simulation in the canvas view for you. You can run and monitor the end-to-end process there.";
                triggerCanvas = true;
                targetCanvasType = 'workspace';
            } else if (isMarkdownRequest) {
                responseText = "I've drafted the requested document. I've opened the Markdown preview in the canvas for you to review.";
                triggerCanvas = true;
                targetCanvasType = 'markdown';
                setMarkdownContent(`# Patient Summary

**Name:** John Doe
**DOB:** 01/01/1980

## Clinical Notes

Patient presented with acute lower back pain. Condition has been worsening over the past 3 days. Patient reports pain radiating down left leg, exacerbated by prolonged sitting or bending.

### Assessment
1. Lumbar strain
2. Acute muscle spasm

### Plan
- Prescribe Cyclobenzaprine 10mg
- Recommend physical therapy evaluating twice a week
- Follow up in 2 weeks or if symptoms worsen.


| Patient ID | Patient Name     | Age | Gender | Doctor Assigned | Department        | Appointment Date | Status      |
|------------|------------------|-----|--------|-----------------|-------------------|------------------|------------|
| P001       | John Smith       | 34  | Male   | Dr. Adams       | General Medicine  | 2026-02-20       | Completed  |
| P002       | Maria Gonzalez   | 28  | Female | Dr. Lee         | Dermatology       | 2026-02-21       | Scheduled  |
| P003       | Ahmed Khan       | 45  | Male   | Dr. Patel       | Cardiology        | 2026-02-22       | Cancelled  |
| P004       | Emily Johnson    | 52  | Female | Dr. Brown       | Orthopedics       | 2026-02-23       | Completed  |
| P005       | Daniel Kim       | 39  | Male   | Dr. Wilson      | Pediatrics        | 2026-02-24       | Scheduled  |
`);
            } else {
                const botResponses = [
                    "I've analyzed that request. Let me check the RCM pipeline for you.",
                    "According to the latest eligibility guidelines, that requires prior authorization. Would you like me to initiate that workflow?",
                    "I found 3 claims matching that criteria in the Denial queue.",
                    "The patient's clinical notes have been successfully summarized."
                ];
                responseText = botResponses[Math.floor(Math.random() * botResponses.length)];
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseText,
                timestamp: new Date(),
                status: 'sent'
            }]);
            setIsTyping(false);

            if (triggerCanvas) {
                setCanvasType(targetCanvasType);
                setTimeout(() => setIsCanvasOpen(true), 500);
            }
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={cn(
            "fixed inset-y-0 right-0 bg-white shadow-2xl z-50 flex transform transition-all duration-300 ease-out animate-in slide-in-from-right",
            isCanvasOpen ? "w-screen sm:w-[90vw] max-w-7xl border-l border-slate-200" : "w-full sm:w-[400px] border-l border-slate-200"
        )}>
            {/* Canvas Area (Appears on the left when expanded) */}
            {isCanvasOpen && (
                <div className="flex-1 border-r border-slate-200 flex flex-col bg-slate-50 overflow-hidden animate-in fade-in duration-500 relative z-10 p-2 sm:p-4">
                    <div className="flex justify-between items-center mb-4 px-2 shrink-0">
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-blue-500 w-5 h-5" />
                            <h3 className="font-bold text-slate-800 tracking-tight">AI Generated Canvas</h3>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setIsCanvasOpen(false)} className="text-slate-500 hover:text-slate-700 h-8 px-2 transition-colors">
                            <X size={16} className="mr-1.5" /> Close Canvas
                        </Button>
                    </div>
                    <div className="flex-1 rounded-xl overflow-hidden shadow-sm border border-slate-200/60 bg-white flex flex-col">
                        {canvasType === 'workspace' && <WorkSpace />}
                        {canvasType === 'markdown' && (
                            <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
                                <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 items-center px-4 shrink-0">
                                    <button className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-md shadow-sm text-slate-800">Preview</button>
                                    <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-md transition-colors">Raw</button>
                                    <div className="ml-auto flex items-center gap-2">
                                        <span className="text-xs font-medium text-slate-400">patient_summary.md</span>
                                    </div>
                                </div>
                                <div className="flex-1 p-8 overflow-y-auto text-slate-700 text-sm leading-relaxed">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="text-2xl font-extrabold mt-2 mb-4 text-slate-900" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3 text-slate-800" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-slate-800" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-4" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-4" {...props} />,
                                            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                                            em: ({ node, ...props }) => <em className="italic" {...props} />,
                                            a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                                            table: ({ node, ...props }) => (
                                                <div className="overflow-x-auto mb-6">
                                                    <table className="w-full text-left border-collapse" {...props} />
                                                </div>
                                            ),
                                            thead: ({ node, ...props }) => <thead className="bg-slate-50 border-b border-slate-200" {...props} />,
                                            tbody: ({ node, ...props }) => <tbody className="divide-y divide-slate-100" {...props} />,
                                            tr: ({ node, ...props }) => <tr className="hover:bg-slate-50/50 transition-colors" {...props} />,
                                            th: ({ node, ...props }) => <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider" {...props} />,
                                            td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-slate-700 font-medium" {...props} />
                                        }}
                                    >
                                        {markdownContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Chat Area (Stays on the right) */}
            <div className={cn(
                "flex flex-col h-full shrink-0 transition-all duration-300 relative z-20",
                isCanvasOpen ? "w-full sm:w-[360px] bg-white border-l border-slate-100" : "w-full sm:w-[400px]"
            )}>
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white text-slate-800 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Sparkles size={16} />
                        </div>
                        <div>
                            <h2 className="font-bold text-sm tracking-tight text-slate-900">MedPath AI</h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Online & Ready</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors focus:outline-none"
                        aria-label="Close Chat"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Warning Banner */}
                <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-start gap-2 shrink-0">
                    <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-amber-700 font-medium leading-tight">
                        AI can make mistakes. Always verify critical clinical or billing information.
                    </p>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-3 max-w-[90%]",
                                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            {/* Avatar */}
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                msg.role === 'user' ? "bg-slate-100" : "bg-blue-600 text-white"
                            )}>
                                {msg.role === 'user' ? <User size={14} className="text-slate-600" /> : <Bot size={14} />}
                            </div>

                            {/* Bubble */}
                            <div className="flex flex-col gap-1">
                                <div className={cn(
                                    "text-[13px] px-4 py-2.5 rounded-2xl leading-relaxed shadow-sm",
                                    msg.role === 'user'
                                        ? "bg-slate-800 text-white rounded-tr-sm"
                                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-sm"
                                )}>
                                    {msg.content}
                                </div>
                                <span className={cn(
                                    "text-[10px] text-slate-400 font-medium px-1",
                                    msg.role === 'user' ? "text-right" : "text-left"
                                )}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3 max-w-[80%] mr-auto">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                                <Bot size={14} />
                            </div>
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm flex items-center gap-1.5 h-[42px]">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 shrink-0 flex flex-col items-center">
                    <div className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask MedPath AI..."
                            className="flex-1 bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 focus:outline-none px-3 h-10 w-full"
                            disabled={isTyping}
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className={cn(
                                "w-10 h-10 p-0 rounded-lg flex items-center justify-center transition-all shrink-0 border-0",
                                input.trim() && !isTyping ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            )}
                            style={{ boxShadow: 'none' }}
                        >
                            {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="-ml-0.5" />}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
