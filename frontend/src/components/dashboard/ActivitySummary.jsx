import React from "react";

export default function ActivitySummary({ stats }) {
    const activities = [
        { label: "Event Pending", value: stats.pendingEvents, color: "text-yellow-700" },
        { label: "Event Selesai", value: stats.completedEvents, color: "text-blue-700" },
        { label: "Donasi Pending", value: stats.pendingDonations, color: "text-orange-700" },
        { label: "Donasi Verified", value: stats.verifiedDonations, color: "text-green-700" },
    ];

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Aktivitas</h3>
            <div className="space-y-3">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{activity.label}</span>
                        <span className={`text-sm font-semibold ${activity.color}`}>
                            {activity.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}