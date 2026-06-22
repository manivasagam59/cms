import { useState } from 'react';
import {
    Search,
    ChevronDown,
    List,
    LayoutGrid,
    Plus,
    MoreHorizontal,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Activity,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const patients = [
    {
        id: 'PT-2024-001',
        name: 'Emma Thompson',
        age: 28,
        gender: 'Female',
        bloodType: 'A+',
        phone: '+1 (555) 123-4567',
        email: 'emma.t@example.com',
        address: '123 Market St, San Francisco',
        lastVisit: '2024-02-15',
        condition: 'Stable',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300',
        insurance: 'Blue Cross'
    },
    {
        id: 'PT-2024-045',
        name: 'James Rodriguez',
        age: 45,
        gender: 'Male',
        bloodType: 'O+',
        phone: '+1 (555) 987-6543',
        email: 'james.r@example.com',
        address: '456 Oak Ave, San Francisco',
        lastVisit: '2024-02-10',
        condition: 'Critical',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
        insurance: 'Aetna'
    },
    {
        id: 'PT-2024-089',
        name: 'Sophie Chen',
        age: 8,
        gender: 'Female',
        bloodType: 'B-',
        phone: '+1 (555) 456-7890',
        email: 'parent.chen@example.com',
        address: '789 Pine St, San Francisco',
        lastVisit: '2024-02-18',
        condition: 'Recovering',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300',
        insurance: 'UnitedHealth'
    },
    {
        id: 'PT-2024-112',
        name: 'Robert Taylor',
        age: 62,
        gender: 'Male',
        bloodType: 'AB+',
        phone: '+1 (555) 234-5678',
        email: 'bob.taylor@example.com',
        address: '321 Elm St, San Francisco',
        lastVisit: '2024-01-30',
        condition: 'Stable',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300',
        insurance: 'Medicare'
    },
    {
        id: 'PT-2024-156',
        name: 'Maria Garcia',
        age: 34,
        gender: 'Female',
        bloodType: 'O-',
        phone: '+1 (555) 876-5432',
        email: 'maria.g@example.com',
        address: '654 Maple Dr, San Francisco',
        lastVisit: '2024-02-19',
        condition: 'Under Observation',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRpFR1Zs7-yklmXQiVVbr6cSiksSlWxUxRQg&s',
        insurance: 'Cigna'
    },
    {
        id: 'PT-2024-201',
        name: 'David Kim',
        age: 29,
        gender: 'Male',
        bloodType: 'A-',
        phone: '+1 (555) 345-6789',
        email: 'david.kim@example.com',
        address: '987 Cedar Ln, San Francisco',
        lastVisit: '2024-02-14',
        condition: 'Stable',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
        insurance: 'Blue Cross'
    }
];

export default function Patients() {
    const [view, setView] = useState<'list' | 'grid'>('grid');
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Patients</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage patient records and medical history</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Plus size={20} />
                    <span>Add Patient</span>
                </Button>
            </div>

            {/* Filters Bar */}
            <div className="pb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all min-w-[280px] shadow-sm">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search Patient Name, ID, Phone..."
                            className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 w-full"
                        />
                    </div>

                    {/* Dropdowns */}
                    {['Status', 'Gender', 'Insurance'].map((label) => (
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
            </div>

            {/* Content Content */}
            <div className="flex-1 overflow-auto pr-2 pb-4">
                {view === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {patients.map((patient) => (
                            <div key={patient.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                                <div className="p-6 flex flex-col items-center border-b border-slate-50 relative">
                                    <button className="absolute top-4 right-4 text-slate-400 hover:text-blue-600 transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>

                                    <div className="relative mb-4">
                                        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all">
                                            <img
                                                src={patient.image}
                                                alt={patient.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${patient.condition === 'Stable' ? 'bg-emerald-500' :
                                            patient.condition === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'
                                            }`} title={patient.condition}>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{patient.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <span>{patient.id}</span>
                                        <span>•</span>
                                        <span>{patient.age} yrs</span>
                                        <span>•</span>
                                        <span>{patient.gender}</span>
                                    </div>
                                </div>

                                <div className="p-4 grid grid-cols-2 gap-4 border-b border-slate-50">
                                    <div className="text-center p-2 rounded-lg bg-slate-50">
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Blood</p>
                                        <p className="text-sm font-bold text-slate-900">{patient.bloodType}</p>
                                    </div>
                                    <div className="text-center p-2 rounded-lg bg-slate-50">
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Last Visit</p>
                                        <p className="text-sm font-bold text-slate-900">{patient.lastVisit}</p>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3 flex-1">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Phone size={16} className="text-slate-400" />
                                        <span className="truncate">{patient.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <MapPin size={16} className="text-slate-400" />
                                        <span className="truncate">{patient.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Activity size={16} className="text-slate-400" />
                                        <span className={`font-medium ${patient.condition === 'Stable' ? 'text-emerald-600' :
                                            patient.condition === 'Critical' ? 'text-rose-600' : 'text-amber-600'
                                            }`}>{patient.condition}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                                    <button className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm flex items-center justify-center gap-2" onClick={() => navigate("/patient-details")}>
                                        <FileText size={16} /> Details
                                    </button>
                                    <button className="flex-1 py-2 px-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 flex items-center justify-center gap-2">
                                        <Mail size={16} /> Message
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
                                    <th className="px-6 py-4">Patient Name</th>
                                    <th className="px-6 py-4">Bio</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Last Visit</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Insurance</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={patient.image}
                                                    alt={patient.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-slate-100"
                                                />
                                                <div>
                                                    <div className="font-semibold text-slate-900">{patient.name}</div>
                                                    <div className="text-xs text-slate-500">{patient.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-600">
                                                <span>{patient.age} yrs, {patient.gender}</span>
                                            </div>
                                            <div className="text-xs text-slate-400">Blood: {patient.bloodType}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <div className="flex flex-col gap-0.5 text-xs">
                                                <div>{patient.phone}</div>
                                                <div className="text-slate-400">{patient.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-600">
                                                <Calendar size={14} className="text-slate-400" />
                                                <span>{patient.lastVisit}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.condition === 'Stable' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                patient.condition === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                                                }`}>
                                                {patient.condition}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{patient.insurance}</td>
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
