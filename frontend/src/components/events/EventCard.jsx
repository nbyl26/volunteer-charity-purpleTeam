import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }) {
    return (
        <Link
            to={`/events/${event.id}`}
            className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
        >
            <div className="relative overflow-hidden h-48 flex-shrink-0">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = "/default-event.jpg";
                    }}
                />
                {event.category && (
                    <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        {event.category}
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition line-clamp-2 min-h-[3.5rem]">
                    {event.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {event.description}
                </p>

                <div className="space-y-2 mt-auto">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-purple-600" />
                        <span className="truncate">{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-purple-600" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}