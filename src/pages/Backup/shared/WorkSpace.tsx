import { useState, useEffect, useRef } from "react";
import {
    Calendar,
    ShieldCheck,
    FileCheck,
    Users,
    Mic,
    FileText,
    Stethoscope,
    CheckSquare,
    Activity,
    CircleDollarSign,
    Search,
    Send,
    Landmark,
    Wallet,
    AlertCircle,
    Receipt,
    Play,
    CheckCircle2,
    Check,
    Loader2,
    AudioWaveform
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WorkFlowStages } from "./WorkFlowStages";

// Define the steps
const WORKFLOW_STEPS = [
    // { id: 'insurance', title: 'Insurance Eligibility', icon: ShieldCheck, desc: 'Verifying patient insurance coverage and benefits.' },
    // { id: 'prior_auth', title: 'Prior Authorization', icon: FileCheck, desc: 'Checking if prior authorization is required for the visit.', requiresApproval: true },
    { id: 'transcription', title: 'Audio Transcription', icon: FileText, desc: 'AI transcribing speech to structured medical text.' },
    { id: 'soap', title: 'SOAP Notes', icon: Stethoscope, desc: 'Generating Subjective, Objective, Assessment, and Plan.' },
    { id: 'chart_fin', title: 'Chart Finalization', icon: CheckSquare, desc: 'Finalizing the medical chart before sending to coding.' },
    { id: 'coding', title: 'Medical Coding', icon: Activity, desc: 'Extracting ICD-10 and CPT codes from the chart.', requiresApproval: true },
    { id: 'charge_entry', title: 'Charge Entry', icon: CircleDollarSign, desc: 'Entering charges for the generated procedural codes.' },
    { id: 'scrubbing', title: 'Claim Scrubbing', icon: Search, desc: 'Checking claim against billing rules to prevent potential denials.' },
    { id: 'submission', title: 'Claim Submission', icon: Send, desc: 'Submitting the clean claim securely to the clearinghouse.' },
    { id: 'adjudication', title: 'Adjudication', icon: Landmark, desc: 'Payer reviews and processes the submitted claim.' },
    { id: 'payment', title: 'Payment Posting', icon: Wallet, desc: 'Receiving Electronic Remittance Advice (ERA) and posting payment.' },
    { id: 'denial', title: 'Denial Management', icon: AlertCircle, desc: 'Handling any claim lines that were denied by the payer.', isInterruption: true },
    { id: 'billing', title: 'Patient Billing', icon: Receipt, desc: 'Sending statement to the patient for any remaining balance.' }
];

type StatusType = 'idle' | 'running' | 'paused' | 'completed';
type StepStatus = 'pending' | 'processing' | 'completed' | 'waiting' | 'error';

