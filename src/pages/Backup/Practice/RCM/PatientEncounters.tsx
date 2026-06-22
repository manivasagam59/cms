
import {
    Download,
    Plus,
    FileText,
    Clock,
    AlertCircle,
    CheckCircle2,
    Search,
    Filter,
    Calendar,
    MoreVertical,
    ChevronRight,
    Building2,
    Stethoscope
} from "lucide-react";

// Mock Data matching the reference image
const encounters = [
    {
        id: "VCH-2024-001",
        patientName: "Sarah Jenkins",
        initials: "SJ",
        status: "IN-PROGRESS",
        statusColor: "bg-amber-100 text-amber-700 border-amber-200",
        date: "Oct 24, 2023",
        priority: "High Priority",
        priorityColor: "text-rose-600",
        doctor: "Dr. Aris Thorne",
        location: "Northside General",
        complaint: "Persistent hypertension & chest tightness",
        stage: "CODING",
        step: 2,
        totalSteps: 6,
        progressColor: "bg-blue-600"
    },
    {
        id: "VCH-2024-002",
        patientName: "Michael Chen",
        initials: "MC",
        status: "COMPLETED",
        statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
        date: "Oct 23, 2023",
        priority: "Medium Priority",
        priorityColor: "text-slate-600",
        doctor: "Dr. Sarah Miller",
        location: "Westside Wellness",
        complaint: "Follow-up for Type 2 Diabetes",
        stage: "SUBMISSION",
        step: 3,
        totalSteps: 6,
        progressColor: "bg-blue-600"
    },
    {
        id: "VCH-2024-003",
        patientName: "Emma Rodriguez",
        initials: "ER",
        status: "ALERT",
        statusColor: "bg-rose-100 text-rose-700 border-rose-200",
        date: "Oct 22, 2023",
        priority: "Urgent Priority",
        priorityColor: "text-rose-600",
        doctor: "Dr. James Wilson",
        location: "City Health Center",
        complaint: "Acute bronchitis and fever",
        stage: "DENIAL MANAGEMENT",
        step: 6,
        totalSteps: 6,
        progressColor: "bg-blue-600" // Usually denial might be red but ref shows blue/purple
    },
    {
        id: "VCH-2024-004",
        patientName: "Robert Taylor",
        initials: "RT",
        status: "IN-PROGRESS",
        statusColor: "bg-amber-100 text-amber-700 border-amber-200",
        date: "Oct 22, 2023",
        priority: "Low Priority",
        priorityColor: "text-slate-500",
        doctor: "Dr. Aris Thorne",
        location: "Northside General",
        complaint: "Routine physical examination",
        stage: "ELIGIBILITY VERIFICATION",
        step: 0,
        totalSteps: 6,
        progressColor: "bg-blue-600"
    }
];

const stats = [
    { title: "TOTAL ENCOUNTERS", value: "1,284", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "PENDING CODING", value: "42", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "CLAIM DENIALS", value: "12", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "PAID THIS WEEK", value: "$14.2k", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function RCMPatientEncounters() {
    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200">

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Patient Encounters</h1>
                        <p className="text-slate-500 mt-1">Manage patient vouchers and monitor RCM cycle progress.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
                            <Download size={16} />
                            Export
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors">
                            <Plus size={16} />
                            New Encounter
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters Row */}
                <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search patient, voucher ID, or provider..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors w-full md:w-auto justify-center">
                            <Filter size={16} />
                            Filters
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors w-full md:w-auto justify-center">
                            <Calendar size={16} />
                            Date Range
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-slate-200 border-t-0 shadow-sm rounded-b-xl overflow-hidden mb-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[30%]">Patient / Voucher</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[30%]">Clinical Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[30%]">RCM Cycle Progress</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {encounters.map((encounter) => (
                                <tr key={encounter.id} className="hover:bg-slate-50/50 transition-colors group">
                                    {/* Patient / Voucher Column */}
                                    <td className="px-6 py-5 align-top">
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                {encounter.initials}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-slate-900">{encounter.patientName}</span>
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${encounter.statusColor}`}>
                                                        {encounter.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs font-mono text-blue-500 mb-2">{encounter.id}</div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Calendar size={12} />
                                                    <span>{encounter.date}</span>
                                                    <span className="text-slate-300">•</span>
                                                    <span className={`font-medium ${encounter.priorityColor}`}>{encounter.priority}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Clinical Details Column */}
                                    <td className="px-6 py-5 align-top">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-700">
                                                <Stethoscope size={14} className="text-slate-400" />
                                                <span className="font-medium">{encounter.doctor}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Building2 size={14} className="text-slate-400" />
                                                <span>{encounter.location}</span>
                                            </div>
                                            <div className="bg-slate-50 border border-slate-100 rounded-md px-3 py-2 text-xs text-slate-600 italic mt-2 inline-block max-w-full truncate">
                                                "{encounter.complaint}"
                                            </div>
                                        </div>
                                    </td>

                                    {/* RCM Cycle Progress Column */}
                                    <td className="px-6 py-5 align-middle">
                                        <div className="w-full max-w-xs">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-xs font-bold text-slate-700 uppercase">{encounter.stage}</span>
                                                <span className="text-[10px] text-slate-400">Step {encounter.step} of {encounter.totalSteps}</span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                                {/* E C S A P D - Mocking specific segments */}
                                                {[...Array(encounter.totalSteps)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-full flex-1 border-r border-white last:border-0 ${i < encounter.step ? 'bg-blue-600' : 'bg-slate-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Step Labels (E C S A P D) - Simplified representation */}
                                            <div className="flex justify-between mt-1 px-1">
                                                {['E', 'C', 'S', 'A', 'P', 'D'].map((label, i) => (
                                                    <span key={i} className={`text-[8px] font-bold ${i < encounter.step ? 'text-blue-600' : 'text-slate-300'
                                                        }`}>
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-6 py-5 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                                <ChevronRight size={18} />
                                            </button>
                                            <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
                        <p className="text-sm text-slate-500">Showing 4 of 1,284 encounters</p>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">1</button>
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50">2</button>
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm text-slate-500 hover:bg-slate-50">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
