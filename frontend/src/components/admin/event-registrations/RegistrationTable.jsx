import { Mail, Phone, CheckCircle, XCircle, Clock, Loader2, Users } from "lucide-react";

export default function RegistrationTable({ registrations, updating, onStatusUpdate, formatDate }) {
    const getStatusConfig = (status) => {
        const configs = {
            'pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending', icon: Clock },
            'approved': { color: 'bg-green-100 text-green-800 border-green-200', label: 'Disetujui', icon: CheckCircle },
            'rejected': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Ditolak', icon: XCircle },
            'selesai': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Selesai', icon: CheckCircle }
        };
        return configs[status] || configs['pending'];
    };

    if (registrations.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tidak ada hasil pencarian
                </h3>
                <p className="text-gray-500">
                    Coba ubah kata kunci pencarian atau filter status.
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
                                Volunteer
                            </th>
                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kontak
                            </th>
                            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tanggal Daftar
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {registrations.map((reg) => {
                            const config = getStatusConfig(reg.status);
                            const StatusIcon = config.icon;

                            return (
                                <tr key={reg.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 md:px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-purple-600 font-semibold text-sm">
                                                    {reg.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {reg.user?.name || 'N/A'}
                                                </div>
                                                <div className="text-xs text-gray-500 md:hidden">
                                                    {reg.user?.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span className="truncate max-w-xs">{reg.user?.email || 'N/A'}</span>
                                            </div>
                                            {reg.user?.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    {reg.user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(reg.created_at)}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {config.label}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            {reg.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => onStatusUpdate(reg.id, reg.user_id, 'approved')}
                                                        disabled={updating === reg.id}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-xs rounded-lg transition"
                                                    >
                                                        {updating === reg.id ? (
                                                            <Loader2 className="w-3 h-3 animate-spin" />
                                                        ) : (
                                                            <CheckCircle className="w-3 h-3" />
                                                        )}
                                                        <span className="hidden sm:inline">Setujui</span>
                                                    </button>
                                                    <button
                                                        onClick={() => onStatusUpdate(reg.id, reg.user_id, 'rejected')}
                                                        disabled={updating === reg.id}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white text-xs rounded-lg transition"
                                                    >
                                                        {updating === reg.id ? (
                                                            <Loader2 className="w-3 h-3 animate-spin" />
                                                        ) : (
                                                            <XCircle className="w-3 h-3" />
                                                        )}
                                                        <span className="hidden sm:inline">Tolak</span>
                                                    </button>
                                                </>
                                            )}
                                            {reg.status === 'approved' && (
                                                <button
                                                    onClick={() => onStatusUpdate(reg.id, reg.user_id, 'selesai')}
                                                    disabled={updating === reg.id}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-xs rounded-lg transition"
                                                >
                                                    {updating === reg.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <CheckCircle className="w-3 h-3" />
                                                    )}
                                                    <span className="hidden sm:inline">Selesai</span>
                                                </button>
                                            )}
                                            {(reg.status === 'rejected' || reg.status === 'selesai') && (
                                                <button
                                                    onClick={() => onStatusUpdate(reg.id, reg.user_id, 'pending')}
                                                    disabled={updating === reg.id}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white text-xs rounded-lg transition"
                                                >
                                                    {updating === reg.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <Clock className="w-3 h-3" />
                                                    )}
                                                    <span className="hidden sm:inline">Reset</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}