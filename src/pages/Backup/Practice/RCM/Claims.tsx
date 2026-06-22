
import { useState } from "react";
import {
    Search,
    FileText,
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    Download,
    Send,
    Printer,
    Edit,
    Calendar,
    User,
    Building2,
    CreditCard,
    DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const claims = [
    {
        id: "CLM-2026-001234",
        patient: "Sarah Johnson",
        mrn: "MRN20263",
        dos: "2026-02-19",
        insurance: "Blue Cross Blue Shield",
        amount: 175.00,
        status: "Accepted",
        provider: "Dr. Mike Wheeler",
        diagnosis: ["M54.16 - Radiculopathy, lumbar region"],
        services: [
            { cpt: "99214", desc: "Office visit, est patient", mod: "", diag: "M54.16", charges: 175.00, units: 1 }
        ]
    },
    {
        id: "CLM-2026-001235",
        patient: "Michael Chen",
        mrn: "MRN20264",
        dos: "2026-02-18",
        insurance: "UnitedHealthcare",
        amount: 285.00,
        status: "Pending",
        provider: "Dr. Sarah Miller",
        diagnosis: ["E11.9 - Type 2 diabetes w/o complications"],
        services: [
            { cpt: "99213", desc: "Office visit, est patient", mod: "", diag: "E11.9", charges: 135.00, units: 1 },
            { cpt: "83036", desc: "Hemoglobin A1c", mod: "", diag: "E11.9", charges: 150.00, units: 1 }
        ]
    },
    {
        id: "CLM-2026-001236",
        patient: "Emma Roberts",
        mrn: "MRN20265",
        dos: "2026-02-17",
        insurance: "Aetna",
        amount: 450.00,
        status: "Rejected",
        provider: "Dr. James Wilson",
        diagnosis: ["J02.9 - Acute pharyngitis, unspecified"],
        services: [
            { cpt: "99203", desc: "Office visit, new patient", mod: "", diag: "J02.9", charges: 450.00, units: 1 }
        ]
    },
    {
        id: "CLM-2026-001237",
        patient: "David Kim",
        mrn: "MRN20266",
        dos: "2026-02-16",
        insurance: "Cigna",
        amount: 325.00,
        status: "Scrubbed",
        provider: "Dr. Aris Thorne",
        diagnosis: ["R05 - Cough"],
        services: [
            { cpt: "99214", desc: "Office visit, est patient", mod: "", diag: "R05", charges: 325.00, units: 1 }
        ]
    }
];

const stats = [
    { label: "Total Claims", value: 4, icon: FileText, color: "bg-blue-50 text-blue-600" },
    { label: "Accepted", value: 1, icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
    { label: "Pending", value: 1, icon: Clock, color: "bg-amber-50 text-amber-600" },
    { label: "Rejected", value: 1, icon: XCircle, color: "bg-rose-50 text-rose-600" }
];

export default function RCMClaims() {
    const [selectedClaimId, setSelectedClaimId] = useState(claims[0].id);
    const [filterStatus, setFilterStatus] = useState("All");

    const selectedClaim = claims.find(c => c.id === selectedClaimId) || claims[0];

    const filteredClaims = filterStatus === "All"
        ? claims
        : claims.filter(c => c.status === filterStatus);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Accepted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'Scrubbed': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Claims List */}
            <div className="w-96 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Claims Queue</h2>

                    {/* Status Tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
                        {['All', 'Scrubbed', 'Pending', 'Accepted', 'Rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === status
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                            placeholder="Search claims..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {filteredClaims.map(claim => (
                        <div
                            key={claim.id}
                            onClick={() => setSelectedClaimId(claim.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedClaimId === claim.id
                                    ? 'bg-purple-50 border-purple-200 shadow-sm'
                                    : 'bg-white border-slate-100 hover:border-purple-100 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-xs font-bold text-slate-500">{claim.id}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(claim.status)}`}>
                                    {claim.status}
                                </span>
                            </div>

                            <h3 className={`font-semibold text-sm mb-1 ${selectedClaimId === claim.id ? 'text-purple-900' : 'text-slate-900'}`}>
                                {claim.patient}
                            </h3>

                            <div className="flex justify-between items-end mt-2">
                                <div className="text-xs text-slate-500">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <Calendar size={12} />
                                        <span>{claim.dos}</span>
                                    </div>
                                    <div className="font-medium text-slate-600 truncate w-32">{claim.insurance}</div>
                                </div>
                                <div className={`font-bold font-mono ${selectedClaimId === claim.id ? 'text-purple-700' : 'text-slate-900'}`}>
                                    ${claim.amount.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content - Preview Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Top Stats & Actions */}
                <div className="bg-white border-b border-slate-200 p-6 shadow-sm shrink-0">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Claims Management</h1>
                            <p className="text-sm text-slate-500">Track and manage insurance claims</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Printer size={16} className="mr-2" /> Print
                            </Button>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                                <Send size={16} className="mr-2" /> Submit to Clearinghouse
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                </div>
                                <div className={`p-2 rounded-lg ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CMS-1500 Form Preview */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200 bg-slate-100/50">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg border border-slate-200 rounded-none print:shadow-none print:border-0 min-h-[800px] relative">
                        {/* Red Header Bar mimicking CMS-1500 */}
                        <div className="h-4 bg-rose-700 w-full mb-6"></div>

                        <div className="p-8 pt-0">
                            <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                                <h2 className="text-2xl font-bold text-slate-900">HEALTH INSURANCE CLAIM FORM</h2>
                                <span className="font-mono text-xs text-slate-400">CMS-1500 (02-12)</span>
                            </div>

                            {/* Section 1: Patient & Insured */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold bg-slate-100 p-1 mb-4 border border-slate-300">PATIENT AND INSURED INFORMATION</h3>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">1. Type of Insurance</label>
                                        <div className="font-mono text-sm border-b border-slate-300 pb-1">{selectedClaim.insurance}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">1a. Insured's ID Number</label>
                                        <div className="font-mono text-sm border-b border-slate-300 pb-1">{selectedClaim.mrn}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">2. Patient's Name</label>
                                        <div className="font-mono text-sm border-b border-slate-300 pb-1">{selectedClaim.patient}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">3. Patient's Birth Date & Sex</label>
                                        <div className="font-mono text-sm border-b border-slate-300 pb-1">1985-03-15 &nbsp; [X] M &nbsp; [ ] F</div>
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">5. Patient's Address</label>
                                        <div className="font-mono text-sm border-b border-slate-300 pb-1">123 Main St, Springfield, IL 62704</div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Physician/Supplier */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold bg-slate-100 p-1 mb-4 border border-slate-300">PHYSICIAN OR SUPPLIER INFORMATION</h3>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">14. Date of Current Illness/Injury</label>
                                        <div className="font-mono text-sm border-b border-slate-300 pb-1">{selectedClaim.dos}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">17. Name of Referring Provider</label>
                                        <div className="font-mono text-sm border-b border-slate-300 pb-1">{selectedClaim.provider}</div>
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">21. Diagnosis or Nature of Illness or Injury</label>
                                        <div className="space-y-1 mt-1">
                                            {selectedClaim.diagnosis.map((dx, i) => (
                                                <div key={i} className="font-mono text-sm border-b border-slate-300 pb-1 flex gap-2">
                                                    <span className="font-bold w-6">{String.fromCharCode(65 + i)}.</span>
                                                    {dx}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Service Lines Table */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold bg-slate-100 p-1 mb-0 border border-slate-300 border-b-0">24. SERVICE LINES</h3>
                                <table className="w-full border-collapse border border-slate-300 text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 text-xs text-slate-600">
                                            <th className="border border-slate-300 p-2 text-left font-bold w-24">Date(s) of Service</th>
                                            <th className="border border-slate-300 p-2 text-left font-bold">Place</th>
                                            <th className="border border-slate-300 p-2 text-left font-bold">CPT/HCPCS</th>
                                            <th className="border border-slate-300 p-2 text-left font-bold w-12">Mod</th>
                                            <th className="border border-slate-300 p-2 text-left font-bold w-12">Dx Ptr</th>
                                            <th className="border border-slate-300 p-2 text-right font-bold w-24">$ Charges</th>
                                            <th className="border border-slate-300 p-2 text-center font-bold w-16">Days/Units</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedClaim.services.map((svc, idx) => (
                                            <tr key={idx} className="font-mono">
                                                <td className="border border-slate-300 p-2">{selectedClaim.dos}</td>
                                                <td className="border border-slate-300 p-2">11</td>
                                                <td className="border border-slate-300 p-2">
                                                    {svc.cpt}
                                                    <div className="text-[10px] text-slate-400 font-sans truncate max-w-[150px]">{svc.desc}</div>
                                                </td>
                                                <td className="border border-slate-300 p-2">{svc.mod}</td>
                                                <td className="border border-slate-300 p-2">{String.fromCharCode(65 + idx)}</td>
                                                <td className="border border-slate-300 p-2 text-right">{svc.charges.toFixed(2)}</td>
                                                <td className="border border-slate-300 p-2 text-center">{svc.units}</td>
                                            </tr>
                                        ))}
                                        {/* Empty rows filler */}
                                        {[...Array(Math.max(0, 4 - selectedClaim.services.length))].map((_, i) => (
                                            <tr key={`empty-${i}`} className="h-12">
                                                <td className="border border-slate-300 p-2"></td>
                                                <td className="border border-slate-300 p-2"></td>
                                                <td className="border border-slate-300 p-2"></td>
                                                <td className="border border-slate-300 p-2"></td>
                                                <td className="border border-slate-300 p-2"></td>
                                                <td className="border border-slate-300 p-2"></td>
                                                <td className="border border-slate-300 p-2"></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5} className="border border-slate-300 p-2 text-right font-bold text-xs uppercase bg-slate-50">28. Total Charge</td>
                                            <td className="border border-slate-300 p-2 text-right font-bold font-mono text-slate-900 bg-yellow-50">
                                                ${selectedClaim.amount.toFixed(2)}
                                            </td>
                                            <td className="border border-slate-300 p-2"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Section 4: Signature */}
                            <div className="grid grid-cols-2 gap-8 mt-12">
                                <div className="border border-slate-300 p-4 h-24 relative">
                                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-8">31. Signature of Physician or Supplier</p>
                                    <p className="font-handwriting text-xl text-blue-900 absolute bottom-4 left-4 font-serif italic">
                                        Signed electronically by {selectedClaim.provider}
                                    </p>
                                    <p className="text-xs font-mono absolute bottom-2 right-2">{new Date().toISOString().split('T')[0]}</p>
                                </div>
                                <div className="border border-slate-300 p-4 h-24 relative bg-slate-50 flex flex-col justify-end">
                                    <p className="text-[10px] text-slate-400 text-center">
                                        Federal Tax ID Number: 12-3456789
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
