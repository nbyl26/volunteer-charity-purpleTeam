import { Calendar, Target } from "lucide-react";

export default function CampaignInfo({ campaign }) {
    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Tanggal tidak valid";
            
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const campaignDate = campaign.CreatedAt || campaign.created_at || campaign.createdAt;

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-purple-700 mb-3">
                {campaign.Title || campaign.title}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Dibuka sejak {formatDate(campaignDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Program Donasi</span>
                </div>
            </div>
        </div>
    );
}