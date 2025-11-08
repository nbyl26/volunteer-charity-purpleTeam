import { TrendingUp } from "lucide-react";

export default function CampaignAbout({ description }) {
    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                Tentang Campaign
            </h2>
            <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}