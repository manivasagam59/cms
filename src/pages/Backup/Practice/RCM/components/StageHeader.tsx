
import { Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RCMStage } from "../data";

interface StageHeaderProps {
    stage: RCMStage;
}

export default function StageHeader({ stage }: StageHeaderProps) {
    const Icon = stage.icon;
    return (
        <div className="bg-white px-8 py-4 border-b border-slate-200 shadow-sm z-10 flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <div className={`p-2 rounded-lg ${stage.color}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{stage.title} Queue</h2>
                    <p className="text-slate-500 text-sm">Manage and resolve {stage.id} exceptions</p>
                </div>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="gap-2 text-slate-600">
                    <Filter size={16} /> Filter
                </Button>
                <Button variant="outline" className="gap-2 text-slate-600">
                    <Download size={16} /> Export
                </Button>
            </div>
        </div>
    );
}
