
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import type { StageStats as StatsType } from "../data";

interface StageStatsProps {
    stats: StatsType;
}

export default function StageStats({ stats }: StageStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">Pending Actions</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.pending}</h3>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Clock size={20} />
                </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">Critical Issues</p>
                    <h3 className="text-2xl font-bold text-rose-600 mt-1">{stats.critical}</h3>
                </div>
                <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
                    <AlertCircle size={20} />
                </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">Completed Today</p>
                    <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.total}</h3>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                    <CheckCircle2 size={20} />
                </div>
            </div>
        </div>
    );
}
