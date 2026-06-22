
import { useState } from "react";
import {
    BarChart3,
    PieChart,
    FileText,
    Calendar,
    Download,
    Filter,
    ArrowUpRight,
    Search,
    ChevronRight,
    Printer,
    Share2,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for Reports
const reportCategories = [
    {
        id: "financial",
        title: "Financial Performance",
        reports: [
            { id: "rev-summary", title: "Revenue Summary", desc: "Detailed breakdown of billed vs. collected revenue over time." },
            { id: "ar-aging", title: "A/R Aging Analysis", desc: "Outstanding balances categorized by age (0-30, 31-60, 61-90, 90+ days)." },
            { id: "net-collection", title: "Net Collection Rate", desc: "Percentage of collectible revenue actually collected." }
        ]
    },
    {
        id: "claims",
        title: "Claims & Denials",
        reports: [
            { id: "claim-status", title: "Claim Status Overview", desc: "Distribution of claims by current status (Pending, Paid, Denied)." },
            { id: "denial-reasons", title: "Top Denial Reasons", desc: "Analysis of most frequent denial codes and their financial impact." },
            { id: "payer-performance", title: "Payer Performance", desc: "Comparison of reimbursement rates and turnaround times by payer." }
        ]
    },
    {
        id: "productivity",
        title: "Productivity",
        reports: [
            { id: "provider-prod", title: "Provider Productivity", desc: "Charges and collections attribution by provider." },
            { id: "coder-efficiency", title: "Coder Efficiency", desc: "Charts coded per day and accuracy rates." }
        ]
    }
];

// Mock Data for Charts/Tables
const monthlyRevenue = [
    { month: "Jan", billed: 150000, collected: 120000 },
    { month: "Feb", billed: 145000, collected: 115000 },
    { month: "Mar", billed: 160000, collected: 130000 },
    { month: "Apr", billed: 155000, collected: 125000 },
    { month: "May", billed: 170000, collected: 140000 },
    { month: "Jun", billed: 180000, collected: 150000 },
];

const arAgingData = [
    { bucket: "0-30 Days", amount: 45000, percentage: 45, color: "bg-emerald-500" },
    { bucket: "31-60 Days", amount: 25000, percentage: 25, color: "bg-blue-500" },
    { bucket: "61-90 Days", amount: 15000, percentage: 15, color: "bg-amber-500" },
    { bucket: "90+ Days", amount: 15000, percentage: 15, color: "bg-rose-500" },
];

const topDenials = [
    { code: "CO-16", reason: "Lacks Information", count: 45, amount: 12500 },
    { code: "CO-29", reason: "Timely Filing Limit", count: 22, amount: 8400 },
    { code: "PR-1", reason: "Deductible Amount", count: 18, amount: 4500 },
    { code: "CO-97", reason: "Bundled Service", count: 15, amount: 3200 },
    { code: "CO-197", reason: "Precert/Auth Missing", count: 12, amount: 9600 },
];

export default function RCMReports() {
    const [selectedReportId, setSelectedReportId] = useState("rev-summary");
    const [dateRange] = useState("Last 6 Months");

    // Helper to find report details
    const activeReport = reportCategories.flatMap(c => c.reports).find(r => r.id === selectedReportId) || reportCategories[0].reports[0];

    return (
        <div className="flex h-full bg-slate-50 overflow-hidden">
            {/* Left Sidebar - Report Navigation */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">RCM Analytics</h2>
                    <p className="text-xs text-slate-500">Financial insights & reporting</p>
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Find a report..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-6">
                    {reportCategories.map(category => (
                        <div key={category.id}>
                            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                {category.title}
                            </h3>
                            <div className="space-y-1">
                                {category.reports.map(report => (
                                    <button
                                        key={report.id}
                                        onClick={() => setSelectedReportId(report.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${selectedReportId === report.id
                                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <span className="truncate">{report.title}</span>
                                        {selectedReportId === report.id && <ChevronRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Report Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
                {/* Header & Controls */}
                <div className="bg-white border-b border-slate-200 p-6 shrink-0">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-1">{activeReport.title}</h1>
                            <p className="text-sm text-slate-500">{activeReport.desc}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="hidden lg:flex">
                                <Share2 size={16} className="mr-2" /> Share
                            </Button>
                            <Button variant="outline" size="sm" className="hidden lg:flex">
                                <Printer size={16} className="mr-2" /> Print
                            </Button>
                            <Button className="bg-linear-to-r from-indigo-600 to-violet-600 text-white border-0 shadow-md">
                                <Download size={16} className="mr-2" /> Export PDF
                            </Button>
                        </div>
                    </div>

                    {/* Report Parameters Bar */}
                    <div className="flex flex-wrap gap-4 items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="relative">
                            <Button variant="ghost" size="sm" className="bg-white border border-slate-200 text-slate-700 shadow-sm">
                                <Calendar size={14} className="mr-2 text-slate-500" />
                                {dateRange}
                            </Button>
                        </div>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                            <Filter size={14} className="mr-2" /> All Payers
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                            <Users size={14} className="mr-2" /> All Providers
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-auto text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                            Advanced Filters
                        </Button>
                    </div>
                </div>

                {/* Report Body */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">

                    {/* KPI Cards (Dynamic based on logic, static for demo) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                            <div className="absolute right-0 top-0 p-3 opacity-10 bg-indigo-500 rounded-bl-3xl"></div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Billed</p>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">$965,000</h3>
                            <div className="flex items-center text-xs font-medium text-emerald-600">
                                <ArrowUpRight size={12} className="mr-1" />
                                <span>12% vs last period</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-emerald-200 transition-colors">
                            <div className="absolute right-0 top-0 p-3 opacity-10 bg-emerald-500 rounded-bl-3xl"></div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Collected</p>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">$780,000</h3>
                            <div className="flex items-center text-xs font-medium text-emerald-600">
                                <ArrowUpRight size={12} className="mr-1" />
                                <span>8% vs last period</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-amber-200 transition-colors">
                            <div className="absolute right-0 top-0 p-3 opacity-10 bg-amber-500 rounded-bl-3xl"></div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Outstanding A/R</p>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">$185,000</h3>
                            <div className="flex items-center text-xs font-medium text-rose-600">
                                <ArrowUpRight size={12} className="mr-1" />
                                <span>5% vs last period</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-blue-200 transition-colors">
                            <div className="absolute right-0 top-0 p-3 opacity-10 bg-blue-500 rounded-bl-3xl"></div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Net Collection Rate</p>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">94.2%</h3>
                            <div className="flex items-center text-xs font-medium text-slate-400">
                                <span>Target: 95%</span>
                            </div>
                        </div>
                    </div>

                    {/* Visualizations Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Revenue Trend Chart */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <BarChart3 size={18} className="text-indigo-500" />
                                    Revenue Trend
                                </h3>
                                <div className="flex gap-2 text-xs">
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Billed</div>
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Collected</div>
                                </div>
                            </div>

                            {/* Simple CSS Bar Chart Implementation */}
                            <div className="h-64 flex items-end justify-between gap-4 px-2">
                                {monthlyRevenue.map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                                        <div className="w-full h-full flex items-end justify-center gap-1 relative">
                                            {/* Tooltip trigger area */}
                                            <div className="w-full flex justify-center gap-1 items-end h-full">
                                                <div
                                                    className="w-3 md:w-6 bg-indigo-500 rounded-t-sm transition-all hover:bg-indigo-600 relative group/bar"
                                                    style={{ height: `${(data.billed / 200000) * 100}%` }}
                                                >
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/bar:block bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                                                        ${(data.billed / 1000).toFixed(0)}k
                                                    </div>
                                                </div>
                                                <div
                                                    className="w-3 md:w-6 bg-emerald-400 rounded-t-sm transition-all hover:bg-emerald-500 relative group/bar"
                                                    style={{ height: `${(data.collected / 200000) * 100}%` }}
                                                >
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/bar:block bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                                                        ${(data.collected / 1000).toFixed(0)}k
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* A/R Aging Distribution */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <PieChart size={18} className="text-indigo-500" />
                                    A/R Aging Distribution
                                </h3>
                            </div>

                            <div className="flex-1 flex flex-col justify-center space-y-6">
                                {arAgingData.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-slate-700">{item.bucket}</span>
                                            <span className="font-medium text-slate-900">${item.amount.toLocaleString()} ({item.percentage}%)</span>
                                        </div>
                                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color}`}
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                                <p className="text-sm text-slate-500">Total Outstanding A/R: <span className="font-bold text-slate-900">$100,000</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Data Table */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <FileText size={18} className="text-slate-400" />
                                Denial Reason Details
                            </h3>
                            <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-8">
                                View Full Report <ChevronRight size={14} className="ml-1" />
                            </Button>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                                    <th className="px-6 py-3 border-b border-slate-200">Denial Code</th>
                                    <th className="px-6 py-3 border-b border-slate-200">Description</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-center">Frequency</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-right">Total Impact</th>
                                    <th className="px-6 py-3 border-b border-slate-200 text-right">% of Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {topDenials.map((denial, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm">
                                        <td className="px-6 py-3 font-mono font-medium text-rose-600">{denial.code}</td>
                                        <td className="px-6 py-3 text-slate-700">{denial.reason}</td>
                                        <td className="px-6 py-3 text-center font-medium">{denial.count}</td>
                                        <td className="px-6 py-3 text-right font-medium text-slate-900">${denial.amount.toLocaleString()}</td>
                                        <td className="px-6 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-xs text-slate-500">{(denial.amount / 38200 * 100).toFixed(1)}%</span>
                                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-rose-400" style={{ width: `${(denial.amount / 38200 * 100)}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}
