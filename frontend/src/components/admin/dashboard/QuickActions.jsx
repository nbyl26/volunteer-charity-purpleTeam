import { useNavigate } from "react-router-dom";
import { Calendar, HeartHandshake, Users, DollarSign } from "lucide-react";

export default function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        {
            label: "Buat Event Baru",
            icon: Calendar,
            color: "bg-purple-50 hover:bg-purple-100 text-purple-700",
            action: () => navigate("/admin/events"),
        },
        {
            label: "Buat Campaign",
            icon: HeartHandshake,
            color: "bg-pink-50 hover:bg-pink-100 text-pink-700",
            action: () => navigate("/admin/campaigns"),
        },
        {
            label: "Lihat Pengguna",
            icon: Users,
            color: "bg-blue-50 hover:bg-blue-100 text-blue-700",
            action: () => navigate("/admin/users"),
        },
        {
            label: "Verifikasi Donasi",
            icon: DollarSign,
            color: "bg-green-50 hover:bg-green-100 text-green-700",
            action: () => navigate("/admin/donations"),
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Aksi Cepat
                </h2>
                <span className="text-sm text-gray-500">Pilih aksi untuk memulai</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.action}
                        className={`flex items-center gap-3 px-4 py-3 ${action.color} rounded-lg transition-all duration-200 text-sm md:text-base font-medium hover:scale-105`}
                    >
                        <action.icon className="w-5 h-5 flex-shrink-0" />
                        <span>{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}