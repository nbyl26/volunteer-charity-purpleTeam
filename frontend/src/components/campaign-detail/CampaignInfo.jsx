import { Calendar, Users, Target } from "lucide-react";

export default function CampaignInfo({ campaign, donationCount, progress, formatDate }) {
    const info = [
        {
            icon: Calendar,
            label: "Dibuat",
            value: formatDate(campaign.created_at)
        },
        {
            icon: Users,
            label: "Total Donatur",
            value: `${donationCount} orang`
        },
        {
            icon: Target,
            label: "Status",
            value: progress >= 100 ? 'Target Tercapai' : 'Dalam Penggalangan'
        }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Informasi Campaign</h3>
            <div className="space-y-4">
                {info.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600 truncate">{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}