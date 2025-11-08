import React from "react";

export default function StatsCard({ icon: Icon, label, value, color, badge }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
                <div className={`p-3 ${color.bg} rounded-xl`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color.icon}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 ${color.badge} rounded-full`}>
                    {badge}
                </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{value}</h3>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
        </div>
    );
}