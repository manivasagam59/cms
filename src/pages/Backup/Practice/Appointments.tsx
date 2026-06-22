import { useState } from 'react';
import {
    Calendar,
    Search,
    ChevronDown,
    List,
    LayoutGrid,
    Plus,
    Clock,
    User,
    MoreHorizontal,
    MapPin,
    Stethoscope,
    Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const statusTabs = [
    { label: 'All Status', count: 12, color: 'bg-slate-100 text-slate-600' },
    { label: 'Scheduled', count: 4, color: 'bg-blue-50 text-blue-600' },
    { label: 'Confirmed', count: 3, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Checked-in', count: 2, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'With Provider', count: 1, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending', count: 2, color: 'bg-orange-50 text-orange-600' }
];

const appointments = [
    {
        id: 1,
        date: '2026-02-19',
        time: '09:00 AM',
        patient: 'Emma Thompson',
        patientId: 'PT-2024-001',
        provider: 'Dr. Sarah Wilson',
        type: 'General Checkup',
        location: 'Room 302',
        status: 'Confirmed',
        contact: '+1 (555) 123-4567',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 2,
        date: '2026-02-19',
        time: '10:30 AM',
        patient: 'James Rodriguez',
        patientId: 'PT-2024-045',
        provider: 'Dr. Michael Brown',
        type: 'Orthopedic Consult',
        location: 'Room 405',
        status: 'Checked-in',
        contact: '+1 (555) 987-6543',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 3,
        date: '2026-02-19',
        time: '11:15 AM',
        patient: 'Sophie Chen',
        patientId: 'PT-2024-089',
        provider: 'Dr. Emily Parker',
        type: 'Pediatric Visit',
        location: 'Room 101',
        status: 'With Provider',
        contact: '+1 (555) 456-7890',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 4,
        date: '2026-02-19',
        time: '02:00 PM',
        patient: 'Robert Taylor',
        patientId: 'PT-2024-112',
        provider: 'Dr. James Chen',
        type: 'Neurology Follow-up',
        location: 'Room 205',
        status: 'Scheduled',
        contact: '+1 (555) 234-5678',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 5,
        date: '2026-02-19',
        time: '03:45 PM',
        patient: 'Maria Garcia',
        patientId: 'PT-2024-156',
        provider: 'Dr. Lisa Wong',
        type: 'Dermatology',
        location: 'Room 210',
        status: 'Pending',
        contact: '+1 (555) 876-5432',
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 6,
        date: '2026-02-19',
        time: '04:30 PM',
        patient: 'David Kim',
        patientId: 'PT-2024-201',
        provider: 'Dr. Robert Taylor',
        type: 'Consultation',
        location: 'Room 105',
        status: 'Scheduled',
        contact: '+1 (555) 345-6789',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100'
    }
];

export default function Appointments() {
    const [view, setView] = useState<'list' | 'grid'>('list');
    const [activeTab, setActiveTab] = useState('All Status');

    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Appointments</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage patient appointments and schedules</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Plus size={20} />
                    <span>Book Appointment</span>
                </Button>
            </div>

            {/* Filters Bar */}
            <div className="pb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Date Picker */}
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 min-w-[140px] shadow-sm cursor-pointer hover:border-blue-400 transition-colors">
                        <Calendar size={18} className="text-slate-400" />
                        <span>Today, Feb 19</span>
                    </div>

                    {/* Search */}
                    <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all min-w-[280px] shadow-sm">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search Patient, Provider, or ID..."
                            className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 w-full"
                        />
                    </div>

                    {/* Dropdowns */}
                    {['All Locations', 'All Providers', 'All Types'].map((label) => (
                        <div key={label} className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 min-w-[140px] cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            <span>{label}</span>
                            <ChevronDown size={16} className="text-slate-400" />
                        </div>
                    ))}

                    {/* View Toggle */}
                    <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm ml-auto sm:ml-0">
                        <button
                            onClick={() => setView('list')}
                            className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={20} />
                        </button>
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`
                                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap
                                ${activeTab === tab.label
                                    ? `${tab.color} border-transparent ring-1 ring-black/5 shadow-sm`
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                }
                            `}
                        >
                            <span>{tab.label}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.label ? 'bg-white/50' : 'bg-slate-100 text-slate-500'}`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Content */}
            <div className="flex-1 overflow-auto pr-2 pb-4">
                {view === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                                <div className="p-5 border-b border-slate-50 relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={apt.image}
                                                alt={apt.patient}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
                                            />
                                            <div>
                                                <h3 className="font-bold text-slate-900 line-clamp-1">{apt.patient}</h3>
                                                <p className="text-xs text-slate-500">{apt.patientId}</p>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' :
                                                apt.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' :
                                                    apt.status === 'With Provider' ? 'bg-purple-50 text-purple-700' :
                                                        apt.status === 'Checked-in' ? 'bg-yellow-50 text-yellow-700' : 'bg-orange-50 text-orange-700'
                                            }`}>
                                            {apt.status}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                                            <Clock size={12} /> {apt.time}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3 flex-1 bg-slate-50/30">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-1.5 rounded-md bg-white border border-slate-100 text-slate-400">
                                            <Stethoscope size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-500">Provider</p>
                                            <p className="font-medium text-slate-700">{apt.provider}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-1.5 rounded-md bg-white border border-slate-100 text-slate-400">
                                            <MapPin size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-500">Location</p>
                                            <p className="font-medium text-slate-700">{apt.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-1.5 rounded-md bg-white border border-slate-100 text-slate-400">
                                            <User size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-500">Type</p>
                                            <p className="font-medium text-slate-700">{apt.type}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-slate-100 bg-white grid grid-cols-2 gap-3">
                                    <button className="py-2 px-3 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                                        Reschedule
                                    </button>
                                    <button className="py-2 px-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                                        Check In
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4">Patient</th>
                                    <th className="px-6 py-4">Provider</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {appointments.map((apt) => (
                                    <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{apt.time}</div>
                                            <div className="text-xs text-slate-500">{apt.date}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={apt.image}
                                                    alt={apt.patient}
                                                    className="w-8 h-8 rounded-full object-cover border border-slate-100"
                                                />
                                                <div>
                                                    <div className="font-semibold text-slate-900">{apt.patient}</div>
                                                    <div className="text-xs text-slate-500">{apt.patientId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900">{apt.provider}</div>
                                            <div className="text-xs text-slate-500">{apt.location}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                                                {apt.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={14} className="text-slate-400" />
                                                <span>{apt.contact}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                    apt.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                        apt.status === 'With Provider' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                            apt.status === 'Checked-in' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-orange-50 text-orange-700 border border-orange-100'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
