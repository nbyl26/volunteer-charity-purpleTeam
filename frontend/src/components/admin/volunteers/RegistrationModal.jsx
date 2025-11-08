import { X, Check, XCircle, CheckCircle, User, Mail, Phone, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../config/api";

export default function RegistrationModal({ event, onClose, onUpdate }) {
    const [updatingId, setUpdatingId] = useState(null);

        const handleUpdateStatus = async (registration, newStatus) => {
        try {
            setUpdatingId(registration.ID || registration.id);
            
            const regId = registration.ID || registration.id;
            const userId = registration.UserID || registration.user_id || registration.User?.ID || registration.user?.id;

            if (!regId || !userId) {
                toast.error("Data registrasi tidak valid");
                return;
            }

            console.log(`Updating registration ${regId} for user ${userId} to status: ${newStatus}`);

            if (newStatus === 'approved') {
                await api.patch(`/events/registrations/${regId}/approve/${userId}`);
                toast.success("Relawan berhasil disetujui");
            } else if (newStatus === 'rejected') {
                await api.patch(`/events/registrations/${regId}/reject/${userId}`);
                toast.success("Relawan berhasil ditolak");
            } else if (newStatus === 'selesai') {
                await api.patch(`/events/registrations/${regId}/status`, { status: newStatus });
                toast.success("Status berhasil diubah menjadi selesai");
            }

            onUpdate();

        } catch (error) {
            console.error("Error updating status:", error);
            const errorMsg = error.response?.data?.error || "Gagal mengubah status";
            toast.error(errorMsg);
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            'pending': { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Pending' },
            'approved': { color: 'bg-green-100 text-green-700 border-green-200', label: 'Disetujui' },
            'rejected': { color: 'bg-red-100 text-red-700 border-red-200', label: 'Ditolak' },
            'selesai': { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Selesai' }
        };
        return configs[status?.toLowerCase()] || configs['pending'];
    };

    const registrations = event.registrations || [];

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                            Kelola Relawan
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">{event.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 md:p-6">
                    {registrations.length === 0 ? (
                        <div className="text-center py-12">
                            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Belum ada pendaftar untuk acara ini</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {registrations.map((registration) => {
                                const status = (registration.Status || registration.status || 'pending').toLowerCase();
                                const statusConfig = getStatusConfig(status);
                                const regId = registration.ID || registration.id;

                                return (
                                    <div
                                        key={regId}
                                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-purple-200 transition"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-purple-600 font-semibold text-sm">
                                                            {(registration.User?.Name || registration.user?.name || 'U').charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                                                            {registration.User?.Name || registration.user?.name || 'User'}
                                                        </h3>
                                                        <div className="flex flex-col gap-1 mt-1 text-xs md:text-sm text-gray-600">
                                                            <div className="flex items-center gap-1">
                                                                <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                                                                <span className="truncate">{registration.User?.Email || registration.user?.email || 'N/A'}</span>
                                                            </div>
                                                            {registration.PhoneNumber && (
                                                                <div className="flex items-center gap-1">
                                                                    <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                                                                    <span>{registration.PhoneNumber}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                                                                <span>
                                                                    {new Date(registration.CreatedAt || registration.created_at).toLocaleDateString('id-ID', {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                        year: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {registration.Message && (
                                                            <p className="mt-2 text-xs md:text-sm text-gray-600 italic line-clamp-2">
                                                                "{registration.Message}"
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                                        {statusConfig.label}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap md:flex-col gap-2">
                                                {status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateStatus(registration, 'approved')}
                                                            disabled={updatingId === regId}
                                                            className="flex-1 md:flex-initial px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs md:text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-1"
                                                        >
                                                            {updatingId === regId ? (
                                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            ) : (
                                                                <Check className="w-3 h-3 md:w-4 md:h-4" />
                                                            )}
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateStatus(registration, 'rejected')}
                                                            disabled={updatingId === regId}
                                                            className="flex-1 md:flex-initial px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs md:text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-1"
                                                        >
                                                            {updatingId === regId ? (
                                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            ) : (
                                                                <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                                                            )}
                                                            Tolak
                                                        </button>
                                                    </>
                                                )}
                                                {status === 'approved' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(registration, 'selesai')}
                                                        disabled={updatingId === regId}
                                                        className="flex-1 md:flex-initial px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs md:text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-1"
                                                    >
                                                        {updatingId === regId ? (
                                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                        ) : (
                                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                                        )}
                                                        Selesai
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}