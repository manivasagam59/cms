import { useState } from 'react';
import {
    Plus, Layers, FileText, Database, Image as ImageIcon,
    Settings, Search, AlignLeft
} from 'lucide-react';
import { MiniButton } from './ui/button';
import { MiniInput } from './ui/input';
import { AddElementsTool } from './tools/AddElementsTool';
import { PagesTool } from './tools/PagesTool';
import { NavigatorTool } from './tools/NavigatorTool';
import { ComponentsTool } from './tools/ComponentsTool';
import { CMSTool } from './tools/CMSTool';
import { AssetsTool } from './tools/AssetsTool';
import { SettingsTool } from './tools/SettingsTool';

const TemplateEditorToolbar = ({ onAddElement }: { onAddElement?: (type: string) => void }) => {
    const [activePanel, setActivePanel] = useState('plus');
    const [activeTab, setActiveTab] = useState('elements');

    const sidebarIcons = [
        { id: 'plus', icon: Plus, label: 'Add Element' },
        { id: 'pages', icon: FileText, label: 'Pages' },
        { id: 'navigator', icon: AlignLeft, label: 'Navigator' },
        { id: 'components', icon: Layers, label: 'Components' },
        { id: 'cms', icon: Database, label: 'CMS Collections' },
        { id: 'assets', icon: ImageIcon, label: 'Assets' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const renderActiveTool = () => {
        switch (activePanel) {
            case 'plus':
                return (
                    <AddElementsTool
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onAddElement={onAddElement}
                    />
                );
            case 'pages':
                return <PagesTool />;
            case 'navigator':
                return <NavigatorTool />;
            case 'components':
                return <ComponentsTool />;
            case 'cms':
                return <CMSTool />;
            case 'assets':
                return <AssetsTool />;
            case 'settings':
                return <SettingsTool />;
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex bg-white border-r border-slate-200 z-40 select-none">
            {/* Ultra-Narrow Icon Bar */}
            <div className="w-[44px] border-r border-slate-100 flex flex-col items-center py-2 gap-1.5 bg-slate-50/20">
                {sidebarIcons.map(({ id, icon: Icon, label }) => (
                    <MiniButton
                        key={id}
                        icon={Icon}
                        isActive={activePanel === id}
                        onClick={() => setActivePanel(id)}
                        label={label}
                    />
                ))}
            </div>

            {/* Main Panel Content */}
            <div className="w-[240px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-1 duration-200">
                <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="text-[11px] font-semibold text-slate-800 tracking-tight uppercase">
                        {sidebarIcons.find(i => i.id === activePanel)?.label || 'Add'}
                    </h2>
                    <span className="text-[8px] font-semibold text-slate-400 px-1.5 py-0.5 border border-slate-200 rounded uppercase">Esc</span>
                </div>

                {renderActiveTool()}

                {/* Footer Search - Tiny */}
                <div className="p-2 border-t border-slate-100 bg-white">
                    <MiniInput
                        placeholder="Find item..."
                        icon={Search}
                        shortcut="⌘E"
                    />
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #e2e8f0;
                }
            `}</style>
        </div>
    );
};

export default TemplateEditorToolbar;