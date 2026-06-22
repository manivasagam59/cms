
import { useState } from "react";
import {
    User,
    Calendar,
    Clock,
    Stethoscope,
    Sparkles,
    Search,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const patients = [
    {
        id: '1',
        name: 'Sarah Johnson',
        mrn: 'MRN20263',
        date: '2026-02-19',
        time: '10:30 AM',
        visitType: 'Follow-up Visit',
        provider: 'Dr. Mike Wheeler',
        status: 'Ready',
        soap: {
            subjective: "Patient presents with complaints of persistent lower back pain for the past 2 weeks. Pain is described as dull and aching, radiating down the left leg. Pain worsens with prolonged sitting and improves with rest. Patient denies any recent trauma or injury. No fever, numbness, or weakness reported.",
            objective: `Vital Signs: BP 128/82, HR 76, Temp 98.6°F, RR 16
General: Alert and oriented, no acute distress
Back: Tenderness to palpation in lumbar region (L4-L5), positive straight leg raise on left
Neurological: Normal sensation, 5/5 strength in lower extremities, intact reflexes`,
            assessment: `1. Acute lumbar radiculopathy, left-sided
2. Sciatica
3. Possible herniated disc L4-L5`,
            plan: `1. Start NSAIDs (Ibuprofen 600mg TID)
2. Physical therapy referral
3. MRI lumbar spine if no improvement in 2 weeks
4. Follow up in 2 weeks
5. Patient education on proper posture and body mechanics`
        },
        aiDiagnoses: [
            { code: 'M54.16', desc: 'Radiculopathy, lumbar region', confidence: 98 },
            { code: 'M51.26', desc: 'Other intervertebral disc displacement, lumbar', confidence: 92 },
            { code: 'M54.30', desc: 'Sciatica, unspecified side', confidence: 95 },
        ],
        aiProcedures: [
            { code: '99214', desc: 'Office visit, established patient, moderate complexity', confidence: 96 },
        ]
    },
    {
        id: '2',
        name: 'Michael Chen',
        mrn: 'MRN20264',
        date: '2026-02-19',
        time: '11:15 AM',
        visitType: 'New Patient',
        provider: 'Dr. Mike Wheeler',
        status: 'Sent to Coding',
        soap: {
            subjective: "Patient here for annual checkup.",
            objective: "Vitals stable.",
            assessment: "Healthy adult male.",
            plan: "Wait and see."
        },
        aiDiagnoses: [],
        aiProcedures: []
    },
    {
        id: '3',
        name: 'Emma Roberts',
        mrn: 'MRN20265',
        date: '2026-02-18',
        time: '02:45 PM',
        visitType: 'Annual Checkup',
        provider: 'Dr. Mike Wheeler',
        status: 'Ready',
        soap: {
            subjective: "No complaints.",
            objective: "Looks fine.",
            assessment: "Good.",
            plan: "Come back next year."
        },
        aiDiagnoses: [],
        aiProcedures: []
    }
];

export default function RCMClinicalNotes() {
    const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
    const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Patient List */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col h-full">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Clinical Notes</h2>
                    <p className="text-xs text-slate-500 mt-1">Ready for coding review</p>
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
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${patient.status === 'Sent to Coding'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {patient.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    <span>{patient.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{patient.time}</span>
                                </div>
                            </div>

                            <p className="text-xs font-medium text-slate-700 mb-1">{patient.visitType}</p>
                            <p className="text-xs text-slate-500">{patient.provider}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Main Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">

                {/* Patient Header Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6 flex justify-between items-start relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-xl font-bold text-slate-900 mb-2">{selectedPatient.name}</h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1.5">
                                <User size={16} className="text-slate-400" />
                                <span className="font-mono">{selectedPatient.mrn}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-slate-400" />
                                <span>{selectedPatient.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-slate-400" />
                                <span>{selectedPatient.time}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="text-slate-400">Provider:</span>
                            <span className="font-medium flex items-center gap-1.5">
                                <Stethoscope size={14} className="text-blue-500" />
                                {selectedPatient.provider}
                            </span>
                        </div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-200 border-0">
                        <Sparkles size={16} className="mr-2" />
                        Send to Coding Bot
                    </Button>
                </div>

                {/* SOAP Note Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3">
                        <h2 className="text-white font-bold flex items-center gap-2">
                            SOAP Note
                        </h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <section className="p-6">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Subjective</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-justify">
                                {selectedPatient.soap.subjective}
                            </p>
                        </section>
                        <section className="p-6 bg-slate-50/50">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Objective</h3>
                            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                {selectedPatient.soap.objective}
                            </pre>
                        </section>
                        <section className="p-6">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Assessment</h3>
                            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                {selectedPatient.soap.assessment}
                            </pre>
                        </section>
                        <section className="p-6 bg-slate-50/50">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Plan</h3>
                            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                {selectedPatient.soap.plan}
                            </pre>
                        </section>
                    </div>
                </div>

                {/* AI Extractions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                    {/* Diagnoses */}
                    <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
                        <div className="bg-blue-50/80 px-4 py-3 border-b border-blue-100 flex items-center justify-between">
                            <h3 className="font-bold text-blue-900 flex items-center gap-2">
                                <Sparkles size={16} className="text-blue-600" />
                                AI Extracted Diagnoses
                            </h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {selectedPatient.aiDiagnoses.length > 0 ? selectedPatient.aiDiagnoses.map((dx, idx) => (
                                <div key={idx} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-blue-900 text-sm">{dx.code}</span>
                                        <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full border border-blue-100 shadow-sm">
                                            {dx.confidence}% confidence
                                        </span>
                                    </div>
                                    <p className="text-xs text-blue-700">{dx.desc}</p>
                                </div>
                            )) : (
                                <p className="text-sm text-slate-400 italic p-2">No diagnoses extracted.</p>
                            )}
                        </div>
                    </div>

                    {/* Procedures */}
                    <div className="bg-white rounded-xl border border-emerald-100 shadow-sm overflow-hidden">
                        <div className="bg-emerald-50/80 px-4 py-3 border-b border-emerald-100 flex items-center justify-between">
                            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                                <Sparkles size={16} className="text-emerald-600" />
                                AI Extracted Procedures
                            </h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {selectedPatient.aiProcedures.length > 0 ? selectedPatient.aiProcedures.map((proc, idx) => (
                                <div key={idx} className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-emerald-900 text-sm">{proc.code}</span>
                                        <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                                            {proc.confidence}% confidence
                                        </span>
                                    </div>
                                    <p className="text-xs text-emerald-700">{proc.desc}</p>
                                </div>
                            )) : (
                                <p className="text-sm text-slate-400 italic p-2">No procedures extracted.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
