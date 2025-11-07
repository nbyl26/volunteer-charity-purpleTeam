import { ArrowRight } from "lucide-react";
import bgGlobe from "../assets/bg-hero.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api, { API_ENDPOINTS } from "../config/api";
import { Loader2 } from "lucide-react";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
                const res = await api.get(API_ENDPOINTS.EVENTS.LIST);
                console.log("Homepage Events data:", res.data);

                const latestEvents = (res.data || []).slice(0, 3).map(event => {
                    let imageUrl = event.PhotoURL || event.image;

                    if (imageUrl && imageUrl.startsWith('/')) {
                        imageUrl = `http://localhost:8080${imageUrl}`;
                    }

                    if (!imageUrl) {
                        imageUrl = "/default-event.jpg";
                    }

                    return {
                        id: event.ID || event.id,
                        title: event.Title || event.title,
                        description: event.Description || event.description,
                        date: event.EventDate,
                        image: imageUrl
                    };
                });

                setEvents(latestEvents);
            } catch (err) {
                console.error("Gagal memuat events untuk homepage:", err);
                setError("Gagal memuat data events");
                setEvents([]);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    const formatDate = (isoString) => {
        if (!isoString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return "Tanggal tidak valid";

            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric"
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    if (loading) {
        return (
            <section className="relative bg-white py-24 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative bg-white py-24 overflow-hidden">
            <div className="absolute inset-0 flex justify-start items-center opacity-10 pointer-events-none">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[800px] h-auto -ml-20"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                    <div>
                        <span className="text-sm uppercase text-purple-600 font-semibold tracking-wide">
                            Kegiatan
                        </span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                            Acara & Informasi Terbaru
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="text-gray-600 text-sm mb-4">
                            Dapatkan informasi terbaru mengenai aktivitas, acara, dan program
                            kerelawanan kami yang menciptakan dampak nyata.
                        </p>

                        <Link
                            to="/events"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium"
                        >
                            Lihat Semua Acara →
                        </Link>
                    </div>
                </div>

                {events.length === 0 && !loading ? (
                    <div className="text-center py-12 text-gray-500">
                        Tidak ada acara yang tersedia saat ini.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
                            >
                                <div className="h-52 w-full overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = "/default-event.jpg";
                                        }}
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs text-purple-600 bg-purple-50 font-medium rounded-full px-3 py-1 w-fit mb-3">
                                        {formatDate(event.date)}
                                    </span>
                                    <h3 className="font-semibold text-lg text-gray-900 leading-snug mb-2 line-clamp-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                                        {event.description}
                                    </p>

                                    <Link
                                        to={`/events/${event.id}`}
                                        className="mt-4 inline-flex items-center text-purple-600 font-medium hover:underline"
                                    >
                                        Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}