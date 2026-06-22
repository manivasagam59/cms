import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, AlertCircle, AlertTriangle, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
    id: string;
    title: string;
    icon: any;
    desc: string;
    requiresApproval?: boolean;
    isInterruption?: boolean;
}

export function WorkFlowStages({
    steps,
    stepStatuses,
    expandedId,
    setExpandedId,
    handleApproval,
    handleResolve
}: {
    steps: Step[];
    stepStatuses: Record<string, string>;
    expandedId: string | null;
    setExpandedId: (id: string | null) => void;
    handleApproval: () => void;
    handleResolve: () => void;
}) {
    return (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {steps.map((step) => {
                const status = stepStatuses[step.id];
                const isExpanded = expandedId === step.id;

                let borderColor = "border-slate-200";
                let ringColor = "";
                let iconBg = "bg-slate-50";
                let iconColor = "text-slate-400";

                if (status === 'processing') {
                    borderColor = "border-blue-200";
                    ringColor = "ring-2 ring-blue-50";
                    iconBg = "bg-blue-50";
                    iconColor = "text-blue-500";
                } else if (status === 'completed') {
                    iconBg = "bg-emerald-50";
                    iconColor = "text-emerald-500";
                } else if (status === 'waiting') {
                    borderColor = "border-amber-200";
                    ringColor = "ring-2 ring-amber-50";
                    iconBg = "bg-amber-50";
                    iconColor = "text-amber-500";
                } else if (status === 'error') {
                    borderColor = "border-rose-200";
                    ringColor = "ring-2 ring-rose-50";
                    iconBg = "bg-rose-50";
                    iconColor = "text-rose-500";
                }

                return (
                    <div key={step.id} className={cn(
                        "bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden",
                        borderColor,
                        ringColor
                    )}>
                        <div
                            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                            onClick={() => setExpandedId(isExpanded ? null : step.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-colors", iconBg)}>
                                    <step.icon className={cn("w-6 h-6", iconColor)} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight">{step.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {status === 'processing' && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                        <Loader2 size={12} className="animate-spin" /> Processing
                                    </span>
                                )}
                                {status === 'waiting' && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md uppercase tracking-wider animate-pulse">
                                        <AlertCircle size={12} /> Approval Required
                                    </span>
                                )}
                                {status === 'error' && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md uppercase tracking-wider animate-pulse">
                                        <AlertTriangle size={12} /> Needs Action
                                    </span>
                                )}
                                {status === 'completed' && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                        <CheckCircle2 size={12} /> {step.id === 'insurance' ? 'Verified' : step.id === 'soap' ? 'Generated' : 'Completed'}
                                    </span>
                                )}
                                {isExpanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                            </div>
                        </div>

                        {isExpanded && (
                            <div className="px-5 pb-6 pt-2 border-t border-slate-50 animate-in slide-in-from-top-2 duration-300">
                                {renderStepContent(step, status, handleApproval, handleResolve)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function renderStepContent(step: Step, status: string, handleApproval: () => void, handleResolve: () => void) {
    if (step.id === 'insurance') {
        return (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                    "AI agent verified active coverage for Medicare Part B. Deductible met. No supplemental insurance on file."
                </p>
            </div>
        );
    }

    if (step.id === 'prior_auth') {
        return (
            <div className="mt-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                            <th className="pb-3 px-2">Service/CPT</th>
                            <th className="pb-3 text-center">Status</th>
                            <th className="pb-3 text-center">Auth Number</th>
                            <th className="pb-3 text-right">Doc</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        <tr className="border-b border-slate-50">
                            <td className="py-4 px-2 font-bold text-slate-900">99214 (Office Visit)</td>
                            <td className="py-4 text-center">
                                <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md font-bold text-[10px]">NOT REQUIRED</span>
                            </td>
                            <td className="py-2 text-center text-slate-400">—</td>
                            <td className="py-2 text-right text-slate-400">—</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-2 font-bold text-slate-900">E11.65 (Condition)</td>
                            <td className="py-4 text-center">
                                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md font-bold text-[10px]">APPROVED</span>
                            </td>
                            <td className="py-2 text-center text-slate-600 font-mono">AUTH-2026-99X</td>
                            <td className="py-2 text-right">
                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors">
                                    <FileText size={14} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {status === 'waiting' && (
                    <div className="mt-6 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center text-center space-y-4">
                        <AlertCircle size={32} className="text-amber-500" />
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Provider Sign-off Required</h3>
                            <p className="text-sm text-slate-500 mt-1 max-w-sm">
                                The AI has automated the rule check but requires your validation of the code.
                            </p>
                        </div>
                        <Button onClick={handleApproval} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 h-10 rounded-xl shadow-sm transition-all active:scale-95">
                            Sign Off & Continue Cycle
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    if (step.id === 'soap') {
        return (
            <div className="mt-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>SOAP Generation Status</span>
                    <span className="text-blue-600">{status === 'completed' ? '100% Complete' : 'Processing...'}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                    {/* Fake progress that moves */}
                    <div className={cn("h-full", status === 'completed' ? "bg-blue-500 w-full" : `bg-blue-500 w-[95%] animate-pulse`)}></div>
                </div>
                <p className="text-xs text-slate-600 font-medium">{status === 'completed' ? 'SOAP note generated successfully.' : 'Extracting subjective complaints and objective findings from audio stream...'}</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="mt-4 p-6 bg-rose-50 border border-rose-100 rounded-2xl flex flex-col items-center text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-white border border-rose-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <AlertTriangle size={32} className="text-rose-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-rose-700">Interruption Detected</h3>
                    <p className="text-slate-600 text-sm mt-1 max-w-xs">
                        An issue occurred during <strong>{step.title}</strong> that requires manual intervention.
                    </p>
                </div>
                <Button onClick={handleResolve} variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-100 font-bold px-8 h-11 rounded-xl shadow-sm">
                    Resolve & Resume
                </Button>
            </div>
        );
    }

    if (status === 'waiting') {
        return (
            <div className="mt-6 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center text-center space-y-4">
                <AlertCircle size={32} className="text-amber-500" />
                <div>
                    <h3 className="text-base font-bold text-slate-900">Provider Sign-off Required</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">
                        The AI has completed a draft for <strong>{step.title}</strong> and requires provider sign-off before proceeding.
                    </p>
                </div>
                <Button onClick={handleApproval} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 h-10 rounded-xl shadow-sm transition-all active:scale-95">
                    Sign Off & Continue Cycle
                </Button>
            </div>
        );
    }

    if (status === 'processing') {
        return (
            <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center relative z-10 shadow-sm">
                        <step.icon size={28} className="text-blue-600" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                    <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">{step.desc}</p>
                </div>
                <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-[pulse_2s_ease-in-out_infinite] w-full origin-left"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
            <p className="text-sm text-slate-600 font-medium">
                Step <strong>{step.title}</strong> completed successfully.
            </p>
        </div>
    );
}

