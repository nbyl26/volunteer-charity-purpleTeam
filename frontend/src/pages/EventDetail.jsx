import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Heart } from "lucide-react";
import api, { API_ENDPOINTS } from "../config/api";
import bgHero from "../assets/bg-hero.svg";

import EventHero from "../components/event-detail/EventHero";
import EventInfo from "../components/event-detail/EventInfo";
import EventAbout from "../components/event-detail/EventAbout";
import ImageModal from "../components/event-detail/ImageModal";

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await api.get(API_ENDPOINTS.EVENTS.DETAIL(id));

            let imageUrl = res.data.PhotoURL || res.data.image;

            if (imageUrl && imageUrl.startsWith('/')) {
                imageUrl = `http://localhost:8080${imageUrl}`;
            }

            if (!imageUrl) {
                imageUrl = "/default-event.jpg";
            }

            const transformedEvent = {
                id: res.data.ID || res.data.id,
                title: res.data.Title || res.data.title,
                description: res.data.Description || res.data.description,
                location: res.data.Location || res.data.location,
                date: res.data.EventDate,
                image: imageUrl,
                category: res.data.Category || res.data.category,
                registrations: res.data.Registrations || []
            };

            setEvent(transformedEvent);
        } catch (err) {
            console.error("Error fetching event:", err);
            if (err.response?.status === 404) {
                setError("Event tidak ditemukan");
            } else {
                setError("Gagal memuat detail event. Silakan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return "Tanggal tidak valid";

            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const getVolunteerCount = () => {
        if (!event?.registrations) return 0;
        return event.registrations.filter(reg =>
            reg.Status === 'approved' || reg.Status === 'selesai'
        ).length;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-purple-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-sm md:text-base">Memuat detail acara...</p>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 bg-gray-50 pt-20">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Acara Tidak Ditemukan
                </h1>
                <p className="text-gray-600 mb-6 max-w-md text-sm md:text-base">
                    {error || "Acara yang Anda cari tidak ditemukan."}
                </p>
                <button
                    onClick={() => navigate("/events")}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium shadow-md"
                >
                    Kembali ke Acara
                </button>
            </div>
        );
    }

    const volunteerCount = getVolunteerCount();

    return (
        <div className="relative bg-gray-50 min-h-screen">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <img src={bgHero} alt="background globe" className="w-[900px] -translate-x-20 select-none" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Kembali</span>
                </button>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-10 items-start">
                    <EventHero 
                        event={event}
                        onImageClick={() => setShowImageModal(true)}
                    />

                    <EventInfo
                        event={event}
                        volunteerCount={volunteerCount}
                        formatDate={formatDate}
                    />
                </div>

                <EventAbout />
            </div>

            {showImageModal && (
                <ImageModal
                    image={event.image}
                    title={event.title}
                    onClose={() => setShowImageModal(false)}
                />
            )}
        </div>
    );
}