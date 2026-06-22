
import { useState } from "react";
import {
    Search,
    DollarSign,
    FileText,
    CheckCircle2,
    AlertTriangle,
    Clock,
    Building2,
    User,
    Calendar,
    Download,
    Receipt,
    Plus,
    Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for Payments/Remittances
const payments = [
    {
        id: "PMT-2026-001",
        type: "Insurance",
        payer: "Blue Cross Blue Shield",
        method: "EFT",
        reference: "EFT-8829102",
        date: "2026-02-24",
        amount: 4500.00,
        unapplied: 0.00,
        status: "Posted",
        items: [
            { id: 1, patient: "Sarah Johnson", dos: "2026-02-19", cpt: "99214", billed: 250.00, allowed: 175.00, paid: 175.00, adj: 75.00, reason: "CO-45", patResp: 0.00, status: "Paid" },
            { id: 2, patient: "Michael Chen", dos: "2026-02-18", cpt: "99213", billed: 180.00, allowed: 135.00, paid: 135.00, adj: 45.00, reason: "CO-45", patResp: 0.00, status: "Paid" },
            // ... more items implied
        ]
    },
    {
        id: "PMT-2026-002",
        type: "Patient",
        payer: "Emma Roberts", // Patient Name
        method: "Credit Card",
        reference: "VISA **** 4242",
        date: "2026-02-23",
        amount: 45.00,
        unapplied: 0.00,
        status: "Posted",
        items: [
            { id: 101, patient: "Emma Roberts", dos: "2026-02-17", cpt: "Copay", billed: 45.00, allowed: 45.00, paid: 45.00, adj: 0.00, reason: "", patResp: 0.00, status: "Paid" }
        ]
    },
    {
        id: "PMT-2026-003",
        type: "Insurance",
        payer: "UnitedHealthcare",
        method: "Check",
        reference: "CHK-9912",
        date: "2026-02-22",
        amount: 1250.00,
        unapplied: 150.00, // Discrepancy
        status: "Draft", // Needs review
        items: [
            { id: 201, patient: "James Carter", dos: "2026-01-10", cpt: "73721", billed: 1800.00, allowed: 1100.00, paid: 1100.00, adj: 700.00, reason: "CO-45", patResp: 0.00, status: "Paid" },
            // The unapplied amount is not allocated to any specific line item yet
        ]
    }
];

const stats = [
    { label: "Posted Today", value: "$5,845.00", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Unapplied Cash", value: "$320.00", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
    { label: "Pending Deposits", value: "$1,250.00", icon: Clock, color: "text-blue-600 bg-blue-50" },
];

export default function RCMPayments() {
    const [selectedPaymentId, setSelectedPaymentId] = useState(payments[0].id);
    const [filterType, setFilterType] = useState("All");

    const selectedPayment = payments.find(p => p.id === selectedPaymentId) || payments[0];

    const filteredPayments = filterType === "All"
        ? payments
        : payments.filter(p => p.type === filterType);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Posted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Draft': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Reversed': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Payment Queue/History */}
            <div className="w-96 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Payments</h2>
                        <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus size={16} className="mr-1" /> New
                        </Button>
                    </div>

                    <div className="flex gap-2 mb-4">
                        {['All', 'Insurance', 'Patient'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors border ${filterType === type
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by Payer, Check #..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {filteredPayments.map(payment => (
                        <div
                            key={payment.id}
                            onClick={() => setSelectedPaymentId(payment.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedPaymentId === payment.id
                                ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                                : 'bg-white border-slate-100 hover:border-emerald-100 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(payment.status)}`}>
                                    {payment.status}
                                </span>
                                <span className="font-mono text-xs text-slate-500">{payment.date}</span>
                            </div>

                            <div className="flex items-center gap-2 mb-1">
                                {payment.type === 'Insurance' ? <Building2 size={16} className="text-blue-500/70" /> : <User size={16} className="text-purple-500/70" />}
                                <h3 className={`font-semibold text-sm truncate ${selectedPaymentId === payment.id ? 'text-emerald-900' : 'text-slate-900'}`}>
                                    {payment.payer}
                                </h3>
                            </div>

                            <div className="flex justify-between items-end mt-2">
                                <div className="text-xs text-slate-500 flex flex-col">
                                    <span className="font-medium text-slate-600">{payment.method}</span>
                                    <span className="font-mono text-[10px] text-slate-400">{payment.reference}</span>
                                </div>
                                <div className={`font-bold font-mono text-base ${selectedPaymentId === payment.id ? 'text-emerald-700' : 'text-slate-900'}`}>
                                    ${payment.amount.toFixed(2)}
                                </div>
                            </div>

                            {payment.unapplied > 0 && (
                                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                                    <AlertTriangle size={12} />
                                    <span className="font-medium">Unapplied: ${payment.unapplied.toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
                {/* Stats Header */}
                <div className="flex items-center justify-between p-6 pb-2 shrink-0">
                    <div className="flex gap-4 w-full">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white px-5 py-3 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm flex-1">
                                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{stat.label}</p>
                                    <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail View */}
                <div className="flex-1 overflow-y-auto p-6 pt-4 scrollbar-thin scrollbar-thumb-slate-200">

                    {/* Payment Header Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                                    <DollarSign size={32} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 mb-1">{selectedPayment.payer}</h1>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                            <Briefcase size={14} className="text-slate-400" />
                                            <span className="font-medium text-slate-700">{selectedPayment.method}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                            <FileText size={14} className="text-slate-400" />
                                            <span className="font-mono text-slate-700">{selectedPayment.reference}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                            <Calendar size={14} className="text-slate-400" />
                                            <span className="font-medium text-slate-700">{selectedPayment.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500 font-medium mb-1">Total Payment Amount</p>
                                <p className="text-4xl font-bold text-emerald-600 font-mono tracking-tight">
                                    ${selectedPayment.amount.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Payment Breakdown / Action Bar */}
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Items Paid</p>
                                    <p className="text-lg font-bold text-slate-700">{selectedPayment.items.length}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Adjustments</p>
                                    <p className="text-lg font-bold text-slate-700 font-mono">
                                        ${selectedPayment.items.reduce((sum, item) => sum + item.adj, 0).toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Unapplied</p>
                                    <p className={`text-lg font-bold font-mono ${selectedPayment.unapplied > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                                        ${selectedPayment.unapplied.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-600">
                                    <Receipt size={16} className="mr-2" /> Receipt
                                </Button>
                                {selectedPayment.unapplied > 0 ? (
                                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0">
                                        Resolve Unapplied Balance
                                    </Button>
                                ) : (
                                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0">
                                        <Download size={16} className="mr-2" /> Download ERA
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Allocation Table */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Payment Allocation Details</h3>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                                    <th className="px-6 py-3 border-b border-slate-200">Patient / DOS</th>
                                    <th className="px-6 py-3 border-b border-slate-200">CPT Info</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-right">Billed</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-right">Allowed</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-right">Paid</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-right">Adjs</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-right">Pat Resp</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {selectedPayment.items.map((item) => (
                                    <tr key={item.id} className="text-sm hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900">{item.patient}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.dos}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{item.cpt}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-slate-600">${item.billed.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono text-slate-600">${item.allowed.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600 bg-emerald-50/30">${item.paid.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="font-mono text-slate-600">${item.adj.toFixed(2)}</p>
                                            {item.reason && <span className="text-[10px] text-slate-400 italic block">{item.reason}</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-slate-600">${item.patResp.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-emerald-600 px-2 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Empty/Loading State if no items */}
                        {selectedPayment.items.length === 0 && (
                            <div className="p-8 text-center text-slate-400 italic">
                                No allocation details available for this payment draft.
                            </div>
                        )}

                        {/* Totals Footer for Table */}
                        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-end gap-8 text-sm">
                            <div className="text-right">
                                <span className="text-slate-500 font-medium block">Total Paid</span>
                                <span className="font-bold font-mono text-emerald-700 text-lg">
                                    ${selectedPayment.items.reduce((sum, i) => sum + i.paid, 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
