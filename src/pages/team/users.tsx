import { useState, useEffect } from 'react';
import {
    Search,
    UserPlus,
    MoreHorizontal,
    Mail,
    Shield,
    Trash2,
    Edit3,
    Filter,
    ChevronLeft,
    ChevronRight,
    Circle,
    UserCircle,
    Key
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Users() {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        setMounted(true);
    }, []);

    const users = [
        { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@opencms.io', role: 'Admin', status: 'Active', lastActive: '2 mins ago', avatar: '' },
        { id: 2, name: 'Mark Davis', email: 'mark.d@opencms.io', role: 'Editor', status: 'Active', lastActive: '5 hours ago', avatar: '' },
        { id: 3, name: 'Alex Thompson', email: 'alex.t@opencms.io', role: 'Author', status: 'Pending', lastActive: 'Never', avatar: '' },
        { id: 4, name: 'Jessica Chen', email: 'jess.c@opencms.io', role: 'Editor', status: 'Active', lastActive: 'Yesterday', avatar: '' },
        { id: 5, name: 'Robert Wilson', email: 'rob.w@opencms.io', role: 'Contributor', status: 'Suspended', lastActive: '2 weeks ago', avatar: '' },
        { id: 6, name: 'Emily Brown', email: 'emily.b@opencms.io', role: 'Author', status: 'Active', lastActive: '12 hours ago', avatar: '' },
        { id: 7, name: 'OpenCMS Team', email: 'support@opencms.io', role: 'Admin', status: 'Active', lastActive: 'Just now', avatar: '' },
    ];

    const roles = ['All', 'Admin', 'Editor', 'Author', 'Contributor'];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || user.role === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Management</h1>
                    <p className="text-slate-500 font-medium">Manage your team members and their access levels.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <UserPlus size={18} />
                        Invite Member
                    </button>
                </div>
            </div>

            {/* Role Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Members', value: '24', icon: UserCircle, color: 'indigo' },
                    { label: 'Admins', value: '4', icon: Shield, color: 'violet' },
                    { label: 'Editors', value: '12', icon: Edit3, color: 'emerald' },
                    { label: 'Pending Invites', value: '3', icon: Mail, color: 'amber' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            stat.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                            stat.color === 'violet' && "bg-violet-50 text-violet-600",
                            stat.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                            stat.color === 'amber' && "bg-amber-50 text-amber-600",
                        )}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Control Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl w-fit overflow-x-auto scrollbar-none">
                        {roles.map(role => (
                            <button
                                key={role}
                                onClick={() => setActiveTab(role)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap",
                                    activeTab === role ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600/20 transition-all outline-none w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Member</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Role</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50">Last Active</th>
                                <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-white">
                                                    <span className="text-xs font-bold uppercase">{user.name.split(' ').map(n => n[0]).join('')}</span>
                                                </div>
                                                {user.status === 'Active' && (
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Shield size={14} className={cn(
                                                user.role === 'Admin' ? "text-indigo-600" : "text-slate-300"
                                            )} />
                                            <span className="text-xs font-bold text-slate-700">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold",
                                            user.status === 'Active' && "bg-emerald-50 text-emerald-600",
                                            user.status === 'Pending' && "bg-amber-50 text-amber-600",
                                            user.status === 'Suspended' && "bg-rose-50 text-rose-600",
                                        )}>
                                            <Circle size={4} fill="currentColor" className={cn(
                                                "w-1 h-1",
                                                user.status === 'Active' && "text-emerald-600",
                                                user.status === 'Pending' && "text-amber-600",
                                                user.status === 'Suspended' && "text-rose-600",
                                            )} />
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-slate-500">{user.lastActive}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Permissions">
                                                <Key size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Edit Profile">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Remove User">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="group-hover:hidden transition-all">
                                            <MoreHorizontal size={16} className="text-slate-300 ml-auto" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Showing 7 of 24 members</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-all border border-slate-100 rounded-lg" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-all border border-slate-100 rounded-lg">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
