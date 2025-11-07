import { X, User, Calendar, DollarSign, FileText, Image as ImageIcon } from "lucide-react";

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
            return "Invalid Date";
        }
    };

    const getStatusColor = (status) => {
        const colorMap = {
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'verified': 'bg-green-100 text-green-800 border-green-200',
            'rejected': 'bg-red-100 text-red-800 border-red-200'
        };
        return colorMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusText = (status) => {
        const statusMap = {
            'pending': 'Pending',
            'verified': 'Terverifikasi',
            'rejected': 'Ditolak'
        };
        return statusMap[status?.toLowerCase()] || status;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Detail Donasi</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(donation.status)}`}>
                            {getStatusText(donation.status)}
                        </span>
                        <span className="text-2xl font-bold text-purple-600">
                            {formatCurrency(donation.amount)}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">Donatur</span>
                            </div>
                            <div className="pl-6">
                                <p className="font-semibold text-gray-900">{donation.user?.name || 'Anonymous'}</p>
                                <p className="text-sm text-gray-500">{donation.user?.email || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Tanggal Donasi</span>
                            </div>
                            <p className="pl-6 text-gray-900">{formatDate(donation.created_at)}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm font-medium">Campaign</span>
                        </div>
                        <p className="pl-6 text-gray-900">{donation.campaign?.title || 'N/A'}</p>
                    </div>

                    {donation.message && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <FileText className="w-4 h-4" />
                                <span className="text-sm font-medium">Pesan</span>
                            </div>
                            <p className="pl-6 text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                                {donation.message}
                            </p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">Bukti Pembayaran</span>
                        </div>
                        {donation.proof_url ? (
                            <div className="pl-6">
                                <img
                                    src={donation.proof_url}
                                    alt="Bukti Pembayaran"
                                    className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm"
                                />
                                <a
                                    href={donation.proof_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-purple-600 hover:text-purple-700 mt-2 inline-block"
                                >
                                    Buka di tab baru →
                                </a>
                            </div>
                        ) : (
                            <p className="pl-6 text-gray-500 text-sm">Tidak ada bukti pembayaran</p>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}