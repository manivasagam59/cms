
import { useState } from "react";
import {
    User,
    Building2,
    Shield,
    Bell,
    Globe,
    Save,
    Lock,
    Mail,
    Smartphone,
    Database,
    Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
    { id: 'profile', label: 'My Profile', icon: User, desc: 'Personal details and preferences' },
    { id: 'organization', label: 'Practice Info', icon: Building2, desc: 'Clinic details and branding' },
    { id: 'security', label: 'Security & Compliance', icon: Shield, desc: 'Password, 2FA, and Audit Logs' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Email and SMS alerts' },
    { id: 'integrations', label: 'Integrations', icon: Globe, desc: 'Connected external services' },
    { id: 'appearance', label: 'Appearance', icon: Palette, desc: 'Theme and display settings' },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-2xl font-bold">
                                DR
                            </div>
                            <div>
                                <Button variant="outline" size="sm">Change Avatar</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input type="text" defaultValue="Dr. Sarah Reynolds" className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-50 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input type="email" defaultValue="s.reynolds@medpath.com" className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-50 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                <input type="text" defaultValue="Medical Director" disabled className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-100 border text-slate-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">NPI Number</label>
                                <input type="text" defaultValue="1289405521" className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-50 border" />
                            </div>
                        </div>
                    </div>
                );
            case 'organization':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Practice Name</label>
                                <input type="text" defaultValue="MedPath General Practice" className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-50 border" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID / EIN</label>
                                    <input type="text" defaultValue="88-291002" className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-50 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Group NPI</label>
                                    <input type="text" defaultValue="199200331" className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-50 border" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                <textarea defaultValue="123 Wellness Blvd, Suite 400\nSan Diego, CA 92101" className="w-full rounded-lg border-slate-200 text-sm p-2.5 bg-slate-50 border h-24"></textarea>
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm mb-6">
                            <Lock size={18} className="shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold">HIPAA Compliance Alert</p>
                                <p>Password expiration is enabled. Users must reset passwords every 90 days.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-slate-900">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-xs text-slate-500">Require mobile verification for login</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-slate-900">Session Timeout</h4>
                                    <p className="text-xs text-slate-500">Auto-logout after inactivity (mins)</p>
                                </div>
                                <select className="rounded-lg border-slate-200 text-sm bg-slate-50 border p-1.5">
                                    <option>10 Minutes</option>
                                    <option>15 Minutes</option>
                                    <option>30 Minutes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                                    <Mail size={16} /> Email Notifications
                                </h4>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-slate-700">Appointment Reminders</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-slate-700">Daily Schedule Summary</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-slate-700">Marketing & Updates</span>
                                    </label>
                                </div>
                            </div>

                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                                    <Smartphone size={16} /> SMS Alerts
                                </h4>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-slate-700">Urgent Lab Results</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-slate-700">System Outages</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'integrations':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <Database size={24} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900">DrChrono EHR</h4>
                                    <p className="text-xs text-slate-500">Connected • Last sync: 10 mins ago</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 bg-emerald-50">Connected</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900">Change Healthcare</h4>
                                    <p className="text-xs text-slate-500">Clearinghouse for Claims</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 bg-emerald-50">Connected</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg opacity-60">
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900">Quest Diagnostics</h4>
                                    <p className="text-xs text-slate-500">Lab Results Integration</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                        </div>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-medium text-slate-900 mb-3">Theme Preference</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <button className="border-2 border-blue-500 rounded-lg p-4 bg-white hover:bg-slate-50 relative">
                                    <div className="h-16 bg-slate-100 rounded mb-2 border border-slate-200"></div>
                                    <span className="text-sm font-medium text-slate-900">Light</span>
                                    <div className="absolute top-2 right-2 text-blue-500 bg-blue-50 rounded-full p-0.5">
                                        <User size={12} />
                                    </div>
                                </button>
                                <button className="border border-slate-200 rounded-lg p-4 bg-slate-900 hover:bg-slate-800">
                                    <div className="h-16 bg-slate-800 rounded mb-2 border border-slate-700"></div>
                                    <span className="text-sm font-medium text-white">Dark</span>
                                </button>
                                <button className="border border-slate-200 rounded-lg p-4 bg-white hover:bg-slate-50">
                                    <div className="h-16 bg-linear-to-br from-slate-100 to-slate-800 rounded mb-2 border border-slate-200"></div>
                                    <span className="text-sm font-medium text-slate-900">System</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            {/* Left Category Sidebar */}
            <div className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Settings</h1>
                    <p className="text-xs text-slate-500 mt-1">Manage global preferences</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${activeTab === cat.id
                                    ? 'bg-blue-50 text-blue-700 font-medium shadow-sm ring-1 ring-blue-200'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <cat.icon size={18} className={activeTab === cat.id ? 'text-blue-600' : 'text-slate-400'} />
                            <div className="flex-1">
                                <span className="block text-sm">{cat.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {categories.find(c => c.id === activeTab)?.label}
                                </h2>
                                <p className="text-slate-500 mt-1">
                                    {categories.find(c => c.id === activeTab)?.desc}
                                </p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200">
                                <Save size={16} className="mr-2" /> Save Changes
                            </Button>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
