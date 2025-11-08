import { useState } from "react";
import { Loader2, Maximize2 } from "lucide-react";

export default function EventHero({ event, onImageClick }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="flex-1">
            <div className="relative group">
                <div className={`relative rounded-2xl shadow-lg overflow-hidden bg-gray-200 ${!imageLoaded ? 'animate-pulse' : ''}`}>
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain transition-opacity duration-300"
                        style={{
                            opacity: imageLoaded ? 1 : 0,
                            minHeight: '300px'
                        }}
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

                <button
                    onClick={onImageClick}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    aria-label="Lihat gambar penuh"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                    Klik ikon <Maximize2 className="w-3 h-3 inline mx-1" /> untuk melihat gambar penuh
                </p>
            </div>
        </div>
    );
}