export default function EventStats({ events }) {
    const totalEvents = events.length;
    
    const totalRegistrations = events.reduce((sum, e) => 
        (e.registrations?.length || 0) + sum, 0
    );
    
    const approvedVolunteers = events.reduce((sum, e) => {
        const approved = e.registrations?.filter(reg =>
            reg.Status === 'approved' || reg.Status === 'selesai'
        ).length || 0;
        return sum + approved;
    }, 0);
    
    const uniqueCategories = new Set(events.map(e => e.category)).size;

    const statCards = [
        {
            label: "Total Events",
            value: totalEvents,
            bgColor: "bg-white",
            borderColor: "border-gray-200",
            textColor: "text-gray-900"
        },
        {
            label: "Total Pendaftar",
            value: totalRegistrations,
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-600"
        },
        {
            label: "Relawan Disetujui",
            value: approvedVolunteers,
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            textColor: "text-blue-600"
        },
        {
            label: "Kategori",
            value: uniqueCategories,
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            textColor: "text-purple-600"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-3 md:p-4 shadow-sm`}
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