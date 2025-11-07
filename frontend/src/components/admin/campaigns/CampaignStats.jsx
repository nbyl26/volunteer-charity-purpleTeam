export default function CampaignStats({ campaigns }) {
    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const totalCollected = campaigns.reduce((sum, c) => sum + (c.collected || 0), 0);
    const totalTarget = campaigns.reduce((sum, c) => sum + (c.target || 0), 0);
    const completedCampaigns = campaigns.filter(c => c.target > 0 && (c.collected / c.target) >= 1).length;

    const stats = [
        {
            label: "Total Campaign",
            value: campaigns.length,
            color: "text-gray-900"
        },
        {
            label: "Total Terkumpul",
            value: formatCurrency(totalCollected),
            color: "text-green-600"
        },
        {
            label: "Total Target",
            value: formatCurrency(totalTarget),
            color: "text-purple-600"
        },
        {
            label: "Campaign Tercapai",
            value: completedCampaigns,
            color: "text-blue-600"
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className={`text-xl md:text-2xl font-bold ${stat.color} truncate`}>
                        {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 mt-1">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}