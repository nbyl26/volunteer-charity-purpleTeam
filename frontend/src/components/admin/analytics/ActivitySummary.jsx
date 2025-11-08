import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function ActivitySummary({ stats }) {
    const activities = [
        {
            label: "Volunteer Pending",
            value: stats.pendingVolunteers,
            icon: Clock,
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-100",
            iconColor: "text-yellow-600",
            valueColor: "text-yellow-700"
        },
        {
            label: "Volunteer Approved",
            value: stats.approvedVolunteers,
            icon: CheckCircle,
            bgColor: "bg-green-50",
            borderColor: "border-green-100",
            iconColor: "text-green-600",
            valueColor: "text-green-700"
        },
        {
            label: "Donasi Pending",
            value: stats.pendingDonations,
            icon: Clock,
            bgColor: "bg-orange-50",
            borderColor: "border-orange-100",
            iconColor: "text-orange-600",
            valueColor: "text-orange-700"
        },
        {
            label: "Donasi Verified",
            value: stats.verifiedDonations,
            icon: CheckCircle,
            bgColor: "bg-blue-50",
            borderColor: "border-blue-100",
            iconColor: "text-blue-600",
            valueColor: "text-blue-700"
        },
        {
            label: "Donasi Rejected",
            value: stats.rejectedDonations,
            icon: XCircle,
            bgColor: "bg-red-50",
            borderColor: "border-red-100",
            iconColor: "text-red-600",
            valueColor: "text-red-700"
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Ringkasan Aktivitas
            </h2>
            <div className="space-y-3">
                {activities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                        <div key={index} className={`p-3 ${activity.bgColor} rounded-lg border ${activity.borderColor}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                                    <span className="text-sm font-medium text-gray-700">
                                        {activity.label}
                                    </span>
                                </div>
                                <span className={`text-lg font-bold ${activity.valueColor}`}>
                                    {activity.value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}