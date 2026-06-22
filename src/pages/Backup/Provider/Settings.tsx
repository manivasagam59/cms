import { useState } from 'react';
import { User, Lock, Bell, Shield, Wallet, Globe, Smartphone, Fingerprint, Calendar, Settings } from 'lucide-react';

export default function ProviderSettings() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden relative rounded-2xl border border-slate-100 shadow-sm">
            {/* Sidebar Settings Navigation */}
            <div className="w-72 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        Settings
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Manage your provider account and preferences.</p>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    {[
                        { id: 'profile', icon: User, label: 'Profile Information', desc: 'Personal & NPI details' },
                        { id: 'security', icon: Lock, label: 'Security & Access', desc: 'Password & 2FA setup' },
                        { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Alerts & email digesting' },
                        { id: 'integrations', icon: Globe, label: 'EHR Integrations', desc: 'Connections & Sync' },
                        { id: 'billing', icon: Wallet, label: 'Billing Details', desc: 'Payment methods' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-4 ${activeTab === tab.id
                                ? 'bg-blue-50 border border-blue-200 shadow-sm'
                                : 'bg-white border border-transparent hover:border-slate-100 hover:bg-slate-50'
                                }`}
                        >
                            <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                <tab.icon size={16} fill={activeTab === tab.id ? 'currentColor' : 'none'} />
                            </div>
                            <div>
                                <h3 className={`text-sm font-bold ${activeTab === tab.id ? 'text-blue-900' : 'text-slate-700'}`}>
                                    {tab.label}
                                </h3>
                                <p className={`text-[11px] mt-0.5 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {tab.desc}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Main Content */}
            <div className="flex-1 overflow-y-auto bg-white p-8 scrollbar-thin scrollbar-thumb-slate-200">
                {activeTab === 'profile' && (
                    <div className="max-w-3xl animate-in fade-in flex flex-col gap-8 duration-500">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Profile Information</h1>
                            <p className="text-sm text-slate-500 mt-1">Update your professional details and how you appear to patients.</p>
                        </div>

                        {/* Avatar Section */}
                        <div className="flex items-center gap-6 p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
                            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200" alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200">Upload new</button>
                                    <button className="px-4 py-2 bg-white text-slate-500 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-rose-500 transition-colors">Clear</button>
                                </div>
                                <p className="text-xs text-slate-400">Recommended size: 500x500px. JPG, PNG, GIF up to 5MB.</p>
                            </div>
                        </div>

                        {/* Form Details */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">First Name</label>
                                <input type="text" defaultValue="Sarah" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Last Name</label>
                                <input type="text" defaultValue="Wilson" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-900" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-bold text-slate-700">Work Email</label>
                                <input type="email" defaultValue="dr.wilson@medpath.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">NPI Number</label>
                                <input type="text" defaultValue="8493028114" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-mono text-slate-600" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Primary Specialty</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-900">
                                    <option>Internal Medicine</option>
                                    <option>Orthopedics</option>
                                    <option>Pediatrics</option>
                                    <option>Neurology</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-end">
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 transition-all active:scale-95">
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="max-w-3xl animate-in fade-in flex flex-col gap-8 duration-500">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Access</h1>
                            <p className="text-sm text-slate-500 mt-1">Manage your password and configure multi-factor authentication.</p>
                        </div>

                        {/* 2FA Card */}
                        <div className="p-6 rounded-2xl border border-blue-100 bg-blue-50/30 flex items-start gap-5">
                            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
                                <Shield size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 text-base">Two-Factor Authentication (2FA)</h3>
                                <p className="text-sm text-slate-600 leading-relaxed mt-1 mb-4">Add an extra layer of security to your account by turning on 2FA. You'll need to enter a code from your authenticator app when signing in.</p>
                                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">Enable Authenticator App</button>
                            </div>
                        </div>

                        {/* Password Block */}
                        <div className="space-y-6 bg-white p-6 border border-slate-100 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-4">Change Password</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-900 max-w-md" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-900 max-w-md" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-900 max-w-md" />
                                </div>
                            </div>
                            <button className="mt-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm">Update Password</button>
                        </div>

                        {/* Device History */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-slate-800">Active Devices</h3>
                            <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                                <div className="p-4 flex items-center justify-between bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                            <Smartphone size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">iPhone 14 Pro</p>
                                            <p className="text-xs text-slate-500">San Francisco, CA • Active now</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md">This Device</span>
                                </div>
                                <div className="p-4 flex items-center justify-between bg-slate-50">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-200 text-slate-600 rounded-lg">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">MacBook Pro (Chrome)</p>
                                            <p className="text-xs text-slate-500">San Francisco, CA • Last active 2h ago</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-rose-500 hover:text-rose-700 border border-transparent hover:border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-md transition-all">Revoke</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== 'profile' && activeTab !== 'security' && (
                    <div className="h-[400px] flex flex-col items-center justify-center animate-in fade-in duration-500">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <Settings className="text-slate-400 w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Section Under Construction</h2>
                        <p className="text-sm text-slate-500 mt-2">More settings configurations are being mapped out.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
