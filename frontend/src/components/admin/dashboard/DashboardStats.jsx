import { Users, Calendar, HeartHandshake, DollarSign, Activity, TrendingUp } from "lucide-react";

export default function DashboardStats({ stats, formatCurrency }) {
    const statCards = [
        {
            title: "Total Pengguna",
            value: stats.totalUsers,
            icon: Users,
            bgLight: "bg-blue-50",
            textColor: "text-blue-600",
        },
        {
            title: "Total Event",
            value: stats.totalEvents,
            icon: Calendar,
            bgLight: "bg-purple-50",
            textColor: "text-purple-600",
        },
        {
            title: "Total Campaign",
            value: stats.totalCampaigns,
            icon: HeartHandshake,
            bgLight: "bg-pink-50",
            textColor: "text-pink-600",
        },
        {
            title: "Total Donasi Terkumpul",
            value: formatCurrency(stats.totalDonationAmount),
            icon: DollarSign,
            bgLight: "bg-green-50",
            textColor: "text-green-600",
        },
        {
            title: "Volunteer Pending",
            value: stats.pendingVolunteers,
            icon: Activity,
            bgLight: "bg-yellow-50",
            textColor: "text-yellow-600",
        },
        {
            title: "Donasi Pending",
            value: stats.pendingDonations,
            icon: TrendingUp,
            bgLight: "bg-orange-50",
            textColor: "text-orange-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-all duration-200"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className={`${stat.bgLight} p-3 rounded-xl`}>
                            <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}