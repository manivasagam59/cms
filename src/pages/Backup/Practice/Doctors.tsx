import { useState } from 'react';
import {
    Search,
    ChevronDown,
    List,
    LayoutGrid,
    Plus,
    MoreHorizontal,
    Star,
    Phone,
    Mail,
    MapPin,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const doctors = [
    {
        id: 1,
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiology',
        department: 'Cardiology',
        status: 'Available',
        rating: 4.9,
        reviews: 128,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        phone: '+1 (555) 123-4567',
        email: 'sarah.wilson@medpath.com',
        location: 'Room 302, Building A',
        experience: '12 Years'
    },
    {
        id: 2,
        name: 'Dr. James Chen',
        specialty: 'Neurology',
        department: 'Neurology',
        status: 'Busy',
        rating: 4.8,
        reviews: 95,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        phone: '+1 (555) 234-5678',
        email: 'james.chen@medpath.com',
        location: 'Room 205, Building B',
        experience: '8 Years'
    },
    {
        id: 3,
        name: 'Dr. Emily Parker',
        specialty: 'Pediatrics',
        department: 'Pediatrics',
        status: 'Away',
        rating: 4.9,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        phone: '+1 (555) 345-6789',
        email: 'emily.parker@medpath.com',
        location: 'Room 101, Building C',
        experience: '15 Years'
    },
    {
        id: 4,
        name: 'Dr. Michael Brown',
        specialty: 'Orthopedics',
        department: 'Orthopedics',
        status: 'Available',
        rating: 4.7,
        reviews: 86,
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
        phone: '+1 (555) 456-7890',
        email: 'michael.brown@medpath.com',
        location: 'Room 405, Building A',
        experience: '10 Years'
    },
    {
        id: 5,
        name: 'Dr. Lisa Wong',
        specialty: 'Dermatology',
        department: 'Dermatology',
        status: 'In Surgery',
        rating: 4.9,
        reviews: 156,
        image: 'https://risk.lexisnexis.com/-/media/images/healthcare/2-industry%20pages/vertical-markets/provider/2024%20page%20refresh/lnrs%20provider-circle%20png.png?h=452&iar=0&w=445&hash=01984BE28A8E6EC47917F0A32F747405',
        phone: '+1 (555) 567-8901',
        email: 'lisa.wong@medpath.com',
        location: 'Room 210, Building B',
        experience: '7 Years'
    },
    {
        id: 6,
        name: 'Dr. Robert Taylor',
        specialty: 'General Medicine',
        department: 'General Practice',
        status: 'Available',
        rating: 4.6,
        reviews: 342,
        image: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&q=80&w=300&h=300',
        phone: '+1 (555) 678-9012',
        email: 'robert.taylor@medpath.com',
        location: 'Room 105, Building A',
        experience: '20 Years'
    }
];

export default function Doctors() {
    const [view, setView] = useState<'list' | 'grid'>('grid');

    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Doctors</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your medical staff and specialists</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Plus size={20} />
                    <span>Add Doctor</span>
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
                            placeholder="Search Doctor Name, ID, Specialty..."
                            className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 w-full"
                        />
                    </div>

                    {/* Dropdowns */}
                    {['Department', 'Status', 'Experience'].map((label) => (
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
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                                <div className="p-6 flex flex-col items-center border-b border-slate-50 relative">
                                    <button className="absolute top-4 right-4 text-slate-400 hover:text-blue-600 transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>

                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${doctor.status === 'Available' ? 'bg-emerald-500' :
                                            doctor.status === 'Busy' || doctor.status === 'In Surgery' ? 'bg-rose-500' : 'bg-amber-500'
                                            }`} title={doctor.status}></div>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{doctor.name}</h3>
                                    <p className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">{doctor.specialty}</p>

                                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                                        <Star size={14} className="fill-amber-400 text-amber-400" />
                                        <span className="font-semibold text-slate-700">{doctor.rating}</span>
                                        <span className="text-xs">({doctor.reviews} Reviews)</span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3 flex-1">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                                            <MapPin size={16} />
                                        </div>
                                        <span className="truncate">{doctor.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                                            <Phone size={16} />
                                        </div>
                                        <span className="truncate">{doctor.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                                            <Mail size={16} />
                                        </div>
                                        <span className="truncate">{doctor.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                                            <Clock size={16} />
                                        </div>
                                        <span className="truncate">{doctor.experience} Experience</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
                                    <button className="py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                                        View Profile
                                    </button>
                                    <button className="py-2 px-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                                        Schedule
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
                                    <th className="px-6 py-4">Doctor Name</th>
                                    <th className="px-6 py-4">Specialty</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-slate-100"
                                                />
                                                <div>
                                                    <div className="font-semibold text-slate-900">{doctor.name}</div>
                                                    <div className="text-xs text-slate-500">{doctor.department}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                                                {doctor.specialty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <div className="flex flex-col gap-0.5 text-xs">
                                                <div>{doctor.phone}</div>
                                                <div className="text-slate-400">{doctor.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doctor.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                doctor.status === 'Busy' || doctor.status === 'In Surgery' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                                                }`}>
                                                {doctor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{doctor.location}</td>
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
