
import { useState } from "react";
import { CheckCircle2, AlertTriangle, FileText, Search, Calendar, Clock } from "lucide-react";

// Mock Data
const patients = [
    {
        id: '1',
        name: 'Sarah Johnson',
        mrn: 'MRN20263',
        date: '2026-02-19',
        time: '10:30 AM',
        status: 'Ready',
        chiefComplaint: "Lower back pain radiating down left leg for 2 weeks",
        documentation: `SUBJECTIVE: Patient presents with complaints of persistent lower back pain for the past 2 weeks. Pain is described as dull and aching, radiating down the left leg. Pain worsens with prolonged sitting and improves with rest.

OBJECTIVE: BP 128/82, HR 76, Temp 98.6°F. Back: Tenderness to palpation in lumbar region (L4-L5), positive straight leg raise on left. Neurological: Normal sensation, 5/5 strength.

ASSESSMENT: 1. Acute lumbar radiculopathy, left-sided. 2. Sciatica. 3. Possible herniated disc L4-L5

PLAN: Start NSAIDs (Ibuprofen 600mg TID), Physical therapy referral, MRI if no improvement in 2 weeks`,
        validationChecks: [
            { id: 1, title: "NCCI Edits", status: "success", message: "No conflicts detected" },
            { id: 2, title: "LCD/NCD Compliance", status: "success", message: "All codes meet coverage criteria" },
            { id: 3, title: "Medical Necessity", status: "success", message: "Documentation supports all codes" },
            { id: 4, title: "Modifier Requirements", status: "warning", message: "Consider modifier -LT for laterality" }
        ]
    },
    {
        id: '2',
        name: 'Michael Chen',
        mrn: 'MRN20264',
        date: '2026-02-19',
        time: '11:15 AM',
        status: 'In Progress',
        chiefComplaint: "Annual Checkup",
        documentation: "Routine physical exam. Vitals normal. No complaints.",
        validationChecks: [
            { id: 1, title: "NCCI Edits", status: "success", message: "No conflicts detected" },
        ]
    },
    {
        id: '3',
        name: 'Emma Roberts',
        mrn: 'MRN20265',
        date: '2026-02-18',
        time: '02:45 PM',
        status: 'Review',
        chiefComplaint: "Sore Throat",
        documentation: "Patient complains of sore throat for 3 days. Swollen lymph nodes.",
        validationChecks: [
            { id: 1, title: "Medical Necessity", status: "warning", message: "Review rapid strep test necessity" },
        ]
    }
];

export default function RCMCoding() {
    const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
    const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Patient List */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col h-full">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Coding Queue</h2>
                    <p className="text-xs text-slate-500 mt-1">Pending coding validation</p>
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search encounters..."
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
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${patient.status === 'Ready'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-amber-100 text-amber-700'
                                    }`}>
                                    {patient.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    <span>{patient.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{patient.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">

                {/* Clinical Note Header */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
                        <FileText className="text-slate-400" size={20} />
                        <h1 className="text-lg font-bold text-slate-900">Clinical Note</h1>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                        <span className="font-semibold text-slate-900">{selectedPatient.name}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono">{selectedPatient.mrn}</span>
                        <span className="text-slate-300">•</span>
                        <span>{selectedPatient.date}</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">Chief Complaint</h3>
                            <p className="text-sm text-slate-600">{selectedPatient.chiefComplaint}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">Clinical Documentation</h3>
                            <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                                {selectedPatient.documentation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Coding Validation Status */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Coding Validation Status</h2>

                    <div className="space-y-4">
                        {selectedPatient.validationChecks.map((check) => (
                            <div
                                key={check.id}
                                className={`p-4 rounded-lg border flex items-start gap-4 ${check.status === 'success'
                                    ? 'bg-emerald-50 border-emerald-100'
                                    : 'bg-amber-50 border-amber-100'
                                    }`}
                            >
                                <div className={`mt-0.5 ${check.status === 'success' ? 'text-emerald-600' : 'text-amber-600'
                                    }`}>
                                    {check.status === 'success' ? (
                                        <CheckCircle2 size={20} />
                                    ) : (
                                        <AlertTriangle size={20} />
                                    )}
                                </div>

                                <div>
                                    <h3 className={`font-semibold text-sm mb-1 ${check.status === 'success' ? 'text-emerald-900' : 'text-amber-900'
                                        }`}>
                                        {check.title}
                                    </h3>
                                    <p className={`text-sm ${check.status === 'success' ? 'text-emerald-700' : 'text-amber-700'
                                        }`}>
                                        {check.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
