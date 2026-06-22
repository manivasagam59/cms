import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Bell,
    MessageSquare,
    Phone,
    Video,
    FileText,
    MoreHorizontal,
    ChevronRight,
    Plus,
    Clock,
    CheckCircle2,
    AlertCircle,
    Calendar,
    Activity
} from 'lucide-react';

export const PatientDetails = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = [
        "Overview", "Clinical data", "Medications", "Care plans",
        "Patient profile", "Benefits", "Relationships", "Unified health score", "Schedule"
    ];

    const carePlans = [
        { name: "Discuss the benefits of regular exercise & developed a personalized exercise plan", priority: "Medium", dueDate: "24 April, 2023", status: "Not yet started" },
        { name: "Assess the patient's current activity level and any limitations or concerns.", priority: "Medium", dueDate: "24 April, 2023", status: "Started" },
        { name: "Discuss the benefits of regular exercise & developed a personalized exercise plan", priority: "Medium", dueDate: "24 April, 2023", status: "Started" }
    ];

    const medications = [
        { name: "Maxpro", sub: "Esomeprazole 40mg", type: "Tablet", start: "8 Sep, 2020", freq: "2 times/day", amount: "One", end: "--" },
        { name: "Rolac NS", sub: "Ketorolac 15.75mg", type: "Spray", start: "22 Oct, 2020", freq: "1 times/day", amount: "1 press", end: "--" },
        { name: "Vono", sub: "Vonoprazan 20mg", type: "Tablet", start: "24 May, 2020", freq: "2 times/day", amount: "Half", end: "7 Jan, 2024" }
    ];

    const renderCarePlans = (limit?: number) => {
        const plansToRender = limit ? carePlans.slice(0, limit) : carePlans;
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 flex justify-between items-center border-b border-slate-50">
                    <h2 className="text-lg font-bold text-slate-800">Care plans</h2>
                    {limit && (
                        <button onClick={() => setActiveTab("Care plans")} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:text-blue-700 transition-colors">
                            View all <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
                            <tr>
                                <th className="px-6 py-3">Plan name</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Due date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {plansToRender.map((plan, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-700 leading-snug w-[400px]">{plan.name}</td>
                                    <td className="px-6 py-4 text-sm font-semibold">{plan.priority}</td>
                                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap">{plan.dueDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold ${plan.status === 'Started'
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                                            }`}>
                                            {plan.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderMedications = (limit?: number) => {
        const medsToRender = limit ? medications.slice(0, limit) : medications;
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 flex justify-between items-center border-b border-slate-50">
                    <h2 className="text-lg font-bold text-slate-800">Medications</h2>
                    {limit && (
                        <button onClick={() => setActiveTab("Medications")} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:text-blue-700 transition-colors">
                            View all <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Start date</th>
                                <th className="px-6 py-3">How often</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">End date</th>
                                <th className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {medsToRender.map((med, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-800">{med.name}</div>
                                        <div className="text-xs text-slate-500 font-medium">{med.sub}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${med.type === 'Tablet' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                                            }`}>
                                            {med.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">{med.start}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">{med.freq}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">{med.amount}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 whitespace-nowrap">{med.end}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-6 font-sans text-slate-700">
            <div className="max-w-[1400px] mx-auto">

                {/* Patient Profile Header Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-blue-50/80 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                                <span className="text-2xl font-bold">♂</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Courtney Henry</h1>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-md border border-slate-200">ID: 21789057</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-500 text-sm mt-1.5 font-medium">
                                    <span>32 years old</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                    <span>Male</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                    <span>Teacher</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                    <span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 size={14} /> Active Patient</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-100 transition-colors border border-blue-200">
                                <MessageSquare size={16} /> Contact
                            </button>
                            <button onClick={() => navigate(-1)} className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors text-slate-500">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-8 pt-6 border-t border-slate-100">
                        <div>
                            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12} /> Last visits</div>
                            <div className="font-bold text-slate-800 text-sm">23 April, 2023</div>
                        </div>
                        <div>
                            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5"><AlertCircle size={12} /> Issue</div>
                            <div className="font-bold text-rose-600 text-sm bg-rose-50 px-2 py-0.5 rounded inline-block">Emergency</div>
                        </div>
                        <div>
                            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Assigned doctor</div>
                            <div className="font-bold text-blue-600 text-sm cursor-pointer hover:underline">Dr M. Wagner</div>
                        </div>
                        <div>
                            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Referring doctor</div>
                            <div className="font-bold text-blue-600 text-sm cursor-pointer hover:underline">Dr R. Green</div>
                        </div>
                        <div>
                            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock size={12} /> Next Appt.</div>
                            <div className="font-bold text-slate-800 text-sm">23 May, 2023</div>
                        </div>
                        <div>
                            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Family doctor</div>
                            <div className="font-bold text-blue-600 text-sm cursor-pointer hover:underline">Dr G. Mclar</div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs - PM Software Style */}
                <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar scroll-smooth">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-[13px] font-bold transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-blue-600 bg-blue-50/50 rounded-t-lg' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-t-lg'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-blue-600" />}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-6 w-full animate-in fade-in duration-300">

                    {/* Main Content Column */}
                    <div className="col-span-12 lg:col-span-9 space-y-6">

                        {activeTab === "Overview" && (
                            <>
                                {renderCarePlans(2)}
                                {renderMedications(2)}
                            </>
                        )}

                        {activeTab === "Medications" && renderMedications()}

                        {activeTab === "Care plans" && renderCarePlans()}

                        {/* Placeholder for unimplemented tabs */}
                        {activeTab !== "Overview" && activeTab !== "Medications" && activeTab !== "Care plans" && (
                            <div className="bg-white rounded-2xl p-16 flex flex-col items-center justify-center border border-slate-100 shadow-sm text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <Activity className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No data recorded</h3>
                                <p className="text-slate-500 text-sm max-w-sm">
                                    There is currently no detailed information available for the <strong>{activeTab}</strong> section.
                                </p>
                                <button className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                                    <Plus size={16} /> Add {activeTab} Data
                                </button>
                            </div>
                        )}

                    </div>

                    {/* Right Sidebar Column */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">

                        {/* Actions Widget */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <h2 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <AlertCircle size={16} className="text-slate-400" /> Action Items
                            </h2>
                            <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                                <div className="relative mb-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                                        <CheckCircle2 className="text-slate-300 w-6 h-6" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                                        <Plus className="text-white w-3 h-3" />
                                    </div>
                                </div>
                                <div className="font-bold text-slate-700 text-sm mb-1">You're all caught up</div>
                                <p className="text-slate-400 text-xs px-4">No pending tasks or actions required today.</p>
                            </div>
                        </div>

                        {/* Timeline Widget */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-base font-bold text-slate-900">Timeline</h2>
                                <button className="text-blue-600 text-xs font-bold hover:underline">View all</button>
                            </div>

                            <div className="space-y-6 relative">
                                {/* Vertical line base */}
                                <div className="absolute left-[9px] top-2 bottom-0 w-px bg-slate-200" />

                                {/* Upcoming Block */}
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-5 h-5 bg-blue-100 border-2 border-white rounded-full flex items-center justify-center ring-4 ring-white z-10 shrink-0">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white pr-2">Upcoming</div>
                                    </div>

                                    <div className="pl-6 ml-2.5">
                                        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 shadow-sm hover:shadow transition-shadow group cursor-pointer">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-[13px] text-slate-900 group-hover:text-blue-600 transition-colors">Diabetic issue re-check</h3>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                            <div className="text-[11px] font-semibold text-blue-600 mb-3 flex items-center gap-1">
                                                <Calendar size={10} /> 24 May, 2023
                                            </div>

                                            <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-100">
                                                <div>
                                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Problems</div>
                                                    <p className="text-[11px] font-medium text-slate-600 line-clamp-2">Urinate often and very hungry from last few days</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                                                    <div>
                                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Doctor</div>
                                                        <div className="text-[10px] font-bold text-slate-800">Dr M. Wagner</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Priority</div>
                                                        <div className="text-[10px] font-bold flex items-center gap-1 text-amber-600">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Medium
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Past Block */}
                                <div className="relative pt-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-5 h-5 bg-slate-200 border-2 border-white rounded-full ring-4 ring-white z-10 shrink-0" />
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white pr-2">Past</div>
                                    </div>

                                    <div className="pl-6 ml-2.5 space-y-4">
                                        {[
                                            { title: "Radiotherapy", date: "24 April, 2023" },
                                            { title: "Chronic disorder", date: "12 March, 2023" },
                                            { title: "Emergency issue", date: "24 May, 2022" }
                                        ].map((item, id) => (
                                            <div key={id} className="group cursor-pointer flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
                                                <div>
                                                    <h4 className="font-bold text-[13px] text-slate-700 group-hover:text-slate-900 transition-colors">{item.title}</h4>
                                                    <div className="text-[11px] font-medium text-slate-500">{item.date}</div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
