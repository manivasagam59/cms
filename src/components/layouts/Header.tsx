import { Search, Bell, Settings, ChevronDown, Menu, LogOut, Moon, Sun } from 'lucide-react';
import { BsStars } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

interface HeaderProps {
    onToggleAiChat: () => void;
}

export default function Header({ onToggleAiChat }: HeaderProps) {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md transition-all sm:px-6">
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100">
                    <Menu size={20} />
                </button>
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search anything"
                        className="h-10 w-[240px] rounded-xl border-none bg-gray-100 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-600/10 transition-all lg:w-[320px]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleAiChat}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors cursor-pointer"
                >
                    <BsStars size={20} />
                </button>

                <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-3 rounded-xl p-1.5 pl-2 pr-3 cursor-pointer transition-colors ${isProfileOpen ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        <div className="h-7 w-7 rounded-lg bg-emerald-200 overflow-hidden shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop"
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 hidden md:block">Alfredo Westervelt</span>
                        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100  animate-in fade-in slide-in-from-top-2 duration-200">
                            <button
                                onClick={() => { setIsProfileOpen(false); navigate(true ? '/settings' : '/provider-settings'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Settings size={16} className="text-gray-400" />
                                <span>Settings</span>
                            </button>
                            <div className="h-px bg-gray-100 "></div>
                            <div className="px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                setTheme(theme === 'dark' ? 'light' : 'dark');
                            }}>
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    {theme === 'dark' ? <Moon size={16} className="text-gray-400" /> : <Sun size={16} className="text-gray-400" />}
                                    <span>Dark Theme</span>
                                </div>
                                <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                                    <span aria-hidden="true" className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </div>
                            <div className="h-px bg-gray-100 "></div>
                            <button
                                onClick={() => { setIsProfileOpen(false); navigate('/login'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                                <LogOut size={16} className="text-rose-400" />
                                <span>Log out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
