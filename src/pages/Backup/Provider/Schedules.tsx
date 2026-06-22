import { ChevronLeft, ChevronRight, Plus, ShieldCheck, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const days = [
    { name: 'SUN', date: '16' },
    { name: 'MON', date: '17' },
    { name: 'TUE', date: '18' },
    { name: 'WED', date: '19' },
    { name: 'THU', date: '20' },
    { name: 'FRI', date: '21' },
    { name: 'SAT', date: '22' }
];

const hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00'];

const events = [
    { dayIndex: 1, top: 0 * 80, height: 1 * 80, title: 'M. Garcia', subtitle: 'Follow-up', color: 'blue' },
    { dayIndex: 1, top: 1 * 80, height: 1 * 80, title: 'J. Smith', subtitle: 'New Patient', color: 'green', selected: true },
    { dayIndex: 2, top: 2 * 80, height: 1 * 80, title: 'E. Chen', subtitle: 'Annual', color: 'purple' },
    { dayIndex: 2, top: 5 * 80, height: 1 * 80, title: 'K. Martin', subtitle: 'Follow-up', color: 'blue' },
    { dayIndex: 3, top: 0 * 80, height: 1 * 80, title: 'R. Lee', subtitle: 'Consult', color: 'orange' },
    { dayIndex: 3, top: 3 * 80, height: 1 * 80, title: 'S. Davis', subtitle: 'Follow-up', color: 'blue' },
    { dayIndex: 4, top: 1 * 80, height: 1 * 80, title: 'M. Brown', subtitle: 'Procedure', color: 'purple' },
    { dayIndex: 5, top: 2 * 80, height: 1 * 80, title: 'L. Anderson', subtitle: 'Check-up', color: 'green' },
    { dayIndex: 0, top: 4 * 80, height: 1 * 80, title: 'T. Harris', subtitle: 'Urgent', color: 'orange' },
];

export default function ProviderSchedules() {
    return (
        <div className="flex flex-col h-full bg-slate-50/50">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between py-4 px-2 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
                            <ChevronLeft size={18} className="text-slate-600" />
                        </button>
                        <div className="font-bold text-slate-800 px-3 text-[15px]">
                            February 16 – 22, 2026
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
                            <ChevronRight size={18} className="text-slate-600" />
                        </button>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2A3F6C] rounded-lg hover:bg-[#1f2f51] transition-colors shadow-sm cursor-pointer">
                        <Plus size={16} />
                        New
                    </button>
                </div>

                <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shadow-sm">
                    <button className="px-4 py-1.5 text-sm font-medium text-slate-500 rounded-md hover:text-slate-700 cursor-pointer">Day</button>
                    <button className="px-4 py-1.5 text-sm font-bold text-slate-800 bg-white rounded-md shadow-xs cursor-pointer">Week</button>
                    <button className="px-4 py-1.5 text-sm font-medium text-slate-500 rounded-md hover:text-slate-700 cursor-pointer">Month</button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden gap-6 pb-2 shrink-0 h-full">
                {/* Calendar Area */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
                    <div className="flex border-b border-slate-100 bg-white shrink-0">
                        <div className="w-16 shrink-0 border-r border-slate-100"></div>
                        <div className="flex-1 grid grid-cols-7 divide-x divide-slate-100">
                            {days.map((d, i) => (
                                <div key={i} className="py-4 text-center">
                                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{d.name}</div>
                                    <div className="text-lg font-bold text-slate-800 block m-auto">{d.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-1 overflow-y-auto bg-white relative">
                        {/* Times Column */}
                        <div className="w-16 shrink-0 border-r border-slate-100 bg-white relative z-10">
                            {hours.map((time, i) => (
                                <div key={i} className="h-[80px] border-b border-slate-100 pr-3 pt-2.5 text-right">
                                    <span className="text-[11px] text-slate-400 font-medium">{time}</span>
                                </div>
                            ))}
                        </div>

                        {/* Days Columns Grid */}
                        <div className="flex-1 grid grid-cols-7 relative">
                            {/* Grid Lines */}
                            {days.map((_, dayIndex) => (
                                <div key={dayIndex} className="col-span-1 border-r border-slate-100 last:border-r-0">
                                    {hours.map((_, hourIndex) => (
                                        <div key={hourIndex} className="h-[80px] border-b border-slate-100"></div>
                                    ))}
                                </div>
                            ))}

                            {/* Overlay Events Container */}
                            <div className="absolute inset-0 pointer-events-none">
                                {events.map((ev, i) => {
                                    const colorConfig = {
                                        orange: 'bg-[#FFF3CD] text-[#856404] border-l-[#FFC107]',
                                        blue: 'bg-[#E3F2FD] text-[#0D47A1] border-l-[#64B5F6]',
                                        green: 'bg-[#E8F5E9] text-[#1B5E20] border-l-[#4CAF50]',
                                        purple: 'bg-[#F3E5F5] text-[#4A148C] border-l-[#CE93D8]',
                                    }[ev.color as string];

                                    let boxClasses = cn(
                                        `absolute p-2 mx-1 mt-1 rounded border-l-4 overflow-hidden flex flex-col pointer-events-auto shadow-xs transition-shadow cursor-pointer hover:shadow-sm`,
                                        colorConfig
                                    );

                                    if (ev.selected) {
                                        boxClasses = cn(boxClasses, 'outline outline-2 outline-slate-800 -outline-offset-1 z-10 shadow-sm');
                                    }

                                    return (
                                        <div
                                            key={i}
                                            className={boxClasses}
                                            style={{
                                                left: `calc(100% / 7 * ${ev.dayIndex})`,
                                                width: `calc(100% / 7 - 8px)`,
                                                top: `${ev.top}px`,
                                                height: `${ev.height - 4}px`,
                                            }}
                                        >
                                            <div className="text-[11px] font-bold leading-tight truncate">{ev.title}</div>
                                            <div className="text-[10px] opacity-80 leading-tight mt-0.5 truncate">{ev.subtitle}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Details Sidebar */}
                <div className="w-[320px] h-full bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col shrink-0 overflow-y-auto">
                    <div className="p-6 space-y-8">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-[15px] font-bold text-slate-800">Patient Details</h2>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <span className="px-3 py-1 bg-emerald-100/80 text-emerald-700 text-[11px] font-bold rounded-full">Checked In</span>
                                <ChevronRight size={14} className="text-slate-400" />
                            </div>
                        </div>

                        {/* Demographics */}
                        <div>
                            <h3 className="text-[11px] font-bold text-slate-400 tracking-wider mb-4 uppercase">Demographics</h3>
                            <div className="space-y-4">
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Name</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">J. Smith</span>
                                </div>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">DOB</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">03/15/1985</span>
                                </div>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">MRN</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">MRN-00421</span>
                                </div>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Phone</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">(555) 123-4567</span>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Insurance */}
                        <div>
                            <h3 className="text-[11px] font-bold text-slate-400 tracking-wider mb-4 uppercase flex items-center gap-2">
                                <ShieldCheck size={14} className="text-slate-400" />
                                Insurance
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Payer</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">Blue Cross Blue Shield</span>
                                </div>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Member ID</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">BCB-9987654</span>
                                </div>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Eligibility</span>
                                    <span className="px-2.5 py-0.5 bg-emerald-100/80 text-emerald-700 text-[11px] font-bold rounded-full">Active</span>
                                </div>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Copay</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">$30.00</span>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Authorization */}
                        <div>
                            <h3 className="text-[11px] font-bold text-slate-400 tracking-wider mb-4 uppercase flex items-center gap-2">
                                <FileText size={14} className="text-slate-400" />
                                Authorization
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Status</span>
                                    <span className="px-2.5 py-0.5 bg-emerald-100/80 text-emerald-700 text-[11px] font-bold rounded-full">Approved</span>
                                </div>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium text-[13px]">Auth #</span>
                                    <span className="text-slate-800 font-semibold text-[13px]">AUTH-2026-1234</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
