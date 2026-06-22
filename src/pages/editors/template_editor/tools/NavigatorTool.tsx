import React from 'react';
import { ChevronDown, Type, ImageIcon, Layout, Box } from 'lucide-react';

export const NavigatorTool: React.FC = () => {
    const nodes = [
        {
            id: '1', type: 'Body', icon: Layout, children: [
                {
                    id: '2', type: 'Section', icon: Box, children: [
                        {
                            id: '3', type: 'Container', icon: Box, children: [
                                { id: '4', type: 'Heading', icon: Type },
                                { id: '5', type: 'Paragraph', icon: Type },
                                { id: '6', type: 'Image', icon: ImageIcon },
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    const renderNode = (node: any, level = 0) => (
        <div key={node.id} className="flex flex-col">
            <div
                className={`flex items-center gap-1.5 py-1.5 px-2 hover:bg-slate-50 cursor-pointer group transition-colors border-l-2 border-transparent hover:border-indigo-400`}
                style={{ paddingLeft: `${(level * 12) + 8}px` }}
            >
                {node.children && <ChevronDown size={10} className="text-slate-300" />}
                <node.icon size={12} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-900">{node.type}</span>
            </div>
            {node.children && node.children.map((child: any) => renderNode(child, level + 1))}
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            <div className="p-2 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 sticky top-0 z-10">
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Layers</span>
            </div>
            <div className="py-1">
                {nodes.map(node => renderNode(node))}
            </div>
        </div>
    );
};

export default NavigatorTool;
