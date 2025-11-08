import { TrendingUp, HeartHandshake } from "lucide-react";

export default function PlatformSummary({ stats, formatCurrency }) {
    const summaryItems = [
        { label: "Total Events", value: stats.totalEvents },
        { label: "Total Campaigns", value: stats.totalCampaigns },
        { label: "Donasi Terverifikasi", value: stats.verifiedDonations, color: "text-green-600" },
        { label: "Total Donasi Terkumpul", value: formatCurrency(stats.totalDonationAmount), color: "text-purple-600" },
    ];

    const totalPending = stats.pendingVolunteers + stats.pendingDonations;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Ringkasan Platform
                </h3>
                <div className="space-y-4">
                    {summaryItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between pb-3 ${index < summaryItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                            <span className="text-sm text-gray-600">{item.label}</span>
                            <span className={`text-lg font-semibold ${item.color || 'text-gray-900'}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-100 p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        <HeartHandshake className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Platform PurpleCare Berjalan Lancar
                        </h3>
                        <p className="text-sm text-gray-600">
                            Sistem berjalan normal. {totalPending > 0
                                ? `Terdapat ${totalPending} item yang perlu ditinjau.`
                                : "Semua verifikasi telah selesai."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}