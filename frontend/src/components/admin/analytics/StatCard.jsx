export default function StatCard({ icon, title, value, bgColor, iconColor }) {
    return (
        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 md:gap-4">
                <div className={`${bgColor} p-3 rounded-xl flex-shrink-0`}>
                    <div className={iconColor}>{icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}