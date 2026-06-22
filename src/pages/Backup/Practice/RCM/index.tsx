
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { rcmStages } from "./data";
import StageHeader from "./components/StageHeader";
import StageStats from "./components/StageStats";
import WorkItemsTable from "./components/WorkItemsTable";

export default function RCMPage() {
    const [searchParams] = useSearchParams();
    const [selectedStage, setSelectedStage] = useState(rcmStages[0]);

    useEffect(() => {
        const view = searchParams.get('view');
        if (view) {
            const stage = rcmStages.find(s => s.id === view);
            if (stage) {
                setSelectedStage(stage);
            }
        } else {
            // Default to first stage if no view is selected (e.g. initial load)
            // Or better, update URL to match default state? 
            // For now, let's just stick to the first stage which is 'appointments'
        }
    }, [searchParams]);

    return (
        <div className="flex h-full flex-col overflow-hidden bg-slate-50">
            <StageHeader stage={selectedStage} />
            <div className="flex-1 overflow-y-auto p-8">
                <StageStats stats={selectedStage.stats} />
                <WorkItemsTable items={selectedStage.items} stageId={selectedStage.id} />
            </div>
        </div>
    );
}
