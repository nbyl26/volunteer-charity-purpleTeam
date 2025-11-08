import { Calendar, MapPin, UserCheck, ArrowRight, Users } from "lucide-react";

export default function EventCard({ event, onManageClick }) {
    const formatDate = (isoString) => {
        if (!isoString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return "Tanggal tidak valid";
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const getRegistrationStats = () => {
        const registrations = event.registrations || [];
        return {
            total: registrations.length,
            pending: registrations.filter(reg =>
                (reg.Status || reg.status || '').toLowerCase() === 'pending'
            ).length,
            approved: registrations.filter(reg =>
                (reg.Status || reg.status || '').toLowerCase() === 'approved'
            ).length,
            rejected: registrations.filter(reg =>
                (reg.Status || reg.status || '').toLowerCase() === 'rejected'
            ).length,
            completed: registrations.filter(reg =>
                (reg.Status || reg.status || '').toLowerCase() === 'selesai'
            ).length
        };
    };

    const stats = getRegistrationStats();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">
                    {event.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="truncate">{formatDate(event.event_date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="truncate">{event.location || 'N/A'}</span>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                        {event.category || 'Kategori'}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                        <span className="text-sm md:text-base font-medium text-gray-900">Pendaftar</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-purple-600">
                        {stats.total}
                    </span>
                </div>

                {stats.total > 0 ? (
                    <>
                        <div className="grid grid-cols-4 gap-1.5 md:gap-2 text-center mb-4">
                            <div className="bg-yellow-50 rounded-lg p-1.5 md:p-2">
                                <div className="text-xs md:text-sm font-semibold text-yellow-700">{stats.pending}</div>
                                <div className="text-[10px] md:text-xs text-yellow-600">Pending</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-1.5 md:p-2">
                                <div className="text-xs md:text-sm font-semibold text-green-700">{stats.approved}</div>
                                <div className="text-[10px] md:text-xs text-green-600">Disetujui</div>
                            </div>
                            <div className="bg-red-50 rounded-lg p-1.5 md:p-2">
                                <div className="text-xs md:text-sm font-semibold text-red-700">{stats.rejected}</div>
                                <div className="text-[10px] md:text-xs text-red-600">Ditolak</div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-1.5 md:p-2">
                                <div className="text-xs md:text-sm font-semibold text-blue-700">{stats.completed}</div>
                                <div className="text-[10px] md:text-xs text-blue-600">Selesai</div>
                            </div>
                        </div>

                        <button
                            onClick={() => onManageClick(event)}
                            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm md:text-base font-medium transition"
                        >
                            Kelola Relawan
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <Users className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-xs md:text-sm">Belum ada pendaftar</p>
                    </div>
                )}
            </div>
        </div>
    );
}