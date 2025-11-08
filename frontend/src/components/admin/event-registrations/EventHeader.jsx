import { Calendar, MapPin, Users } from "lucide-react";

export default function EventHeader({ event, totalRegistrations, formatDate }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
                {event.image && event.image !== "/default-event.jpg" && (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full lg:w-24 h-48 lg:h-24 rounded-lg object-cover"
                    />
                )}
                <div className="flex-1 w-full">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {event.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm md:text-base">
                        {event.description}
                    </p>
                    <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>{totalRegistrations} Pendaftar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}