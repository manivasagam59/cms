
import { ArrowRight } from "lucide-react";
import SettingsPage from "./shared/SettingsPage";

export default function ClaimsSettings() {
    const settings = [
        { id: 'clearinghouse', label: 'Clearinghouse', type: 'select', value: 'Change Healthcare', options: ['Change Healthcare', 'Availity', 'Office Ally'], desc: 'Primary claims clearinghouse connector.' },
        { id: 'batch_submit', label: 'Batch Submission Time', type: 'input', value: '18:00', desc: 'Daily time to auto-submit queued claims.' },
        { id: 'stop_loss', label: 'High Value Review', type: 'input', value: '$5000', desc: 'Manual review queue for claims exceeding amount.' }
    ];

    return (
        <SettingsPage
            title="Claims Management"
            description="Configure claim submission and clearinghouse settings."
            icon={ArrowRight}
            color="text-purple-600 bg-purple-50"
            settings={settings}
        />
    );
}
