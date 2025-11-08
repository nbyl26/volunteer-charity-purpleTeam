export default function RegistrationStats({ stats }) {
    const statCards = [
        { label: "Total", value: stats.total, bgColor: "bg-white", borderColor: "border-gray-200", textColor: "text-gray-900" },
        { label: "Pending", value: stats.pending, bgColor: "bg-yellow-50", borderColor: "border-yellow-200", textColor: "text-yellow-700" },
        { label: "Disetujui", value: stats.approved, bgColor: "bg-green-50", borderColor: "border-green-200", textColor: "text-green-700" },
        { label: "Ditolak", value: stats.rejected, bgColor: "bg-red-50", borderColor: "border-red-200", textColor: "text-red-700" },
        { label: "Selesai", value: stats.completed, bgColor: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-700" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className={`${stat.bgColor} rounded-xl border ${stat.borderColor} p-3 md:p-4 text-center shadow-sm`}
                >
                    <div className={`text-xl md:text-2xl font-bold ${stat.textColor}`}>
                        {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}