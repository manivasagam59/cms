import {
    Users,
    FileText,
    Calendar,
    Activity,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Clock,
    MoreHorizontal,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
    {
        name: 'Total Revenue',
        value: '$45,231.89',
        change: '+20.1%',
        trend: 'up',
        period: 'from last month',
        icon: DollarSign,
        color: 'bg-emerald-50 text-emerald-600'
    },
    {
        name: 'Appointments',
        value: '2,350',
        change: '+180.1%',
        trend: 'up',
        period: 'from last month',
        icon: Calendar,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        name: 'Active Patients',
        value: '+12,234',
        change: '+19%',
        trend: 'up',
        period: 'from last month',
        icon: Users,
        color: 'bg-orange-50 text-orange-600'
    },
    {
        name: 'Operations',
        value: '+573',
        change: '-201',
        trend: 'down',
        period: 'from last hour',
        icon: Activity,
        color: 'bg-purple-50 text-purple-600'
    }
];

const upcomingAppointments = [
    {
        id: 1,
        patient: 'Emma Thompson',
        type: 'General Checkup',
        time: '09:00 AM',
        doctor: 'Dr. Sarah Wilson',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 2,
        patient: 'James Rodriguez',
        type: 'Dental Cleaning',
        time: '10:30 AM',
        doctor: 'Dr. Michael Brown',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 3,
        patient: 'Sophie Chen',
        type: 'Pediatric Visit',
        time: '11:15 AM',
        doctor: 'Dr. Emily Parker',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
        id: 4,
        patient: 'Robert Taylor',
        type: 'Cardiology',
        time: '02:00 PM',
        doctor: 'Dr. James Chen',
        status: 'In Progress',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'
    }
];

const recentActivity = [
    {
        id: 1,
        title: 'New Patient Registration',
        description: 'Sarah Jenkins registered as a new patient',
        time: '2 mins ago',
        icon: Users,
        color: 'text-blue-600 bg-blue-50'
    },
    {
        id: 2,
        title: 'Appointment Cancelled',
        description: 'Dr. Wilson cancelled appointment with Tom',
        time: '1 hour ago',
        icon: Calendar,
        color: 'text-rose-600 bg-rose-50'
    },
    {
        id: 3,
        title: 'Lab Results Available',
        description: 'Blood work results for Mike Ross are ready',
        time: '3 hours ago',
        icon: FileText,
        color: 'text-emerald-600 bg-emerald-50'
    },
    {
        id: 4,
        title: 'System Update',
        description: 'System maintenance scheduled for tonight',
        time: '5 hours ago',
        icon: Activity,
        color: 'text-purple-600 bg-purple-50'
    }
];

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6 h-full overflow-y-auto pb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, Dr. Smith. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200">
                        Download Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium">{stat.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{stat.period}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Today's Appointments</h2>
                            <p className="text-sm text-slate-500">You have 4 appointments scheduled for today</p>
                        </div>
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-medium">
                            View All <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {upcomingAppointments.map((apt) => (
                            <div key={apt.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center gap-4">
                                <img
                                    src={apt.image}
                                    alt={apt.patient}
                                    className="w-12 h-12 rounded-full object-cover border border-slate-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-slate-900 truncate">{apt.patient}</h4>
                                    <p className="text-sm text-slate-500 truncate">{apt.type} • {apt.doctor}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                                        <Clock size={12} />
                                        {apt.time}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                                            apt.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                                                'bg-blue-50 text-blue-600'
                                        }`}>
                                        {apt.status}
                                    </span>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-50">
                        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                        <p className="text-sm text-slate-500">Latest updates from your clinic</p>
                    </div>
                    <div className="p-6 flex-1 overflow-auto">
                        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-slate-100">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="relative pl-8">
                                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('bg-', 'ring-')}`}>
                                        <div className={`w-3 h-3 rounded-full ${activity.color.replace('text', 'bg').split(' ')[0]}`}></div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">{activity.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5 mb-1">{activity.description}</p>
                                        <span className="text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                                            {activity.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-50">
                        <Button variant="outline" className="w-full text-slate-600">View All Historical Data</Button>
                    </div>
                </div>
            </div>

            {/* Quick Actions / Analytics Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                    <h3 className="text-lg font-bold mb-2">Weekly Report</h3>
                    <p className="text-blue-100 text-sm mb-6">Your weekly performance report is ready to download.</p>
                    <div className="flex gap-3">
                        <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                            View Report
                        </Button>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50 border-0">
                            Download PDF
                        </Button>
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Hospital Survey</h3>
                            <p className="text-sm text-slate-500">Patient satisfaction and feedback overview</p>
                        </div>
                        <select className="text-sm border-slate-200 rounded-lg text-slate-600 focus:ring-blue-500 focus:border-blue-500">
                            <option>This Month</option>
                            <option>Last Month</option>
                        </select>
                    </div>

                    {/* Mock Chart Area */}
                    <div className="flex items-end h-32 gap-4 mt-auto">
                        {[40, 70, 45, 90, 65, 80, 55, 85, 60, 75, 50, 95].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col gap-2 group cursor-pointer">
                                <div
                                    className="w-full bg-blue-100 rounded-t-sm group-hover:bg-blue-500 transition-colors relative"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {height}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
