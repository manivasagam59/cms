
import { Activity } from "lucide-react";
import SettingsPage from "./shared/SettingsPage";

export default function DenialSettings() {
    const settings = [
        { id: 'auto_route', label: 'Auto-Route by Payer', type: 'toggle', value: true, desc: 'Assign work items based on payer expertise.' },
        { id: 'appeal_limit', label: 'Appeal Timeframe Alert', type: 'input', value: '15 Days', desc: 'Alert when appeal deadline is approaching.' }
    ];

    return (
        <SettingsPage
            title="Denial Management"
            description="Rules for handling and routing rejected claims."
            icon={Activity}
            color="text-rose-600 bg-rose-50"
            settings={settings}
        />
    );
}
