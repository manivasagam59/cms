
import { ShieldCheck } from "lucide-react";
import SettingsPage from "./shared/SettingsPage";

export default function EligibilitySettings() {
    const settings = [
        { id: 'auto_verify', label: 'Auto-Verify 72h Prior', type: 'toggle', value: true, desc: 'Automatically check eligibility 3 days before appointment.' },
        { id: 'copay_alert', label: 'Copay Collection Alert', type: 'toggle', value: true, desc: 'Prompt front desk to collect copay at check-in.' },
        { id: 'coverage_threshold', label: 'Coverage Alert Threshold', type: 'input', value: '80%', desc: 'Flag if co-insurance is below this percentage.' }
    ];

    return (
        <SettingsPage
            title="Eligibility Verification"
            description="Manage insurance coverage verification settings."
            icon={ShieldCheck}
            color="text-indigo-600 bg-indigo-50"
            settings={settings}
        />
    );
}
