
import { UserPlus } from "lucide-react";
import SettingsPage from "./shared/SettingsPage";

export default function RegistrationSettings() {
    const settings = [
        { id: 'req_id_scan', label: 'Require ID Scan', type: 'toggle', value: true, desc: 'Mandatory government ID scan for new patients.' },
        { id: 'addr_verification', label: 'Address Verification', type: 'toggle', value: true, desc: 'Real-time USPS address validation.' },
        { id: 'dup_check', label: 'Duplicate Check Strictness', type: 'select', value: 'High', options: ['Low', 'Medium', 'High'], desc: 'Sensitivity for detecting duplicate patient records.' }
    ];

    return (
        <SettingsPage
            title="Patient Registration"
            description="Configure patient intake and data validation rules."
            icon={UserPlus}
            color="text-blue-600 bg-blue-50"
            settings={settings}
        />
    );
}
