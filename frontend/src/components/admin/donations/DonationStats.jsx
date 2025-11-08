export default function DonationStats({ stats }) {
    const statCards = [
        {
            label: "Total Donasi",
            value: stats.total,
            bgColor: "bg-white",
            borderColor: "border-gray-200",
            textColor: "text-gray-900",
            subTextColor: "text-gray-600"
        },
        {
            label: "Pending",
            value: stats.pending,
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            textColor: "text-yellow-700",
            subTextColor: "text-yellow-600"
        },
        {
            label: "Terverifikasi",
            value: stats.verified,
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-700",
            subTextColor: "text-green-600"
        },
        {
            label: "Ditolak",
            value: stats.rejected,
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            textColor: "text-red-700",
            subTextColor: "text-red-600"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {statCards.map((card, index) => (
                <div
                    key={index}
                    className={`${card.bgColor} border ${card.borderColor} rounded-xl p-4 text-center shadow-sm`}
                >
                    <div className={`text-2xl md:text-3xl font-bold ${card.textColor}`}>
                        {card.value}
                    </div>
                    <div className={`text-xs md:text-sm ${card.subTextColor} mt-1`}>
                        {card.label}
                    </div>
                </div>
            ))}
        </div>
    );
}