export default function WorkSpace() {
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [status, setStatus] = useState<StatusType>('idle');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>(
        WORKFLOW_STEPS.reduce((acc, step) => ({ ...acc, [step.id]: 'pending' }), {})
    );
    const [logs, setLogs] = useState<{ id: string, time: string, message: string, type: 'info' | 'warning' | 'success' | 'error' }[]>([]);

    const stepperRef = useRef<HTMLDivElement>(null);
    const logsEndRef = useRef<HTMLDivElement>(null);
    const mainContentEndRef = useRef<HTMLDivElement>(null);

    const addLog = (message: string, type: 'info' | 'warning' | 'success' | 'error' = 'info') => {
        setLogs(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), time: new Date().toLocaleTimeString(), message, type }]);
    };

    // Auto-scroll stepper
    useEffect(() => {
        if (currentStepIndex >= 0 && stepperRef.current) {
            const stepElement = stepperRef.current.children[currentStepIndex] as HTMLElement;
            if (stepElement) {
                stepElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }, [currentStepIndex]);

    // Auto-scroll logs
    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    // Keep the active step expanded and scroll to bottom
    useEffect(() => {
        if (currentStepIndex >= 0 && currentStepIndex < WORKFLOW_STEPS.length) {
            setExpandedId(WORKFLOW_STEPS[currentStepIndex].id);
        }
    }, [currentStepIndex]);

    useEffect(() => {
        if (mainContentEndRef.current) {
            mainContentEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentStepIndex, expandedId]);

    const startSimulation = () => {
        setLogs([]);
        setStatus('running');
        setCurrentStepIndex(0);
        setStepStatuses(WORKFLOW_STEPS.reduce((acc, step) => ({ ...acc, [step.id]: 'pending' }), {}));
        setTimeout(() => {
            setStepStatuses(prev => ({ ...prev, [WORKFLOW_STEPS[0].id]: 'processing' }));
            addLog('AI Workspace initialized. Beginning end-to-end RCM cycle...', 'info');
            addLog(`Started: ${WORKFLOW_STEPS[0].title}`, 'info');
        }, 500);
    };

    const handleApproval = () => {
        addLog(`User approved ${WORKFLOW_STEPS[currentStepIndex].title}. Resuming process...`, 'success');
        setStepStatuses(prev => ({ ...prev, [WORKFLOW_STEPS[currentStepIndex].id]: 'completed' }));
        setStatus('running');

        // Move to next immediately after approval
        setTimeout(() => {
            if (currentStepIndex < WORKFLOW_STEPS.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
                setStepStatuses(prev => ({ ...prev, [WORKFLOW_STEPS[currentStepIndex + 1].id]: 'processing' }));
                addLog(`Started: ${WORKFLOW_STEPS[currentStepIndex + 1].title}`, 'info');
            } else {
                setStatus('completed');
                addLog('Full RCM cycle completed successfully.', 'success');
            }
        }, 500);
    };

    const handleResolve = () => {
        addLog(`User resolved interruption in ${WORKFLOW_STEPS[currentStepIndex].title}. Continuing...`, 'success');
        setStepStatuses(prev => ({ ...prev, [WORKFLOW_STEPS[currentStepIndex].id]: 'completed' }));
        setStatus('running');

        setTimeout(() => {
            if (currentStepIndex < WORKFLOW_STEPS.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
                setStepStatuses(prev => ({ ...prev, [WORKFLOW_STEPS[currentStepIndex + 1].id]: 'processing' }));
                addLog(`Started: ${WORKFLOW_STEPS[currentStepIndex + 1].title}`, 'info');
            } else {
                setStatus('completed');
                addLog('Full RCM cycle completed successfully.', 'success');
            }
        }, 500);
    };

    useEffect(() => {
        if (status !== 'running' || currentStepIndex < 0) return;

        const step = WORKFLOW_STEPS[currentStepIndex];
        const currentStepStatus = stepStatuses[step.id];

        if (currentStepStatus !== 'processing') return;

        const timer = setTimeout(() => {
            if (step.requiresApproval) {
                setStatus('paused');
                setStepStatuses(prev => ({ ...prev, [step.id]: 'waiting' }));
                addLog(`Approval required for ${step.title}. Pausing execution.`, 'warning');
            } else if (step.isInterruption) {
                setStatus('paused');
                setStepStatuses(prev => ({ ...prev, [step.id]: 'error' }));
                addLog(`Interruption detected at ${step.title}. Manual intervention needed.`, 'error');
            } else {
                setStepStatuses(prev => ({ ...prev, [step.id]: 'completed' }));
                addLog(`Completed: ${step.title}`, 'success');

                if (currentStepIndex < WORKFLOW_STEPS.length - 1) {
                    setCurrentStepIndex(prev => prev + 1);
                    setStepStatuses(prev => ({ ...prev, [WORKFLOW_STEPS[currentStepIndex + 1].id]: 'processing' }));
                    addLog(`Started: ${WORKFLOW_STEPS[currentStepIndex + 1].title}`, 'info');
                } else {
                    setStatus('completed');
                    addLog('Full RCM cycle completed successfully.', 'success');
                }
            }
        }, 2500); // 2.5 seconds per step to allow user to read

        return () => clearTimeout(timer);
    }, [currentStepIndex, status, stepStatuses]);

    const activeStep = currentStepIndex >= 0 ? WORKFLOW_STEPS[currentStepIndex] : null;

    return (
        <div className="flex h-full bg-slate-50 relative rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header / Top Control */}
            <div className="flex flex-col bg-white border-b border-slate-200  z-20 ">
                <div className=" flex gap-3 items-center justify-between shrink-0  px-4 py-3 ">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
                            <AudioWaveform className="text-white w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-md font-bold text-slate-900 tracking-tight">AI Workspace Engine</h1>
                            <p className="text-xs text-slate-500 font-medium">Automated End-to-End RCM Processing</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {status === 'idle' ? (
                            <Button onClick={startSimulation} variant={'outline'} size={'icon-sm'} className="border-blue-500 text-blue-600 hover:bg-blue-50 gap-2 rounded-xl ">
                                <Play size={14} className="fill-current" />
                            </Button>
                        ) : status === 'completed' ? (
                            <Button onClick={startSimulation} variant="outline" size={'icon-sm'} className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 gap-2 rounded-xl ">
                                <CheckCircle2 size={14} />
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl text-sm font-semibold text-slate-700">
                                {status === 'running' ? (
                                    <><Loader2 size={16} className="animate-spin text-blue-600" /></>
                                ) : (
                                    <><AlertCircle size={16} className="text-amber-500" /></>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Workflow Stepper Container */}
                <div
                    ref={stepperRef}
                    className="grow flex flex-col gap-1 overflow-y-auto"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >

                    {WORKFLOW_STEPS.map((step, index) => {
                        const stepStatus = stepStatuses[step.id];
                        const isActive = currentStepIndex === index;

                        let bgColor = "bg-white border-slate-200 text-slate-400";
                        let iconColor = "text-slate-400";
                        if (stepStatus === 'completed') {
                            bgColor = "border-l-4 border-l-emerald-500 text-emerald-600";
                            iconColor = "text-emerald-600";
                        } else if (stepStatus === 'processing') {
                            bgColor = "border-l-4 border-l-blue-500 text-blue-600 ring-4 ring-blue-50";
                            iconColor = "text-blue-600";
                        } else if (stepStatus === 'waiting') {
                            bgColor = "border-l-4 border-l-amber-500 text-amber-600 ring-4 ring-amber-50 animate-pulse";
                            iconColor = "text-amber-600";
                        } else if (stepStatus === 'error') {
                            bgColor = "border-l-4 border-l-rose-500 bg-rose-100 text-rose-600 ring-4 ring-rose-50 animate-pulse";
                            iconColor = "text-rose-600";
                        }

                        return (
                            <div key={step.id} className={cn(" flex items-center px-4 py-2.5 gap-2 border-t border-slate-200 snap-center group  transition-all duration-500", bgColor)}>
                                <div >
                                    {stepStatus === 'completed' ? (
                                        <Check size={18} className="stroke-[3]" />
                                    ) : stepStatus === 'processing' ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <step.icon size={18} className={iconColor} />
                                    )}
                                </div>
                                <div className="text-center  whitespace-normal">
                                    <span className={cn("text-sm text-nowrap font-normal  tracking-wider leading-tight block",
                                        isActive || stepStatus !== 'pending' ? "text-slate-800" : "text-slate-500",
                                        stepStatus === 'waiting' && 'text-amber-600',
                                        stepStatus === 'error' && 'text-rose-600'
                                    )}>
                                        {step.title}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-slate-50/50">

                {/* Active Details Panel */}
                <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {activeStep ? (
                        <>
                            <WorkFlowStages
                                steps={WORKFLOW_STEPS.slice(0, currentStepIndex + 1)}
                                stepStatuses={stepStatuses}
                                expandedId={expandedId}
                                setExpandedId={setExpandedId}
                                handleApproval={handleApproval}
                                handleResolve={handleResolve}
                            />
                            <div ref={mainContentEndRef} className="h-4" />
                        </>
                    ) : status === 'completed' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500 px-6">
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center shadow-sm mb-4 border border-emerald-100">
                                <CheckCircle2 size={48} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Cycle Fully Automated</h2>
                                <p className="text-slate-500 max-w-md mx-auto font-medium">
                                    The AI Workspace successfully processed the clinical audio and drove it fully through the end-to-end RCM cycle.
                                </p>
                            </div>
                            <Button onClick={startSimulation} className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg mt-4 font-bold rounded-2xl h-14 px-10 transition-all active:scale-95">
                                Run New Simulation
                            </Button>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60 px-6">
                            <div className="w-24 h-24 bg-slate-100/50 rounded-3xl flex items-center justify-center border border-slate-200/50">
                                <AudioWaveform size={48} className="text-slate-300" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-400">Ready for Audio Input</h2>
                                <p className="text-slate-400 max-w-sm font-medium">The AI Workspace engine is idle. Start the simulation to begin automated medical processing.</p>
                            </div>
                            <Button onClick={startSimulation} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 font-bold rounded-2xl h-14 px-10 transition-all active:scale-95">
                                Begin Automated Cycle
                            </Button>
                        </div>
                    )}
                </div>

                {/* Automation Logs Panel
                <div className="w-full md:w-80 lg:w-[400px] border-t md:border-t-0 md:border-l border-slate-200 bg-white flex flex-col shrink-0">
                    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between z-10 sticky top-0">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Activity size={16} className="text-blue-600" />
                            System Audit Log
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-600 rounded-md">LIVE</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm">
                        {logs.length === 0 ? (
                            <div className="text-center text-slate-400 py-10 text-xs font-sans">
                                Waiting for system events...
                            </div>
                        ) : (
                            logs.map((log) => (
                                <div key={log.id} className={cn(
                                    "p-3 rounded-lg border flex gap-3 animate-in fade-in slide-in-from-right-4 duration-300",
                                    log.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-900' :
                                        log.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-900' :
                                            log.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' :
                                                'bg-slate-50 border-slate-100 text-slate-700'
                                )}>
                                    <span className="text-[10px] py-1 opacity-50 font-bold shrink-0">{log.time}</span>
                                    <p className="leading-snug break-words flex-1 text-xs">{log.message}</p>
                                </div>
                            ))
                        )}
                        <div ref={logsEndRef} />
                    </div>
                </div> */}

            </div>
        </div >
    );
}
