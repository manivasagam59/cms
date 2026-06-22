
import { useState } from "react";
import {
    Search,
    Calendar,
    Clock,
    User,
    Building2,
    CreditCard,
    AlertTriangle,
    Plus,
    Trash2,
    DollarSign,
    Info,
    CheckCircle2,
    Sparkles,
    ChevronRight,
    Save
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const patients = [
    {
        id: '1',
        name: 'Sarah Johnson',
        mrn: 'MRN20263',
        dos: '2026-02-19',
        provider: 'Dr. Mike Wheeler',
        location: 'Main Clinic',
        insurance: 'Blue Cross Blue Shield',
        status: 'Ready for Review',
        charges: [
            { id: 101, cpt: '99214', desc: 'Office visit, established patient, moderate complexity', mod: 'Mod', dx: 'M54.16', units: 1, fee: 175.00 }
        ],
        alerts: [
            "Diagnosis code M54.16 requires modifier -LT for laterality specification"
        ]
    },
    {
        id: '2',
        name: 'Michael Chen',
        mrn: 'MRN20264',
        dos: '2026-02-19',
        provider: 'Dr. Sarah Miller',
        location: 'Westside Wellness',
        insurance: 'UnitedHealthcare',
        status: 'In Progress',
        charges: [],
        alerts: []
    },
    {
        id: '3',
        name: 'Emma Roberts',
        mrn: 'MRN20265',
        dos: '2026-02-18',
        provider: 'Dr. James Wilson',
        location: 'City Health Center',
        insurance: 'Aetna',
        status: 'Pending',
        charges: [],
        alerts: []
    }
];

export default function RCMChargeEntry() {
    const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
    const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

    const totalCharges = selectedPatient.charges.reduce((sum, charge) => sum + (charge.fee * charge.units), 0);

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Patient Queue */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Charge Queue</h2>
                    <p className="text-xs text-slate-500 mt-1">Pending charge caputre reviews</p>
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {patients.map(patient => (
                        <div
                            key={patient.id}
                            onClick={() => setSelectedPatientId(patient.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedPatientId === patient.id
                                ? 'bg-purple-50 border-purple-200 shadow-sm'
                                : 'bg-white border-slate-100 hover:border-purple-100 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className={`font-semibold ${selectedPatientId === patient.id ? 'text-purple-900' : 'text-slate-900'}`}>
                                        {patient.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">{patient.mrn}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${patient.status === 'Ready for Review' ? 'bg-emerald-100 text-emerald-700' :
                                        patient.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                                            'bg-slate-100 text-slate-600'
                                    }`}>
                                    {patient.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Calendar size={12} />
                                <span>{patient.dos}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Header */}
                <div className="px-8 py-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Charge Entry</h1>
                        <p className="text-sm text-slate-500">AI-assisted charge capture</p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md shadow-purple-200">
                        Ready for Claim <ChevronRight size={16} className="ml-1" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200">

                    {/* Visit Summary Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
                        <h2 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Visit Summary</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">PATIENT</p>
                                <p className="font-semibold text-slate-900">{selectedPatient.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">MRN</p>
                                <p className="font-mono text-slate-700">{selectedPatient.mrn}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">DATE OF SERVICE</p>
                                <p className="font-semibold text-slate-900">{selectedPatient.dos}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">PROVIDER</p>
                                <div className="flex items-center gap-1.5 text-slate-900">
                                    <User size={14} className="text-slate-400" />
                                    <span className="font-medium">{selectedPatient.provider}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">INSURANCE</p>
                                <div className="flex items-center gap-1.5 text-slate-900">
                                    <CreditCard size={14} className="text-slate-400" />
                                    <span className="font-medium">{selectedPatient.insurance}</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-4 pt-4 border-t border-slate-50">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">LOCATION</p>
                                <div className="flex items-center gap-1.5 text-slate-900">
                                    <Building2 size={14} className="text-slate-400" />
                                    <span className="font-medium">{selectedPatient.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Validation Alerts */}
                    {selectedPatient.alerts.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 relative overflow-hidden">
                            {/* Decorative highlight */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>

                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h3 className="font-bold text-amber-800 text-sm mb-1">AI Validation Alerts</h3>
                                    <ul className="space-y-1">
                                        {selectedPatient.alerts.map((alert, idx) => (
                                            <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0"></span>
                                                {alert}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Charge Details Section */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-lg font-bold text-slate-800">Charge Details</h2>
                            <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50 text-slate-600 border-slate-200">
                                <Plus size={16} className="mr-2" /> Add Charge
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[10%]">CPT Code</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Description</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[10%]">Modifier</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[10%]">Dx Pointer</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[10%] text-center">Units</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[10%] text-right">Fee</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[10%] text-right">Total</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[5%] text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {selectedPatient.charges.length > 0 ? (
                                        selectedPatient.charges.map((charge) => (
                                            <tr key={charge.id} className="group hover:bg-slate-50/80 transition-colors">
                                                <td className="px-6 py-4 font-mono text-sm font-medium text-slate-900 flex items-center gap-2">
                                                    {charge.cpt}
                                                    <Sparkles size={12} className="text-purple-500" /> {/* AI indicator */}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-700">{charge.desc}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-xs text-slate-500 block text-center max-w-[60px]">{charge.mod}</span>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-sm text-slate-600">{charge.dx}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs font-bold">{charge.units}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-slate-600 font-mono flex items-center justify-end gap-1">
                                                    <span className="text-slate-400">$</span> {charge.fee}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-bold text-slate-900 font-mono">
                                                    ${(charge.fee * charge.units).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded hover:bg-rose-50">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-8 text-center text-slate-400 italic text-sm">
                                                No charges added yet. Click "+ Add Charge" to begin.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot className="bg-slate-50 border-t border-slate-200">
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                                                <CheckCircle2 size={18} />
                                                <span>{selectedPatient.charges.length} charge(s) entered</span>
                                            </div>
                                        </td>
                                        <td colSpan={3} className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3 text-lg">
                                                <span className="text-slate-500 font-medium text-sm mt-1">Total Charges:</span>
                                                <span className="font-bold text-slate-900 font-mono text-xl">${totalCharges.toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* AI Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
                        <div className="mt-0.5 p-1 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                            <Sparkles size={16} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-800 mb-1">AI Fee Auto-Population</h4>
                            <p className="text-sm text-blue-700">Fees are automatically populated based on provider, location, and insurance payer. You can manually override any suggested fee.</p>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 pb-8">
                        <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                            <Save size={16} className="mr-2" />
                            Save as Draft
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-200">
                            Submit to Claim Scrubber <ChevronRight size={16} className="ml-1" />
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
