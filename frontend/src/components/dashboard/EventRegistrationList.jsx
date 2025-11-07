import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function EventRegistrationList({ registrations }) {
    const navigate = useNavigate();

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const statusConfig = {
        pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
        approved: { color: "bg-green-100 text-green-700", label: "Disetujui" },
        rejected: { color: "bg-red-100 text-red-700", label: "Ditolak" },
        selesai: { color: "bg-blue-100 text-blue-700", label: "Selesai" },
    };

    if (!registrations || registrations.length === 0) {
        return (
            <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Belum ada pendaftaran event</p>
                <button
                    onClick={() => navigate("/events")}
                    className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                    Jelajahi Event →
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {registrations.slice(0, 5).map((reg, index) => {
                const status = (reg.Status || reg.status || "pending").toLowerCase();
                const config = statusConfig[status] || { color: "bg-gray-100 text-gray-700", label: status };

                return (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {reg.Event?.Title || reg.event?.title || "Event"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {formatDate(reg.CreatedAt || reg.created_at)}
                            </p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.color}`}>
                            {config.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}