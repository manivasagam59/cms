import { useState, useEffect, useRef } from 'react';
import {
    Calendar,
    Clock,
    User,
    Stethoscope,
    Search,
    Mic,
    MoreVertical,
    Play,
    Music,
    Square,
    Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

// Mock Data
const appointments = [
    {
        id: 1,
        time: '09:00 AM',
        date: '2026-02-19',
        patient: 'Emma Thompson',
        mrn: 'PT-2024-001',
        type: 'General Checkup',
        provider: 'Dr. Sarah Wilson',
        status: 'Completed',
        soap: {
            subjective: "Patient presents with complaints of persistent lower back pain for the past 2 weeks. Pain is described as dull and aching, radiating down the left leg. Pain worsens with prolonged sitting and improves with rest. Patient denies any recent trauma or injury.",
            objective: "Vital Signs: BP 128/82, HR 76, Temp 98.6°F, RR 16\nGeneral: Alert and oriented, no acute distress\nBack: Tenderness to palpation in lumbar region (L4-L5), positive straight leg raise on left\nNeurological: Normal sensation, 5/5 strength in lower extremities",
            assessment: "1. Acute lumbar radiculopathy, left-sided\n2. Sciatica\n3. Possible herniated disc L4-L5",
            plan: "1. Start NSAIDs (Ibuprofen 600mg TID)\n2. Physical therapy referral\n3. MRI lumbar spine if no improvement in 2 weeks\n4. Follow up in 2 weeks"
        }
    },
    {
        id: 2,
        time: '10:30 AM',
        date: '2026-02-19',
        patient: 'James Rodriguez',
        mrn: 'PT-2024-045',
        type: 'Orthopedic Consult',
        provider: 'Dr. Sarah Wilson',
        status: 'Pending',
        recordings: [
            { id: 1, title: 'Bruce Wayne Speech', desc: 'Every day, Gotham gets a little darker, a little more chaotic. And I know what you\'re thinking', duration: '2:45' },
            { id: 2, title: 'Joker Speech', desc: 'Why keep fighting a losing battle? But the truth is, this city isn\'t just buildings and streets; it\'s the people.', duration: '1:30' },
            { id: 3, title: 'Alfred Speech', desc: 'Every child who dreams of a brighter future, every family struggling to make ends meet, they are Gotham.', duration: '1:10' }
        ]
    },
    {
        id: 3,
        time: '11:15 AM',
        date: '2026-02-19',
        patient: 'Sophie Chen',
        mrn: 'PT-2024-089',
        type: 'Pediatric Visit',
        provider: 'Dr. Sarah Wilson',
        status: 'Scheduled',
        recordings: []
    }
];

export default function ProviderAppointments() {
    const [selectedId, setSelectedId] = useState(appointments[0].id);
    const selectedAppointment = appointments.find(a => a.id === selectedId) || appointments[0];

    // Recording state
    const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused'>('idle');
    const [recordingTime, setRecordingTime] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        let interval: any;
        if (recordingState === 'recording') {
            interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [recordingState]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleMicClick = () => {
        if (recordingState === 'idle') setRecordingState('recording');
        else if (recordingState === 'recording') setRecordingState('paused');
        else if (recordingState === 'paused') setRecordingState('recording');
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            if (recordingState === 'recording') {
                time += 0.05;
                // Draw rings that randomly fluctuate based on sine waves to emulate audio
                for (let i = 0; i < 4; i++) {
                    const baseRadius = 80 + i * 15;
                    const fluctuate = Math.sin(time * (1 + i * 0.2)) * 10 + Math.cos(time * 0.8 + i) * 5;
                    const radius = baseRadius + Math.max(0, fluctuate);

                    ctx.beginPath();
                    ctx.arc(centerX, centerY, Math.max(0, radius), 0, 2 * Math.PI);
                    ctx.strokeStyle = `rgba(255, 75, 118, ${0.5 - i * 0.1})`; // #7367F0 
                    ctx.lineWidth = 6;
                    ctx.stroke();
                }
            } else {
                // Static rings for idle or paused
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, 85 + i * 20, 0, 2 * Math.PI);
                    ctx.strokeStyle = '#f1f5f9'; // slate-100
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }

            animationId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationId);
    }, [recordingState]);

    // Reset recording when changing patients
    useEffect(() => {
        setRecordingState('idle');
        setRecordingTime(0);
    }, [selectedId]);

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden relative rounded-2xl border border-slate-100 shadow-sm">
            {/* Left Sidebar - Internal Appointments List */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Appointments</h2>
                    <p className="text-xs text-slate-500 mt-1">Today's Schedule</p>
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {appointments.map(apt => (
                        <div
                            key={apt.id}
                            onClick={() => setSelectedId(apt.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedId === apt.id
                                ? 'bg-blue-50 border-blue-200 shadow-sm'
                                : 'bg-white border-slate-100 hover:border-blue-100 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className={`font-semibold ${selectedId === apt.id ? 'text-blue-900' : 'text-slate-900'}`}>
                                        {apt.patient}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {apt.mrn}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${apt.status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {apt.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{apt.time}</span>
                                </div>
                            </div>

                            <p className="text-xs font-medium text-slate-700 mb-1">{apt.type}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 bg-white">

                {/* Header Information for the selected appointment */}
                <div className=" flex justify-between items-start sticky top-0 p-4 bg-white z-10">
                    <div className="relative z-10">
                        <h1 className="text-xl font-bold text-slate-900 mb-2">{selectedAppointment.patient}</h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <User size={16} className="text-slate-400" />
                                <span className="font-mono">{selectedAppointment.mrn}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-slate-400" />
                                <span>{selectedAppointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-slate-400" />
                                <span>{selectedAppointment.date}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {selectedAppointment.status === 'Completed' ? (
                    /* SOAP Note Layout */
                    <div className='px-4 pb-4'>
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3">
                                <h2 className="text-white font-bold flex items-center gap-2">
                                    Generated SOAP Note
                                </h2>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <section className="p-6">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Subjective</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed text-justify">
                                        {selectedAppointment.soap?.subjective}
                                    </p>
                                </section>
                                <section className="p-6 bg-slate-50/50">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Objective</h3>
                                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                        {selectedAppointment.soap?.objective}
                                    </pre>
                                </section>
                                <section className="p-6">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Assessment</h3>
                                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                        {selectedAppointment.soap?.assessment}
                                    </pre>
                                </section>
                                <section className="p-6 bg-slate-50/50">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Plan</h3>
                                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                        {selectedAppointment.soap?.plan}
                                    </pre>
                                </section>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Referenced Recording UI Layout */
                    <div className="flex h-[600px] p-4  overflow-hidden">


                        {/* Microphone Main Area */}
                        <div className="flex-1  flex flex-col items-center justify-center relative shadow-[-4px_0_20px_-10px_rgba(0,0,0,0.05)] z-10">
                            {/* Microphone Animation Container */}
                            <div className="relative flex flex-col items-center justify-center mb-8">
                                <div className="relative flex items-center justify-center w-[300px] h-[300px]">
                                    {/* Canvas for Audio Wave */}
                                    <canvas
                                        ref={canvasRef}
                                        width={300}
                                        height={300}
                                        className="absolute inset-0 z-0 pointer-events-none"
                                    />

                                    <button
                                        onClick={handleMicClick}
                                        className={cn(
                                            "relative w-40 h-40 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-lg cursor-pointer",
                                            recordingState === 'recording' ? "bg-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.4)] scale-105" :
                                                recordingState === 'paused' ? "bg-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)]" :
                                                    "bg-[#7367F0] shadow-[0_0_40px_rgba(115,103,240,0.4)] hover:scale-105"
                                        )}
                                    >
                                        {recordingState === 'recording' && (
                                            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" style={{ animationDuration: '2s' }}></div>
                                        )}
                                        {recordingState === 'recording' ? (
                                            <Pause size={54} className="text-white fill-white" />
                                        ) : (
                                            <Mic size={54} className="text-white" />
                                        )}
                                    </button>
                                </div>

                                {/* Timer and Status */}
                                <div className="mt-6 flex flex-col items-center w-full min-h-[60px]">
                                    <div className="text-3xl font-light text-slate-700 tracking-wider mb-2 font-mono">
                                        {formatTime(recordingTime)}
                                    </div>
                                    <div className="text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                                        {recordingState === 'recording' && (
                                            <><span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span><span className="text-rose-500">Recording</span></>
                                        )}
                                        {recordingState === 'paused' && (
                                            <><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span className="text-amber-500">Paused</span></>
                                        )}
                                        {recordingState === 'idle' && (
                                            <span className="text-slate-400">Ready to Record</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                {recordingState !== 'idle' && (
                                    <button
                                        onClick={() => { setRecordingState('idle'); setRecordingTime(0); navigate('/workspace') }}
                                        className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-rose-50 text-rose-600 rounded-xl font-bold text-[14px] transition-colors shadow-sm cursor-pointer"
                                    >
                                        <Square size={18} className="fill-current" />
                                        Stop & Save
                                    </button>
                                )}
                                <button className="flex items-center gap-2 px-8 py-3.5 bg-white border border-[#D1D5DB] hover:border-[#7367F0] rounded-xl text-[#7367F0] font-bold text-[14px] shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                    <Music size={18} className="text-[#6366F1] group-hover:scale-110 transition-transform" />
                                    Upload File
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
