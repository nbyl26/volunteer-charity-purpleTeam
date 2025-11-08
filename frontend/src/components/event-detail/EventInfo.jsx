import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";

export default function EventInfo({ event, volunteerCount, formatDate }) {
    const navigate = useNavigate();

    return (
        <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {event.title}
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                {event.description}
            </p>

            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                    <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                    <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>{event.location || "Online / Hybrid"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                    <Users className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Perkiraan {volunteerCount} relawan</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => navigate(`/join-event/${event.id}`)}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-semibold shadow-md hover:shadow-lg text-sm md:text-base"
                >
                    Jadi Relawan
                </button>
            </div>
        </div>
    );
}