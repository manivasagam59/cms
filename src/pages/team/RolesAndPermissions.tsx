import { useState, useEffect } from 'react';
import {
    Shield,
    ShieldCheck,
    ShieldAlert,
    Users,
    Check,
    Info,
    ChevronRight,
    Plus,
    Edit3,
    Trash2,
    Lock,
    Globe,
    FileText,
    Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RolesAndPermissions() {
    const [mounted, setMounted] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Editor');

    useEffect(() => {
        setMounted(true);
    }, []);

    const roles = [
        { id: 1, name: 'Admin', description: 'Full access to all system settings and content.', userCount: 4, level: 'highest' },
        { id: 2, name: 'Editor', description: 'Can manage and publish all content, including others.', userCount: 12, level: 'high' },
        { id: 3, name: 'Author', description: 'Can create and manage their own content only.', userCount: 8, level: 'medium' },
        { id: 4, name: 'Contributor', description: 'Can create content but cannot publish without review.', userCount: 5, level: 'low' },
    ];

    const permissionModules = [
        {
            name: 'Content Management',
            icon: FileText,
            permissions: [
                { id: 'p1', key: 'pages.view', label: 'View Pages', description: 'Access to the pages listing view.' },
                { id: 'p2', key: 'pages.create', label: 'Create Pages', description: 'Permission to add new pages.' },
                { id: 'p3', key: 'pages.edit', label: 'Edit Pages', description: 'Modify existing page content.' },
                { id: 'p4', key: 'pages.delete', label: 'Delete Pages', description: 'Remove pages permanently.' },
                { id: 'p5', key: 'pages.publish', label: 'Publish Pages', description: 'Go live with page updates.' },
            ]
        },
        {
            name: 'Media Library',
            icon: ImageIcon,
            permissions: [
                { id: 'p6', key: 'media.view', label: 'View Media', description: 'Access to view the media library.' },
                { id: 'p7', key: 'media.upload', label: 'Upload Files', description: 'Permission to upload new media.' },
                { id: 'p8', key: 'media.delete', label: 'Delete Files', description: 'Remove files from storage.' },
            ]
        },
        {
            name: 'Site Settings',
            icon: Globe,
            permissions: [
                { id: 'p9', key: 'settings.general', label: 'General Settings', description: 'Modify site title and metadata.' },
                { id: 'p10', key: 'settings.domains', label: 'Domain Management', description: 'Configure custom domains.' },
                { id: 'p11', key: 'settings.api', label: 'API Keys', description: 'Manage system-wide API tokens.' },
            ]
        }
    ];

    // Mock Permission state for the selected role
    // Admins have everything, Editors have most, etc.
    const hasPermission = (key: string) => {
        if (selectedRole === 'Admin') return true;
        if (selectedRole === 'Editor') return !key.includes('settings.api') && !key.includes('settings.domains');
        if (selectedRole === 'Author') return key.includes('view') || key.includes('create') || key.includes('edit');
        return key.includes('view') || key.includes('create');
    };

    return (
        <div className={`p-6 max-w-[1600px] mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Roles & Permissions</h1>
                    <p className="text-slate-500 font-medium">Define access control and security levels for your team.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Plus size={18} />
                        New Custom Role
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Roles List Sidebar */}
                <div className="xl:col-span-1 space-y-4">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 mb-4">Available Roles</h2>
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.name)}
                            className={cn(
                                "group p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden",
                                selectedRole === role.name
                                    ? "bg-white border-indigo-600 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600/20"
                                    : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
                            )}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    role.name === 'Admin' && "bg-indigo-50 text-indigo-600",
                                    role.name === 'Editor' && "bg-emerald-50 text-emerald-600",
                                    role.name === 'Author' && "bg-amber-50 text-amber-600",
                                    role.name === 'Contributor' && "bg-slate-100 text-slate-500",
                                )}>
                                    {role.name === 'Admin' ? <ShieldCheck size={20} /> : role.name === 'Editor' ? <Shield size={20} /> : <ShieldAlert size={20} />}
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg">
                                    <Users size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-600">{role.userCount} Members</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-1">{role.name}</h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{role.description}</p>

                            {selectedRole === role.name && (
                                <div className="absolute right-[-4px] top-[-4px] w-8 h-8 bg-indigo-600 rounded-bl-2xl flex items-center justify-center text-white pl-1.5 pt-1.5">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
                        <Lock className="mb-4 text-indigo-400" size={24} />
                        <h4 className="font-bold text-sm mb-2">Need Granular Access?</h4>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            You can create hierarchical roles that inherit permissions from parent levels.
                        </p>
                        <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                            Read Security Guide <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Permissions Management Area */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                    <Edit3 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Configuring {selectedRole}</h3>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-0.5">Permission Matrix</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
                                    Reset to Default
                                </button>
                                <button className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all active:scale-95">
                                    Save Role Configuration
                                </button>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {permissionModules.map((module, mIdx) => (
                                <div key={mIdx} className="p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                                            <module.icon size={16} />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 tracking-tight">{module.name}</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {module.permissions.map((perm) => (
                                            <div
                                                key={perm.id}
                                                className={cn(
                                                    "p-4 rounded-xl border transition-all flex items-start gap-3",
                                                    hasPermission(perm.key)
                                                        ? "bg-white border-slate-100 shadow-sm"
                                                        : "bg-slate-50/50 border-transparent opacity-60"
                                                )}
                                            >
                                                <div className="mt-1">
                                                    <div className={cn(
                                                        "w-5 h-5 rounded flex items-center justify-center transition-all",
                                                        hasPermission(perm.key) ? "bg-emerald-500 text-white" : "bg-white border-2 border-slate-200"
                                                    )}>
                                                        {hasPermission(perm.key) && <Check size={14} strokeWidth={4} />}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-bold text-slate-900">{perm.label}</span>
                                                        <button className="text-slate-300 hover:text-indigo-600">
                                                            <Info size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                                                        {perm.description}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <button className="p-1.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                                        <Edit3 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dangerous Actions */}
                        {selectedRole !== 'Admin' && (
                            <div className="p-6 bg-rose-50/50 border-t border-rose-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-sm">
                                        <Trash2 size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Delete this role?</p>
                                        <p className="text-[10px] text-rose-600 font-medium tracking-tight">Warning: This will affect {roles.find(r => r.name === selectedRole)?.userCount} users.</p>
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-xs font-black shadow-sm hover:bg-rose-600 hover:text-white transition-all">
                                    Delete Role permanently
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
