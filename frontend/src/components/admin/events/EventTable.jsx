import { Edit, Trash2, Users, Calendar } from "lucide-react";

export default function EventTable({ events, onEdit, onDelete }) {
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

    const getRegistrationCount = (event) => {
        return event.registrations?.length || 0;
    };

    const getApprovedCount = (event) => {
        return event.registrations?.filter(reg =>
            reg.Status === 'approved' || reg.Status === 'selesai'
        ).length || 0;
    };

    if (events.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada event</h3>
                <p className="text-gray-500 text-sm">
                    Mulai dengan membuat event pertama Anda
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Event
                            </th>
                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lokasi
                            </th>
                            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tanggal
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Pendaftar
                            </th>
                            <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 md:px-6 py-4">
                                    <div className="max-w-md">
                                        <div className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                                            {event.title}
                                        </div>
                                        <div className="text-xs text-gray-500 line-clamp-2 mb-1">
                                            {event.description}
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                                {event.category}
                                            </span>
                                            <span className="text-gray-400">
                                                #{event.id}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                        {event.location}
                                    </div>
                                </td>
                                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {formatDate(event.event_date)}
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-sm text-gray-900">
                                            {getRegistrationCount(event)}
                                        </span>
                                        {getApprovedCount(event) > 0 && (
                                            <span className="hidden sm:inline-flex text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                {getApprovedCount(event)} disetujui
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(event)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Edit Event"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(event.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Hapus Event"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}