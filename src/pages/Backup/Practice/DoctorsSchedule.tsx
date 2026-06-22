// import { useState } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const doctors = [
    {
        id: 1,
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiology',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        schedule: [
            { time: '09:00 AM', duration: 1, patient: 'Emma Thompson', type: 'Check-up', status: 'Confirmed' },
            { time: '11:00 AM', duration: 2, patient: 'Surgery - Block A', type: 'Surgery', status: 'Busy' },
            { time: '02:00 PM', duration: 1, patient: 'Michael Brown', type: 'Follow-up', status: 'Confirmed' },
        ]
    },
    {
        id: 2,
        name: 'Dr. James Chen',
        specialty: 'Neurology',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        schedule: [
            { time: '08:00 AM', duration: 1, patient: 'Department Meeting', type: 'Meeting', status: 'Busy' },
            { time: '10:00 AM', duration: 1, patient: 'Robert Fox', type: 'Consultation', status: 'Confirmed' },
            { time: '01:00 PM', duration: 1, patient: 'Lunch Break', type: 'Break', status: 'Break' },
            { time: '04:00 PM', duration: 1, patient: 'Linda Lee', type: 'Check-up', status: 'Pending' },
        ]
    },
    {
        id: 3,
        name: 'Dr. Emily Parker',
        specialty: 'Pediatrics',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        schedule: [
            { time: '09:00 AM', duration: 1, patient: 'Baby Smith', type: 'Vaccination', status: 'Confirmed' },
            { time: '10:00 AM', duration: 1, patient: 'Tom Wilson', type: 'Check-up', status: 'Confirmed' },
            { time: '02:00 PM', duration: 1, patient: 'Sarah Jones', type: 'Consultation', status: 'Pending' },
            { time: '03:00 PM', duration: 1, patient: 'Emergency Care', type: 'Emergency', status: 'Busy' },
        ]
    }
];

export default function DoctorsSchedule() {


    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Doctor's Schedule</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage appointments and doctor availability</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronLeft size={16} />
                        </Button>
                        <span className="text-sm font-medium px-2 min-w-[100px] text-center">Feb 19, 2026</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight size={16} />
                        </Button>
                    </div>

                    <div className="h-8 w-px bg-gray-200 mx-1"></div>

                    <Button variant="outline" className="gap-2">
                        <Filter size={16} />
                        <span>Filters</span>
                    </Button>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                        <CalendarIcon size={16} />
                        <span>New Appointment</span>
                    </Button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-auto">
                <div className="min-w-[800px]">
                    {/* Time Header Row - Sticky? */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-100 sticky top-0 bg-white z-10">
                        <div className="p-4 border-r border-gray-100 flex items-center justify-center bg-gray-50/50">
                            <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Doctors</span>
                        </div>
                        <div className="grid grid-cols-10 divide-x divide-gray-100 bg-gray-50/50">
                            {timeSlots.map((time) => (
                                <div key={time} className="p-4 flex justify-center">
                                    <span className="text-xs font-medium text-gray-500 uppercase">{time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Doctor Rows */}
                    <div className="divide-y divide-gray-100">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="grid grid-cols-[200px_1fr] group hover:bg-gray-50/30 transition-colors">
                                <div className="p-4 border-r border-gray-100 flex items-center gap-3">
                                    <div className="relative">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-medium text-gray-900 truncate">{doctor.name}</h3>
                                        <p className="text-xs text-gray-500 truncate">{doctor.specialty}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-10 divide-x divide-gray-100 relative">
                                    {/* Empty cells for grid structure */}
                                    {timeSlots.map((slot, i) => (
                                        <div key={i} className="h-20"></div>
                                    ))}

                                    {/* Schedule Items Overlay */}
                                    {doctor.schedule.map((apt, idx) => {
                                        const startIndex = timeSlots.findIndex(t => t === apt.time);
                                        if (startIndex === -1) return null;

                                        const style = {
                                            gridColumnStart: startIndex + 1,
                                            gridColumnEnd: `span ${apt.duration}`,
                                            left: '4px',
                                            right: '4px',
                                            top: '4px',
                                            bottom: '4px'
                                        };

                                        return (
                                            <div
                                                key={idx}
                                                className={`absolute m-1 rounded-lg p-2 border text-xs cursor-pointer hover:shadow-sm transition-all ${doctor.color}`}
                                                style={style}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold truncate">{apt.patient}</span>
                                                    {apt.status === 'Confirmed' && <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                                </div>
                                                <div className="flex items-center gap-1 opacity-80">
                                                    <Clock size={10} />
                                                    <span className="truncate">{apt.type}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
