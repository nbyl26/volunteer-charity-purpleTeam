import { Heart } from "lucide-react";

export default function RecentDonations({ donations, formatDate, formatCurrency }) {
    if (!donations || donations.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Donasi Terbaru</h3>
            <div className="space-y-4">
                {donations.slice(0, 5).map((donation, index) => (
                    <div key={donation.id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Heart className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="font-semibold text-gray-900 truncate">
                                    {donation.user?.name || 'Donatur Anonim'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {formatDate(donation.created_at)}
                                </div>
                            </div>
                        </div>
                        <div className="text-base md:text-lg font-bold text-green-600 ml-2">
                            {formatCurrency(donation.amount)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}