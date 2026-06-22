
import { Save, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Setting {
    id: string;
    label: string;
    type: string;
    value: boolean | string;
    desc: string;
    options?: string[];
}

interface SettingsPageProps {
    title: string;
    description: string;
    icon: any;
    color: string;
    settings: Setting[];
}

export default function SettingsPage({ title, description, icon: Icon, color, settings }: SettingsPageProps) {
    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Header */}
            <div className="bg-white px-6 py-3 border-b border-slate-200 flex justify-between items-center  z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${color}`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                        <p className="text-slate-500 text-xs">{description}</p>
                    </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm shadow-blue-200">
                    <Save size={18} />
                    Save Changes
                </Button>
            </div>

            {/* Settings Form */}
            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200">
                <div className="max-w-3xl space-y-6 mx-auto">
                    {/* Configuration Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800">Configuration Parameters</h3>
                            <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border">
                                ID: {title.toUpperCase().replace(/\s+/g, '_')}
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {settings.map((setting, idx) => (
                                <div key={idx} className="p-6 flex items-start gap-4 hover:bg-slate-50/30 transition-colors">
                                    <div className="flex-1">
                                        <label className="text-sm font-semibold text-slate-900 block mb-1">
                                            {setting.label}
                                        </label>
                                        <p className="text-sm text-slate-500">{setting.desc}</p>
                                    </div>

                                    <div className="w-48 flex justify-end">
                                        {setting.type === 'toggle' && (
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    defaultChecked={setting.value as boolean}
                                                />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        )}

                                        {setting.type === 'select' && (
                                            <select
                                                className="block w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-shadow"
                                                defaultValue={setting.value as string}
                                            >
                                                {setting.options?.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        )}

                                        {setting.type === 'input' && (
                                            <input
                                                type="text"
                                                defaultValue={setting.value as string}
                                                className="block w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-shadow"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Impact Analysis / Insights */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                            <h4 className="flex items-center gap-2 font-bold text-emerald-800 mb-2">
                                <CheckCircle2 size={18} />
                                Expected Impact
                            </h4>
                            <ul className="space-y-2 text-sm text-emerald-700">
                                <li className="flex gap-2 items-start"><span className="text-emerald-500 mt-1">•</span> Improves workflow efficiency by ~15%</li>
                                <li className="flex gap-2 items-start"><span className="text-emerald-500 mt-1">•</span> Enhances data accuracy & compliance</li>
                            </ul>
                        </div>

                        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                            <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2">
                                <AlertCircle size={18} />
                                Risk Factors
                            </h4>
                            <ul className="space-y-2 text-sm text-amber-900">
                                <li className="flex gap-2 items-start"><span className="text-amber-500 mt-1">•</span> Ensure staff training on new configurations</li>
                                <li className="flex gap-2 items-start"><span className="text-amber-500 mt-1">•</span> Verify integration with external systems</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
