
import { FileDigit } from "lucide-react";
import SettingsPage from "./shared/SettingsPage";

export default function CodingSettings() {
    const settings = [
        { id: 'auto_suggest', label: 'AI Code Suggestions', type: 'toggle', value: true, desc: 'Suggest CPT/ICD-10 codes based on clinical notes.' },
        { id: 'req_signoff', label: 'Provider Sign-off Required', type: 'toggle', value: true, desc: 'Require MD approval for high-complexity codes.' },
        { id: 'scrub_level', label: 'Claim Scrubbing Level', type: 'select', value: 'Strict', options: ['Standard', 'Strict', 'Custom'], desc: 'Internal audit rules stringency.' }
    ];

    return (
        <SettingsPage
            title="Medical Coding"
            description="Set up coding guidelines and automation rules."
            icon={FileDigit}
            color="text-orange-600 bg-orange-50"
            settings={settings}
        />
    );
}
