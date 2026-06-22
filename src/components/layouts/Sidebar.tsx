import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    FileText,
    Image,
    Users,
    BarChart3,
    ChevronDown,
    ChevronRight,
    LayoutTemplate,
    PenTool,
    ShieldCheck,
    Globe
} from 'lucide-react';
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const cmsMenuItems = [
        { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
        {
            icon: FileText,
            text: 'Content',
            path: '/content',
            subItems: [
                { text: 'Pages', icon: FileText, path: '/pages' },
                { text: 'Posts', icon: PenTool, path: '/posts' },
                { text: 'Categories', icon: LayoutTemplate, path: '/categories' },
                { text: 'Templates', icon: LayoutTemplate, path: '/templates' },
            ]
        },
        { icon: Image, text: 'Media Library', path: '/media' },
        {
            icon: Users,
            text: 'Team',
            path: '/team',
            subItems: [
                { text: 'Users', icon: Users, path: '/users' },
                { text: 'Roles & Permissions', icon: ShieldCheck, path: '/roles' },
            ]
        },
        { icon: BarChart3, text: 'Analytics', path: '/analytics' },
        { icon: Globe, text: 'Domains', path: '/domains' },
        { icon: Settings, text: 'Settings', path: '/settings' },
    ];

    const [expanded, setExpanded] = useState(true);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const location = useLocation();



    const toggleSubmenu = (text: string) => {
        if (!expanded) {
            setExpanded(true);
            setOpenSubmenu(text);
        } else {
            setOpenSubmenu(prev => prev === text ? null : text);
        }
    };

    return (
        <aside className={cn(
            "h-screen bg-white shadow-xl transition-all duration-300 relative border-r border-gray-100",
            expanded ? "w-64" : "w-[68px]"
        )}>
            <nav className="h-full flex flex-col">
                <div className="p-4 pb-2 flex justify-between items-center bg-white">
                    <div className={cn("flex items-center gap-3 overflow-hidden transition-all duration-300", expanded ? "w-40" : "w-0")}>
                        <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-600/20 shrink-0">
                            <LayoutTemplate className="text-white w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            OpenCMS
                        </span>
                    </div>
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600"
                    >
                        {expanded ? <TbLayoutSidebarRightExpand size={20} /> : <TbLayoutSidebarLeftExpand size={20} />}
                    </button>
                </div>

                <ul className="flex-1 flex flex-col px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200">
                    {cmsMenuItems.map((item, index) => {
                        const hasSubItems = 'subItems' in item && item.subItems && item.subItems.length > 0;
                        const isOpen = openSubmenu === item.text;
                        const isActive = location.pathname === item.path || (hasSubItems && location.pathname.startsWith(item.path));

                        return (
                            <li key={index} className="flex flex-col">
                                {hasSubItems ? (
                                    <div
                                        onClick={() => toggleSubmenu(item.text)}
                                        className={cn(
                                            "relative flex items-center py-2 px-3 font-normal rounded-lg cursor-pointer transition-colors group justify-between",
                                            isActive && !isOpen
                                                ? "bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-700"
                                                : "hover:bg-indigo-50 text-gray-600"
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <item.icon size={18} className={cn("inline-block flex-shrink-0", expanded ? "mr-3" : "")} />
                                            <span className={cn("overflow-hidden text-nowrap transition-all duration-300 text-sm", expanded ? "w-32 opacity-100" : "w-0 opacity-0")}>
                                                {item.text}
                                            </span>
                                        </div>
                                        {expanded && (
                                            isOpen ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />
                                        )}
                                    </div>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => cn(
                                            "relative flex items-center py-2 px-3 font-normal rounded-lg cursor-pointer transition-colors group",
                                            isActive
                                                ? "bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-700"
                                                : "hover:bg-indigo-50 text-gray-600"
                                        )}
                                    >
                                        <div className="relative">
                                            <item.icon size={18} className={cn("inline-block flex-shrink-0", expanded ? "mr-3" : "")} />
                                            {!expanded && (
                                                <div className={cn(
                                                    "absolute left-full top-[50%] translate-y-[-50%] rounded-md px-2 py-1 ml-6 bg-indigo-100 text-sm text-indigo-700 opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50 shadow-sm"
                                                )}>
                                                    {item.text}
                                                </div>
                                            )}
                                        </div>
                                        <span className={cn("overflow-hidden text-nowrap transition-all duration-300 text-sm", expanded ? "w-40 opacity-100" : "w-0 opacity-0")}>
                                            {item.text}
                                        </span>
                                    </NavLink>
                                )}

                                {hasSubItems && expanded && (
                                    <div className={cn(
                                        "grid transition-all duration-300 ease-in-out",
                                        isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"
                                    )}>
                                        <ul className="overflow-hidden ml-4 space-y-1 border-l border-gray-200 pl-2">
                                            {(item as any).subItems.map((subItem: any, subIndex: number) => {
                                                const isSubActive = location.pathname + location.search === subItem.path;
                                                return (
                                                    <li key={subIndex}>
                                                        <NavLink
                                                            to={subItem.path}
                                                            className={cn(
                                                                "flex items-center py-1.5 px-3 text-sm rounded-md transition-colors group/sub justify-between",
                                                                isSubActive
                                                                    ? "text-indigo-600 bg-indigo-50 font-medium"
                                                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <subItem.icon size={16} className={isSubActive ? "text-indigo-600" : "text-gray-400 group-hover/sub:text-gray-600"} />
                                                                <span>{subItem.text}</span>
                                                            </div>
                                                            {subItem.badge && (
                                                                <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto">
                                                                    {subItem.badge}
                                                                </span>
                                                            )}
                                                        </NavLink>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
