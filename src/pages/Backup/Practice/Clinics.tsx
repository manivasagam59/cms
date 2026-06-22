import { useState } from 'react';
import {
    Search,
    ChevronDown,
    List,
    LayoutGrid,
    Plus,
    MapPin,
    Phone,
    Star,
    Clock,
    MoreHorizontal,
    Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const clinics = [
    {
        id: 1,
        name: 'Sunrise Health Clinic',
        type: 'General Practice',
        location: '123 Market St, San Francisco, CA',
        phone: '(415) 555-0123',
        rating: 4.8,
        reviews: 124,
        status: 'Open',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400',
        openHours: '08:00 AM - 06:00 PM'
    },
    {
        id: 2,
        name: 'Central City Hospital',
        type: 'Hospital',
        location: '456 Oak Ave, San Francisco, CA',
        phone: '(415) 555-0124',
        rating: 4.5,
        reviews: 89,
        status: 'Open',
        image: 'https://png.pngtree.com/thumb_back/fh260/background/20241128/pngtree-modern-hospital-building-with-a-cross-sign-image_16549330.jpg',
        openHours: '24 Hours'
    },
    {
        id: 3,
        name: 'Westside Family Practice',
        type: 'Family Medicine',
        location: '789 Pine St, San Francisco, CA',
        phone: '(415) 555-0125',
        rating: 4.9,
        reviews: 56,
        status: 'Closed',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600&h=400',
        openHours: '09:00 AM - 05:00 PM'
    },
    {
        id: 4,
        name: 'Oak Wood Medical Center',
        type: 'Specialty Center',
        location: '321 Elm St, San Francisco, CA',
        phone: '(415) 555-0126',
        rating: 4.7,
        reviews: 210,
        status: 'Open',
        image: 'https://eucee.in/uploads/2025/12/what-is-the-highest-paid-doctor-salaries-specialties-and-where-they-work.webp',
        openHours: '08:00 AM - 08:00 PM'
    },
    {
        id: 5,
        name: 'Pine Street Dental',
        type: 'Dental',
        location: '159 Pine St, San Francisco, CA',
        phone: '(415) 555-0127',
        rating: 4.6,
        reviews: 45,
        status: 'Open',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600&h=400',
        openHours: '09:00 AM - 06:00 PM'
    },
    {
        id: 6,
        name: 'Lakeside Cardiology',
        type: 'Cardiology',
        location: '753 Lake Dr, San Francisco, CA',
        phone: '(415) 555-0128',
        rating: 4.9,
        reviews: 132,
        status: 'Open',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600&h=400',
        openHours: '08:00 AM - 05:00 PM'
    }
];

export default function Clinics() {
    const [view, setView] = useState<'list' | 'grid'>('grid');

    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">Clinics & Hospitals</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your affiliated healthcare facilities</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Plus size={20} />
                    <span>Add Clinic</span>
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
                            placeholder="Search Clinic Name, Location..."
                            className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 w-full"
                        />
                    </div>

                    {/* Dropdowns */}
                    {['Clinic Type', 'Status', 'Location'].map((label) => (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {clinics.map((clinic) => (
                            <div key={clinic.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                                {/* Image Overlay */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={clinic.image}
                                        alt={clinic.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${clinic.status === 'Open'
                                            ? 'bg-emerald-500/90 text-white'
                                            : 'bg-slate-900/80 text-white'
                                            }`}>
                                            {clinic.status}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <div className="flex items-center gap-1 text-white/90 text-sm">
                                            <Building2 size={14} />
                                            <span>{clinic.type}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{clinic.name}</h3>
                                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                                            <Star size={14} className="fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-bold text-amber-700">{clinic.rating}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2.5 mb-5">
                                        <div className="flex items-start gap-2.5 text-sm text-slate-500">
                                            <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                                            <span className="line-clamp-1">{clinic.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-sm text-slate-500">
                                            <Clock size={16} className="text-slate-400 shrink-0" />
                                            <span>{clinic.openHours}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-sm text-slate-500">
                                            <Phone size={16} className="text-slate-400 shrink-0" />
                                            <span>{clinic.phone}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                                        <button className="flex-1 py-2 px-4 rounded-lg bg-slate-50 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors border border-slate-200">
                                            View Details
                                        </button>
                                        <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Clinic Name</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Rating</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {clinics.map((clinic) => (
                                    <tr key={clinic.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={clinic.image}
                                                    alt={clinic.name}
                                                    className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                                                />
                                                <span className="font-semibold text-slate-900">{clinic.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{clinic.type}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <MapPin size={14} />
                                                <span className="truncate max-w-[200px]">{clinic.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${clinic.status === 'Open'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                {clinic.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                                <span className="font-medium text-slate-700">{clinic.rating}</span>
                                                <span className="text-slate-400 text-xs">({clinic.reviews})</span>
                                            </div>
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
