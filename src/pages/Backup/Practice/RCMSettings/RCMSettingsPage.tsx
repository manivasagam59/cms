import { useState } from "react";
import { UserPlus, ShieldCheck, FileDigit, ArrowRight, DollarSign, Activity, Search, ChevronRight } from "lucide-react";

import RegistrationSettings from "./RegistrationSettings";
import EligibilitySettings from "./EligibilitySettings";
import CodingSettings from "./CodingSettings";
import ClaimsSettings from "./ClaimsSettings";
import PaymentSettings from "./PaymentSettings";
import DenialSettings from "./DenialSettings";

const settingCategories = [
    {
        id: "core",
        title: "Patient Intake & Verification",
        settings: [
            { id: "registration", title: "Patient Registration", icon: UserPlus, component: RegistrationSettings },
            { id: "eligibility", title: "Eligibility", icon: ShieldCheck, component: EligibilitySettings }
        ]
    },
    {
        id: "billing",
        title: "Coding & Claims",
        settings: [
            { id: "coding", title: "Coding Rules", icon: FileDigit, component: CodingSettings },
            { id: "claims", title: "Claims Management", icon: ArrowRight, component: ClaimsSettings }
        ]
    },
    {
        id: "revenue",
        title: "Payments & Appeals",
        settings: [
            { id: "payments", title: "Payment Processing", icon: DollarSign, component: PaymentSettings },
            { id: "denials", title: "Denials Workflow", icon: Activity, component: DenialSettings }
        ]
    }
];

export default function RCMSettingsPage() {
    const [selectedSettingId, setSelectedSettingId] = useState("registration");

    const activeSettingInfo = settingCategories.flatMap(c => c.settings).find(s => s.id === selectedSettingId) || settingCategories[0].settings[0];
    const ActiveComponent = activeSettingInfo.component;

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Settings Navigation */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">RCM Configuration</h2>
                    <p className="text-xs text-slate-500">Manage billing rules & workflows</p>
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Find a setting..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
                    {settingCategories.map(category => (
                        <div key={category.id}>
                            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                {category.title}
                            </h3>
                            <div className="space-y-1">
                                {category.settings.map(setting => (
                                    <button
                                        key={setting.id}
                                        onClick={() => setSelectedSettingId(setting.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${selectedSettingId === setting.id
                                            ? 'bg-blue-50 text-blue-700 font-medium'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            <setting.icon size={16} className={selectedSettingId === setting.id ? "text-blue-600" : "text-slate-400"} />
                                            <span className="truncate">{setting.title}</span>
                                        </div>
                                        {selectedSettingId === setting.id && <ChevronRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <ActiveComponent />
            </div>
        </div>
    );
}
