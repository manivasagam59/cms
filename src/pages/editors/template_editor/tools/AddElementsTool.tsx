import React from 'react';
import {
    Type, AlignLeft, Link as LinkIcon, TextIcon, Quote, FileText,
    LayoutGrid, Image as ImageIcon, Play, Youtube, Zap,
    CheckSquare, FormInput,
    Layout, Columns, Rows, Grid3X3, Square,
    MoreHorizontal, Smartphone, Tablet, Monitor
} from 'lucide-react';
import { MiniButtonGroup } from '../ui/button_group';
import { MiniAccordion } from '../ui/accordion';
import { BoxButton } from '../ui/box_button';

interface ToolbarItem {
    type: string;
    label: string;
    icon: any;
    accent?: string;
}

interface ToolbarSection {
    title: string;
    items: ToolbarItem[];
}

interface AddElementsToolProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onAddElement?: (type: string) => void;
}

const elementSections: ToolbarSection[] = [
    {
        title: 'Typography',
        items: [
            { type: 'heading', label: 'Heading', icon: Type },
            { type: 'paragraph', label: 'Paragraph', icon: AlignLeft },
            { type: 'link', label: 'Text link', icon: LinkIcon },
            { type: 'text-block', label: 'Text', icon: TextIcon },
            { type: 'blockquote', label: 'Quote', icon: Quote },
            { type: 'rich-text', label: 'Rich text', icon: FileText },
        ]
    },
    {
        title: 'CMS',
        items: [
            { type: 'collection-list', label: 'Collection list', icon: LayoutGrid, accent: 'indigo' },
        ]
    },
    {
        title: 'Media',
        items: [
            { type: 'image', label: 'Image', icon: ImageIcon },
            { type: 'video', label: 'Video', icon: Play },
            { type: 'youtube', label: 'YouTube', icon: Youtube },
            { type: 'lottie', label: 'Lottie', icon: Zap },
            { type: 'spline', icon: Zap, label: 'Spline' }
        ]
    },
    {
        title: 'Forms',
        items: [
            { type: 'form', label: 'Form', icon: CheckSquare },
            { type: 'label', label: 'Label', icon: Type },
            { type: 'input', label: 'Input', icon: FormInput },
        ]
    }
];

const layoutSections: ToolbarSection[] = [
    {
        title: 'Structural',
        items: [
            { type: 'section', label: 'Section', icon: Rows },
            { type: 'container', label: 'Container', icon: Square },
            { type: 'grid', label: 'Grid', icon: Grid3X3 },
            { type: 'columns', label: 'Columns', icon: Columns },
        ]
    },
    {
        title: 'Quick Layouts',
        items: [
            { type: 'hero', label: 'Hero', icon: Layout },
            { type: 'feature', label: 'Feature', icon: LayoutGrid },
            { type: 'pricing', label: 'Pricing', icon: Grid3X3 },
            { type: 'footer', label: 'Footer', icon: MoreHorizontal },
        ]
    },
    {
        title: 'Devices',
        items: [
            { type: 'desktop', label: 'Desktop', icon: Monitor },
            { type: 'tablet', label: 'Tablet', icon: Tablet },
            { type: 'mobile', label: 'Mobile', icon: Smartphone },
        ]
    }
];

export const AddElementsTool: React.FC<AddElementsToolProps> = ({
    activeTab,
    setActiveTab,
    onAddElement
}) => {
    return (
        <>
            {/* Elements / Layouts Tabs - Very Compact */}
            <div className="px-2 py-2 bg-white">
                <MiniButtonGroup
                    activeValue={activeTab}
                    onChange={(value: string) => setActiveTab(value)}
                    options={[
                        { label: 'Elements', value: 'elements' },
                        { label: 'Layouts', value: 'layouts' },
                    ]}
                />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-1 py-1 bg-white">
                {(activeTab === 'elements' ? elementSections : layoutSections).map((section, idx) => (
                    <MiniAccordion key={idx} title={section.title}>
                        <div className="grid grid-cols-3 gap-0.5">
                            {section.items.map((item, i) => (
                                <BoxButton
                                    key={i}
                                    label={item.label}
                                    icon={item.icon}
                                    accent={item.accent as 'indigo'}
                                    onClick={() => onAddElement?.(item.type)}
                                />
                            ))}
                        </div>
                    </MiniAccordion>
                ))}
            </div>
        </>
    );
};

export default AddElementsTool;