import { Target, Heart, Users } from "lucide-react";

export default function CampaignStats({ campaign, progress, donationCount, formatCurrency }) {
    const stats = [
        {
            icon: Target,
            label: "Target",
            value: formatCurrency(campaign.target),
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600"
        },
        {
            icon: Heart,
            label: "Terkumpul",
            value: formatCurrency(campaign.collected),
            bgColor: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            icon: Users,
            label: "Donatur",
            value: `${donationCount} orang`,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            icon: null,
            label: "Progress",
            value: `${progress.toFixed(1)}%`,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
            displayProgress: true
        }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Campaign</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            {stat.displayProgress ? (
                                <div className={`text-sm font-semibold ${stat.iconColor}`}>
                                    {progress.toFixed(0)}%
                                </div>
                            ) : (
                                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-600 mb-1">{stat.label}</div>
                            <div className="text-base font-normal text-gray-900 truncate" title={stat.value}>
                                {stat.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}