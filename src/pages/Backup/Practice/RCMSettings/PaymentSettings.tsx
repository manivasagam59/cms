
import { DollarSign } from "lucide-react";
import SettingsPage from "./shared/SettingsPage";

export default function PaymentSettings() {
    const settings = [
        { id: 'auto_post', label: 'Auto-Post ERA', type: 'toggle', value: true, desc: 'Automatically post payments from Electronic Remittance Advice.' },
        { id: 'stmt_cycle', label: 'Statement Cycle', type: 'select', value: 'Monthly', options: ['Weekly', 'Bi-Weekly', 'Monthly'], desc: 'Frequency of patient billing statements.' },
        { id: 'min_stmt', label: 'Minimum Statement Amount', type: 'input', value: '$5.00', desc: 'Do not send statements for balances below this amount.' }
    ];

    return (
        <SettingsPage
            title="Payment Processing"
            description="Handle remittance and patient billing preferences."
            icon={DollarSign}
            color="text-emerald-600 bg-emerald-50"
            settings={settings}
        />
    );
}
