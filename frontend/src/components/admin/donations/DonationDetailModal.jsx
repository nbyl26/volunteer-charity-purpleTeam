import React from "react";
import { X, ImageIcon, Calendar, User, Heart } from "lucide-react";

export default function DonationDetailModal({ donation, onClose }) {
    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const getStatusText = (status) => {
        const statusMap = {
            'pending': 'Pending',
            'verified': 'Terverifikasi',
            'rejected': 'Ditolak'
        };
        return statusMap[status?.toLowerCase()] || status;
    };

    const getStatusColor = (status) => {
        const colorMap = {
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'verified': 'bg-green-100 text-green-800 border-green-200',
            'rejected': 'bg-red-100 text-red-800 border-red-200'
        };
        return colorMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getProofUrl = () => {
        if (!donation.proof_url) return null;
        
        if (donation.proof_url.startsWith('http')) {
            return donation.proof_url;
        }
        
        return `http://localhost:8080${donation.proof_url}`;
    };

    const proofUrl = getProofUrl();

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition"
                >
                    <X size={20} />
                </button>
                
                <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-600" />
                    Detail Donasi
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-600" />
                            Informasi Donatur
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-medium text-gray-600">Nama:</span>
                                <p className="text-gray-900 mt-1">{donation.user?.name || 'Anonymous'}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Email:</span>
                                <p className="text-gray-900 mt-1">{donation.user?.email || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">User ID:</span>
                                <p className="text-gray-900 mt-1">{donation.user?.id || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-700 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            Informasi Donasi
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-medium text-gray-600">Campaign:</span>
                                <p className="text-gray-900 mt-1">{donation.campaign?.title || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Nominal:</span>
                                <p className="text-gray-900 mt-1 font-semibold text-lg">
                                    {formatCurrency(donation.amount)}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Tanggal:</span>
                                <p className="text-gray-900 mt-1">{formatDate(donation.created_at)}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Status:</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mt-1 ${getStatusColor(donation.status)}`}>
                                    {getStatusText(donation.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {donation.message && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-700 mb-2">Pesan dari Donatur:</h3>
                        <p className="text-gray-600 text-sm italic">"{donation.message}"</p>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-3">Bukti Transfer:</h3>
                    {proofUrl ? (
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <img
                                src={proofUrl}
                                alt="Bukti transfer"
                                className="w-full h-auto max-h-96 object-contain bg-gray-50"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Tidak+Ditemukan';
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-gray-400 py-8 border-2 border-dashed border-gray-200 rounded-lg">
                            <ImageIcon size={24} />
                            <span>Tidak ada bukti transfer</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}