
import { MoreHorizontal, XCircle, Clock, CheckCircle2 } from "lucide-react";
import type { WorkItem } from "../data";

interface WorkItemsTableProps {
    items: WorkItem[];
    stageId: string;
}

export default function WorkItemsTable({ items, stageId }: WorkItemsTableProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800">Priority Work Items</h3>
                <span className="text-xs font-mono text-slate-400">Queue: {stageId.toUpperCase()}</span>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-medium text-xs">
                    <tr>
                        <th className="px-6 py-4">Reference ID</th>
                        <th className="px-6 py-4">Patient</th>
                        <th className="px-6 py-4">Issue / Reason</th>
                        <th className="px-6 py-4">Received</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs text-slate-500">{item.id}</td>
                            <td className="px-6 py-4 font-semibold text-slate-900">{item.patient}</td>
                            <td className="px-6 py-4 text-slate-600">{item.issue}</td>
                            <td className="px-6 py-4 text-slate-500">{item.time}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Critical'
                                    ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                                    }`}>
                                    {item.status === 'Critical' ? <XCircle size={12} /> : <Clock size={12} />}
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {items.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                    <CheckCircle2 size={48} className="mx-auto mb-4 text-slate-200" />
                    <p>No pending items in this queue.</p>
                </div>
            )}
        </div>
    );
}
