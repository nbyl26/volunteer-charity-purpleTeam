import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function EventHero({ event }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="relative">
            <div className="w-full h-60 md:h-72 bg-gray-200 relative overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                        !imageLoaded ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                        e.target.src = "/default-event.jpg";
                        setImageLoaded(true);
                    }}
                />

                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                    </div>
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <h1 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-2xl md:text-3xl font-bold text-white drop-shadow-lg max-w-2xl px-2">
                {event.title}
            </h1>
        </div>
    );
}