import { useState } from 'react';
import TemplateEditorHeader from './template_editor/TemplateEditorHeader';
import TemplateEditorToolbar from './template_editor/TemplateEditorToolbar';

import { TemplateEditorCanvas } from './template_editor/TemplateEditorCanvas';
import { TemplatePropertyEditor } from './template_editor/TemplatePropertyEditor';

const TemplateEditor = () => {


    return (
        <div className="h-screen w-full bg-[#FAFBFC] flex flex-col overflow-hidden text-slate-700 font-sans selection:bg-indigo-500/10">
            <TemplateEditorHeader />

            <div className="flex-1 flex overflow-hidden">
                {/* Narrow Toolbar */}
                <TemplateEditorToolbar onAddElement={(type) => console.log('Adding', type)} />

                <TemplateEditorCanvas />

                <TemplatePropertyEditor />

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
            `}</style>
        </div>
    );
};

export default TemplateEditor;