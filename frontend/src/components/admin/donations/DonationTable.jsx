import { Check, X, Eye, Loader2 } from "lucide-react";

export default function DonationTable({ donations, onViewDetail, onVerify, verifying }) {
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

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return "Invalid Date";
        }
    };

    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (donations.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada hasil</h3>
                <p className="text-gray-500 text-sm">
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
                                Donatur
                            </th>
                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Campaign
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nominal
                            </th>
                            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tanggal
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
                        {donations.map((donation) => (
                            <tr key={donation.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 md:px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 font-semibold text-xs md:text-sm">
                                                {donation.user?.name?.charAt(0)?.toUpperCase() || 'D'}
                                            </span>
                                        </div>
                                        <div className="ml-3 md:ml-4">
                                            <div className="text-xs md:text-sm font-medium text-gray-900">
                                                {donation.user?.name || 'Anonymous'}
                                            </div>
                                            <div className="text-xs text-gray-500 hidden md:block">
                                                {donation.user?.email || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs truncate" title={donation.campaign?.title}>
                                        {donation.campaign?.title || 'N/A'}
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-semibold text-gray-900">
                                    {formatCurrency(donation.amount)}
                                </td>
                                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(donation.created_at)}
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
                                        {getStatusText(donation.status)}
                                    </span>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-1 md:gap-2">
                                        <button
                                            onClick={() => onViewDetail(donation)}
                                            className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Lihat Detail"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        
                                        {donation.status?.toLowerCase() === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => onVerify(donation.id, "verified")}
                                                    disabled={verifying === donation.id}
                                                    className="p-1.5 md:p-2 text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
                                                    title="Verifikasi"
                                                >
                                                    {verifying === donation.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Check className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => onVerify(donation.id, "rejected")}
                                                    disabled={verifying === donation.id}
                                                    className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                    title="Tolak"
                                                >
                                                    {verifying === donation.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <X className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </>
                                        )}
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