
import { rcmStages } from "../data";
import StageHeader from "../components/StageHeader";
import StageStats from "../components/StageStats";
import WorkItemsTable from "../components/WorkItemsTable";

interface StageLayoutProps {
    stageId: string;
}

export default function StageLayout({ stageId }: StageLayoutProps) {
    const stage = rcmStages.find(s => s.id === stageId);

    if (!stage) {
        return (
            <div className="flex h-full flex-col items-center justify-center bg-slate-50 text-slate-400">
                <p>Stage not found</p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col overflow-hidden bg-slate-50">
            <StageHeader stage={stage} />
            <div className="flex-1 overflow-y-auto p-8">
                <StageStats stats={stage.stats} />
                <WorkItemsTable items={stage.items} stageId={stage.id} />
            </div>
        </div>
    );
}
