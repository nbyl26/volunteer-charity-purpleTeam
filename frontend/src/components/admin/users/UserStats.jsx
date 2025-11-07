export default function UserStats({ users }) {
    const roleStats = users.reduce((acc, user) => {
        const role = (user.role || 'user').toLowerCase();
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const stats = [
        {
            label: "Total Pengguna",
            value: users.length,
            bgColor: "bg-blue-50",
            textColor: "text-blue-700"
        },
        {
            label: "Admin",
            value: roleStats.admin || 0,
            bgColor: "bg-purple-50",
            textColor: "text-purple-700"
        },
        {
            label: "User",
            value: roleStats.user || 0,
            bgColor: "bg-green-50",
            textColor: "text-green-700"
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            {stats.map((stat, index) => (
                <div key={index} className={`${stat.bgColor} border border-gray-200 rounded-xl p-4 shadow-sm`}>
                    <div className={`text-2xl md:text-3xl font-bold ${stat.textColor}`}>
                        {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 mt-1">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}