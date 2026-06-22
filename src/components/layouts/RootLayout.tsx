import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
// import AiChat from '../modal-app/AiChat';
import { useState } from 'react';

export default function RootLayout() {
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans relative">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header onToggleAiChat={() => setIsAiChatOpen(!isAiChatOpen)} />
                <main className="flex-1 overflow-y-auto p-4 transition-all duration-300">
                    <Outlet />
                </main>
            </div>

            {/* AI Chat Overlay */}
            {/* {isAiChatOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsAiChatOpen(false)}
                />
            )}
            <AiChat isOpen={isAiChatOpen} onClose={() => setIsAiChatOpen(false)} /> */}
        </div>
    );
}
