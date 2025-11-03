import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image */}
            <div className="h-52 w-full overflow-hidden relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                />

                {/* Overlay gradient subtle for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                {/* Date */}
                <span className="inline-block text-xs text-purple-600 bg-purple-50 font-medium rounded-full px-3 py-1 mb-3">
                    {event.date}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 flex-grow mb-4 line-clamp-3">
                    {event.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="text-sm text-gray-500">{event.location || "Daring / Campuran"}</div>
                    <Link
                        to={`/events/${event.id}`}
                        className="inline-flex items-center gap-2 text-purple-600 font-medium hover:underline"
                    >
                        Lihat Detail <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}