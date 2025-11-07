import { Edit, Trash2 } from "lucide-react";

export default function CampaignTable({ campaigns, onEdit, onDelete }) {
    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(dateString);
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

    if (campaigns.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
                <div className="text-gray-500">
                    <div className="text-lg font-medium mb-2">Belum ada campaign</div>
                    <p className="text-sm">Mulai dengan membuat campaign pertama Anda</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Campaign
                            </th>
                            <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Target
                            </th>
                            <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Terkumpul
                            </th>
                            <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Progress
                            </th>
                            <th className="px-4 md:px-6 py-3 md:py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {campaigns.map((campaign) => {
                            const progress = campaign.target > 0 ? 
                                (campaign.collected / campaign.target) * 100 : 0;
                            
                            return (
                                <tr 
                                    key={campaign.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 md:px-6 py-4">
                                        <div className="max-w-xs md:max-w-md">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-medium text-gray-500">
                                                    #{campaign.id}
                                                </span>
                                                <div className="font-semibold text-gray-900 text-sm truncate">
                                                    {campaign.title || "Judul Tidak Tersedia"}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500 line-clamp-2 mb-1">
                                                {campaign.description || "Tidak ada deskripsi"}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                Dibuat {formatDate(campaign.created_at)}
                                            </div>
                                            <div className="md:hidden mt-2 space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-500">Target:</span>
                                                    <span className="font-semibold text-gray-900">
                                                        {formatCurrency(campaign.target)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-500">Terkumpul:</span>
                                                    <span className="font-semibold text-green-600">
                                                        {formatCurrency(campaign.collected)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {formatCurrency(campaign.target)}
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-green-600">
                                            {formatCurrency(campaign.collected)}
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                                            <div className="w-full md:w-24 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full transition-all ${
                                                        progress >= 100 ? 'bg-green-500' : 'bg-purple-600'
                                                    }`}
                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                />
                                            </div>
                                            <span className={`text-xs font-medium ${
                                                progress >= 100 ? 'text-green-600' : 'text-gray-600'
                                            }`}>
                                                {progress.toFixed(1)}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-1 md:gap-2">
                                            <button
                                                onClick={() => onEdit(campaign)}
                                                className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Edit Campaign"
                                            >
                                                <Edit className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(campaign.id)}
                                                className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Hapus Campaign"
                                            >
                                                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
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