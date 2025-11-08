import { CalendarDays, MapPin } from "lucide-react";

export default function EventDetails({ event, formatDate }) {
    return (
        <div className="p-4 md:p-8 border-b border-gray-100">
            <div className="flex flex-wrap gap-3 md:gap-4 mb-4 text-gray-600 text-sm md:text-base">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" />
                    <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" />
                    <span>{event.location || "Online / Hybrid"}</span>
                </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {event.description}
            </p>
        </div>
    );
}