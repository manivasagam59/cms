
import { useState } from "react";
import {
    Search,
    AlertCircle,
    TrendingUp,
    DollarSign,
    RefreshCw,
    XCircle,
    CheckCircle2,
    History,
    FileEdit,
    Send
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for Denials
const denials = [
    {
        id: "DNL-2026-001",
        claimId: "CLM-2026-001236",
        patient: "Emma Roberts",
        mrn: "MRN20265",
        dos: "2026-02-17",
        insurance: "Aetna",
        amount: 450.00,
        denialDate: "2026-02-25",
        code: "CO-16",
        reason: "Claim/service lacks information or has submission/billing error(s)",
        status: "New", // New, In Appeal, Resolved
        aiAnalysis: "Missing NPI for referring provider. Dr. Wilson's NPI was left blank in field 17b.",
        probabilityOfSuccess: 95,
        history: [
            { date: "2026-02-25", action: "Claim Denied", user: "Payer System" }
        ]
    },
    {
        id: "DNL-2026-002",
        claimId: "CLM-2026-001198",
        patient: "James Carter",
        mrn: "MRN20112",
        dos: "2026-01-10",
        insurance: "Medicare",
        amount: 1250.00,
        denialDate: "2026-02-20",
        code: "PR-50",
        reason: "These are non-covered services because this is not deemed a 'medical necessity' by the payer",
        status: "In Appeal",
        aiAnalysis: "Diagnosis code does not support medical necessity for MRI. Recommended adding secondary diagnosis for chronic pain.",
        probabilityOfSuccess: 60,
        history: [
            { date: "2026-02-20", action: "Claim Denied", user: "Payer System" },
            { date: "2026-02-22", action: "Appeal Letter Generated", user: "System (AI)" },
            { date: "2026-02-23", action: "Appeal Submitted", user: "Jane Doe" }
        ]
    },
    {
        id: "DNL-2026-003",
        claimId: "CLM-2026-001050",
        patient: "Linda Wu",
        mrn: "MRN20888",
        dos: "2026-01-05",
        insurance: "Cigna",
        amount: 85.00,
        denialDate: "2026-02-15",
        code: "CO-29",
        reason: "The time limit for filing has expired",
        status: "Write-off",
        aiAnalysis: "Claim submitted 95 days after DOS. Payer limit is 90 days. Low chance of appeal success unless proof of timely filing exists.",
        probabilityOfSuccess: 10,
        history: [
            { date: "2026-02-15", action: "Claim Denied", user: "Payer System" },
            { date: "2026-02-18", action: "Reviewed", user: "Mike Smith" },
            { date: "2026-02-18", action: "Marked for Write-off", user: "Mike Smith" }
        ]
    }
];

const stats = [
    { label: "Total Active Denials", value: "24", icon: AlertCircle, color: "text-rose-600 bg-rose-50" },
    { label: "Win Rate", value: "68%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { label: "At Risk Amount", value: "$14.2k", icon: DollarSign, color: "text-amber-600 bg-amber-50" },
];

export default function RCMDenials() {
    const [selectedDenialId, setSelectedDenialId] = useState(denials[0].id);
    const [filterStatus, setFilterStatus] = useState("All");

    const selectedDenial = denials.find(d => d.id === selectedDenialId) || denials[0];

    // Filter logic
    const filteredDenials = filterStatus === "All"
        ? denials
        : denials.filter(d => {
            if (filterStatus === "Active") return d.status === "New" || d.status === "In Appeal";
            return d.status === filterStatus;
        });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'New': return <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full border border-rose-200">Action Required</span>;
            case 'In Appeal': return <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-200">Appealed</span>;
            case 'Resolved': return <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200">Paid</span>;
            case 'Write-off': return <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full border border-slate-200">Write-off</span>;
            default: return null;
        }
    };

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Denials Queue */}
            <div className="w-96 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Denial Management</h2>
                    <p className="text-xs text-slate-500 mb-4">Resolve and appeal rejected claims</p>

                    <div className="flex gap-2 mb-4">
                        {['All', 'Active', 'Write-off'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors border ${filterStatus === status
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by Claim ID, Patient..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {filteredDenials.map(denial => (
                        <div
                            key={denial.id}
                            onClick={() => setSelectedDenialId(denial.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedDenialId === denial.id
                                ? 'bg-rose-50 border-rose-200 shadow-sm'
                                : 'bg-white border-slate-100 hover:border-rose-100 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-xs font-bold text-slate-500">{denial.claimId}</span>
                                {getStatusBadge(denial.status)}
                            </div>

                            <h3 className={`font-semibold text-sm mb-1 ${selectedDenialId === denial.id ? 'text-rose-900' : 'text-slate-900'}`}>
                                {denial.patient}
                            </h3>

                            <p className="text-xs text-rose-600 font-medium truncate mb-2" title={denial.code + ": " + denial.reason}>
                                {denial.code}: {denial.reason}
                            </p>

                            <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-2">
                                <span>{denial.insurance}</span>
                                <span className="font-bold text-slate-900">${denial.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Stats Header */}
                <div className="grid grid-cols-3 gap-4 p-6 pb-2 shrink-0">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Denial Details */}
                <div className="flex-1 overflow-y-auto p-6 pt-4 scrollbar-thin scrollbar-thumb-slate-200">

                    {/* Header Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-xl font-bold text-slate-900">Denial Details</h1>
                                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-mono">{selectedDenial.id}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span>Patient: <strong className="text-slate-900">{selectedDenial.patient}</strong></span>
                                    <span>•</span>
                                    <span>DOB: 1985-03-15</span>
                                    <span>•</span>
                                    <span>Claim: <strong className="text-slate-900">{selectedDenial.claimId}</strong></span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Denied Amount</p>
                                <p className="text-2xl font-bold text-rose-600">${selectedDenial.amount.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Denial Reason Alert */}
                        <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 mb-6 flex gap-4">
                            <XCircle className="text-rose-600 shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-rose-800 text-sm mb-1">
                                    {selectedDenial.code}: {selectedDenial.reason}
                                </h3>
                                <p className="text-sm text-rose-700">
                                    Denied on {selectedDenial.denialDate}. The payer indicates that required information is missing or incorrect.
                                </p>
                            </div>
                        </div>

                        {/* AI Root Cause Analysis */}
                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex gap-4 mb-6">
                            <div className="mt-0.5 p-1 bg-indigo-100 rounded-lg text-indigo-600 shrink-0 h-fit">
                                <RefreshCw size={18} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-indigo-900 text-sm">AI Root Cause Analysis</h3>
                                    <span className="text-xs font-medium text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                                        {selectedDenial.probabilityOfSuccess}% Success Probability
                                    </span>
                                </div>
                                <p className="text-sm text-indigo-800 mb-3 leading-relaxed">
                                    {selectedDenial.aiAnalysis}
                                </p>
                                <div className="flex gap-2">
                                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 h-8 text-xs">
                                        <FileEdit size={14} className="mr-2" />
                                        Auto-Correct Claim
                                    </Button>
                                    <Button size="sm" variant="outline" className="bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 h-8 text-xs">
                                        Generate Appeal Letter
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Action Timeline */}
                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                                <History size={16} className="text-slate-400" />
                                Activity History
                            </h3>
                            <div className="space-y-4">
                                {selectedDenial.history.map((events, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {/* Activity Line */}
                                        {i !== selectedDenial.history.length - 1 && (
                                            <div className="absolute left-[19px] top-6 bottom-[-22px] w-0.5 bg-slate-100"></div>
                                        )}

                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${i === 0 ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50 border-slate-100 text-slate-400'
                                            }`}>
                                            {i === 0 ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{events.action}</p>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                <span>{events.date}</span>
                                                <span>•</span>
                                                <span>{events.user}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action Bar */}
                <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center shrink-0">
                    <Button variant="ghost" className="text-slate-500 hover:text-slate-700">
                        View Original Claim
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50">
                            Write-off Balance
                        </Button>
                        <Button className="bg-gradient-to-r from-rose-600 to-orange-600 text-white hover:from-rose-700 hover:to-orange-700 border-0 shadow-sm">
                            <Send size={16} className="mr-2" />
                            Submit Appeal
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
