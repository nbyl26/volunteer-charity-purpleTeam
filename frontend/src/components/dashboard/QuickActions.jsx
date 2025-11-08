import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Heart } from "lucide-react";

export default function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        {
            icon: Calendar,
            label: "Jelajahi Event",
            path: "/events",
            color: "bg-purple-50 hover:bg-purple-100 text-purple-700",
        },
        {
            icon: Heart,
            label: "Donasi Sekarang",
            path: "/campaigns",
            color: "bg-pink-50 hover:bg-pink-100 text-pink-700",
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
            <div className="space-y-2">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(action.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 ${action.color} rounded-lg transition text-sm font-medium`}
                    >
                        <action.icon className="w-5 h-5" />
                        <span>{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}