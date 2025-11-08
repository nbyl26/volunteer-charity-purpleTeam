import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";

export default function PendingReviews({ stats }) {
    const navigate = useNavigate();

    const reviews = [
        {
            label: "Volunteer Pending",
            value: stats.pendingVolunteers,
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-100",
            textColor: "text-yellow-700",
            buttonColor: "bg-yellow-600 hover:bg-yellow-700",
            action: () => navigate("/admin/volunteers"),
        },
        {
            label: "Donasi Pending",
            value: stats.pendingDonations,
            bgColor: "bg-orange-50",
            borderColor: "border-orange-100",
            textColor: "text-orange-700",
            buttonColor: "bg-orange-600 hover:bg-orange-700",
            action: () => navigate("/admin/donations"),
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-yellow-600" />
                Perlu Ditinjau
            </h3>
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between p-4 ${review.bgColor} rounded-lg border ${review.borderColor}`}
                    >
                        <div>
                            <p className="text-sm text-gray-600">{review.label}</p>
                            <p className={`text-2xl font-bold ${review.textColor}`}>
                                {review.value}
                            </p>
                        </div>
                        <button
                            onClick={review.action}
                            className={`px-4 py-2 ${review.buttonColor} text-white rounded-lg text-sm font-medium transition`}
                        >
                            Review
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}