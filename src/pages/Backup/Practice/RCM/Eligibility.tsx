
import { useState } from "react";
import {
    Search,
    CreditCard,
    CheckCircle2,
    Clock,
    AlertCircle,
    RefreshCw,
    User,
    Calendar,
    FileText,
    DollarSign,
    ShieldCheck
} from "lucide-react";

// Mock Data
const patients = [
    {
        id: '1',
        name: 'Sarah Johnson',
        mrn: 'MRN20263',
        dob: '1985-03-15',
        insurance: 'Blue Cross Blue Shield',
        memberId: 'ABC123456789',
        planType: 'PPO',
        lastChecked: '2026-02-15',
        status: 'Active',
        statusDetail: 'Coverage verified and active',
        coverageLevel: 'Individual',
        effectiveDate: '2026-01-01',
        terminationDate: '2026-12-31',
        copay: 30,
        deductible: { total: 1500, met: 850 },
        oopMax: { total: 5000, met: 1200 },
        pcpRequired: 'No',
        priorAuthRequired: 'Yes, for certain procedures'
    },
    {
        id: '2',
        name: 'Michael Chen',
        mrn: 'MRN20264',
        dob: '1990-07-22',
        insurance: 'UnitedHealthcare',
        memberId: 'UHC987654321',
        planType: 'HMO',
        lastChecked: '2026-02-10',
        status: 'Pending',
        statusDetail: 'Verification in progress',
        coverageLevel: 'Family',
        effectiveDate: '2026-01-01',
        terminationDate: '2026-12-31',
        copay: 45,
        deductible: { total: 3000, met: 1200 },
        oopMax: { total: 7500, met: 2500 },
        pcpRequired: 'Yes',
        priorAuthRequired: 'Yes'
    },
    {
        id: '3',
        name: 'Emma Roberts',
        mrn: 'MRN20265',
        dob: '1982-11-05',
        insurance: 'Aetna',
        memberId: 'AET456789123',
        planType: 'EPO',
        lastChecked: '2026-02-18',
        status: 'Inactive',
        statusDetail: 'Coverage expired or terminated',
        coverageLevel: 'Individual',
        effectiveDate: '2025-01-01',
        terminationDate: '2025-12-31',
        copay: 0,
        deductible: { total: 0, met: 0 },
        oopMax: { total: 0, met: 0 },
        pcpRequired: 'N/A',
        priorAuthRequired: 'N/A'
    }
];

