
import {
    Calendar,
    ScrollText,
    Brain,
    CreditCard,
    CircleDollarSign,
    CheckSquare,
    AlertCircle,
    Wallet,
    BarChart3,
    type LucideIcon
} from "lucide-react";

export interface WorkItem {
    id: string;
    patient?: string;
    issue?: string;
    status: string;
    time: string;
}

export interface StageStats {
    total: number;
    pending: number;
    critical: number;
}

export interface RCMStage {
    id: string;
    title: string;
    icon: LucideIcon;
    color: string;
    badge?: string;
    stats: StageStats;
    items: WorkItem[];
}

export const rcmStages: RCMStage[] = [
    {
        id: 'patient-encounters',
        title: 'Patient Encounters',
        icon: Calendar,
        color: 'text-purple-600 bg-purple-50',
        stats: { total: 100, pending: 20, critical: 0 },
        items: [
            { id: 'APT-101', patient: 'Sarah Connor', issue: 'Missing Insurance Info', status: 'Pending', time: '10m ago' },
        ]
    },
    {
        id: 'clinical-notes',
        title: 'Clinical Notes',
        icon: ScrollText,
        color: 'text-slate-600 bg-slate-50',
        stats: { total: 45, pending: 12, critical: 3 },
        items: [
            { id: 'NOTE-101', patient: 'John Smith', issue: 'Incomplete Dictation', status: 'Pending', time: '25m ago' },
        ]
    },
    {
        id: 'coding',
        title: 'Coding Center',
        icon: Brain,
        color: 'text-pink-600 bg-pink-50',
        badge: 'AI',
        stats: { total: 85, pending: 15, critical: 2 },
        items: [
            { id: 'COD-301', patient: 'Robert Taylor', issue: 'Unspecified Diagnosis', status: 'Critical', time: '15m ago' },
        ]
    },
    {
        id: 'eligibility',
        title: 'Eligibility',
        icon: CreditCard,
        color: 'text-indigo-600 bg-indigo-50',
        stats: { total: 120, pending: 8, critical: 5 },
        items: [
            { id: 'ELG-201', patient: 'Michael Brown', issue: 'Coverage Expired', status: 'Critical', time: '2h ago' },
        ]
    },
    {
        id: 'charge-entry',
        title: 'Charge Entry',
        icon: CircleDollarSign,
        color: 'text-blue-600 bg-blue-50',
        stats: { total: 150, pending: 5, critical: 1 },
        items: []
    },
    {
        id: 'claims',
        title: 'Claims',
        icon: CheckSquare,
        color: 'text-cyan-600 bg-cyan-50',
        stats: { total: 340, pending: 45, critical: 12 },
        items: [
            { id: 'CLM-401', patient: 'James Green', issue: 'Missing NPI', status: 'Critical', time: '1d ago' },
        ]
    },
    {
        id: 'denials',
        title: 'Denials',
        icon: AlertCircle,
        color: 'text-rose-600 bg-rose-50',
        stats: { total: 24, pending: 24, critical: 8 },
        items: [
            { id: 'DNL-601', patient: 'Jennifer Adams', issue: 'Medical Necessity', status: 'Critical', time: '3d ago' },
        ]
    },
    {
        id: 'payments',
        title: 'Payments',
        icon: Wallet,
        color: 'text-emerald-600 bg-emerald-50',
        stats: { total: 125, pending: 12, critical: 4 },
        items: [
            { id: 'PMT-501', patient: 'Elizabeth Hall', issue: 'Unmatched ERA', status: 'Critical', time: '2d ago' },
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        icon: BarChart3,
        color: 'text-slate-600 bg-slate-50',
        stats: { total: 0, pending: 0, critical: 0 },
        items: []
    }
];