export default function RCMEligibility() {
    const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
    const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Active': return <CheckCircle2 size={18} className="text-emerald-500" />;
            case 'Pending': return <Clock size={18} className="text-amber-500" />;
            case 'Inactive': return <AlertCircle size={18} className="text-rose-500" />;
            default: return <Clock size={18} className="text-slate-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-600';
            case 'Pending': return 'bg-amber-500';
            case 'Inactive': return 'bg-rose-500';
            default: return 'bg-slate-500';
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            {/* Top Search Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-slate-900">Insurance Eligibility Verification</h1>
                    <p className="text-xs text-slate-500">AI-powered real-time eligibility checking</p>
                </div>
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by patient name, MRN, or insurance member ID..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                    />
                    <button className="absolute right-1 top-1 bottom-1 px-3 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors">
                        Search
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar - Recent Patients */}
                <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full">
                    <div className="p-4 border-b border-slate-100">
                        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Recent Patients</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {patients.map(patient => (
                            <div
                                key={patient.id}
                                onClick={() => setSelectedPatientId(patient.id)}
                                className={`p-3 rounded-lg border transition-all cursor-pointer flex justify-between items-start ${selectedPatientId === patient.id
                                    ? 'bg-purple-50 border-purple-200 shadow-sm'
                                    : 'bg-white border-slate-100 hover:border-purple-100 hover:bg-slate-50'
                                    }`}
                            >
                                <div>
                                    <h3 className={`font-semibold text-sm ${selectedPatientId === patient.id ? 'text-purple-900' : 'text-slate-900'}`}>
                                        {patient.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">{patient.mrn}</p>
                                    <p className="text-xs text-slate-600 mt-1 font-medium">{patient.insurance}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">Last checked: {patient.lastChecked}</p>
                                </div>
                                <div>
                                    {getStatusIcon(patient.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">

                    {/* Patient Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h2>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                <div className="flex items-center gap-1.5">
                                    <User size={14} />
                                    <span className="font-mono">{selectedPatient.mrn}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    <span>DOB: {selectedPatient.dob}</span>
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                            <RefreshCw size={16} />
                            Check Eligibility
                        </button>
                    </div>

                    {/* Insurance Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">Insurance Provider</p>
                                    <h3 className="text-2xl font-bold">{selectedPatient.insurance}</h3>
                                </div>
                                <CreditCard size={32} className="text-blue-200" />
                            </div>
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Member ID</p>
                                    <p className="font-mono font-bold text-lg tracking-wide">{selectedPatient.memberId}</p>
                                </div>
                                <div>
                                    <p className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Plan Type</p>
                                    <p className="font-bold text-lg">{selectedPatient.planType}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eligibility Status Bar */}
                    <div className={`rounded-xl px-6 py-4 mb-6 flex justify-between items-center text-white shadow-sm ${getStatusColor(selectedPatient.status)}`}>
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                {selectedPatient.status === 'Active' ? <CheckCircle2 size={24} /> :
                                    selectedPatient.status === 'Inactive' ? <AlertCircle size={24} /> : <Clock size={24} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Eligibility Status</h3>
                                <p className="text-white/90 text-sm font-medium">{selectedPatient.statusDetail}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-white/70 uppercase font-bold tracking-wider mb-0.5">Last Checked</p>
                            <p className="font-semibold">{selectedPatient.lastChecked === new Date().toISOString().split('T')[0] ? 'Just now' : selectedPatient.lastChecked}</p>
                        </div>
                    </div>

                    {/* Status Details Grid */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                            <p className={`font-bold ${selectedPatient.status === 'Active' ? 'text-emerald-600' :
                                selectedPatient.status === 'Inactive' ? 'text-rose-600' : 'text-amber-600'
                                }`}>{selectedPatient.status}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Coverage Level</p>
                            <p className="font-bold text-slate-800">{selectedPatient.coverageLevel}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Effective Date</p>
                            <p className="font-bold text-slate-800">{selectedPatient.effectiveDate}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Termination Date</p>
                            <p className="font-bold text-slate-800">{selectedPatient.terminationDate}</p>
                        </div>
                    </div>

                    {/* Benefits Information */}
                    <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-slate-500" />
                        Benefits Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Copay Card */}
                        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                            <div className="flex items-center gap-2 mb-3">
                                <DollarSign size={18} className="text-blue-600" />
                                <h4 className="font-bold text-slate-700 text-sm">Copay</h4>
                            </div>
                            <p className="text-3xl font-bold text-blue-600 mb-1">${selectedPatient.copay}</p>
                            <p className="text-xs text-slate-500">Per office visit</p>
                        </div>

                        {/* Deductible Card */}
                        <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={18} className="text-purple-600" />
                                <h4 className="font-bold text-slate-700 text-sm">Deductible</h4>
                            </div>
                            <p className="text-3xl font-bold text-purple-600 mb-1">
                                ${selectedPatient.deductible.total.toLocaleString()}
                            </p>
                            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                                <span>${selectedPatient.deductible.met.toLocaleString()} met</span>
                            </div>
                            <div className="w-full bg-purple-200 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(selectedPatient.deductible.met / selectedPatient.deductible.total) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Out of Pocket Max Card */}
                    <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck size={18} className="text-emerald-600" />
                            <h4 className="font-bold text-slate-700 text-sm">Out-of-Pocket Maximum</h4>
                        </div>
                        <p className="text-3xl font-bold text-emerald-600 mb-1">
                            ${selectedPatient.oopMax.total.toLocaleString()}
                        </p>
                        <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                            <span>${selectedPatient.oopMax.met.toLocaleString()} met</span>
                        </div>
                        <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${(selectedPatient.oopMax.met / selectedPatient.oopMax.total) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-white rounded-lg border border-slate-100 p-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 last:pb-0">
                            <span className="text-sm text-slate-600">Primary Care Physician Required</span>
                            <span className="text-sm font-semibold text-slate-900">{selectedPatient.pcpRequired}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 pt-3">
                            <span className="text-sm text-slate-600">Prior Authorization Required</span>
                            <span className="text-sm font-semibold text-slate-900">{selectedPatient.priorAuthRequired}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
