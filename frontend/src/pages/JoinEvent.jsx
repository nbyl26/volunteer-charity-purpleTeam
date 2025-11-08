import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Loader2, ArrowLeft } from "lucide-react";
import api, { API_ENDPOINTS } from "../config/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import EventHero from "../components/join-event/EventHero";
import EventDetails from "../components/join-event/EventDetails";
import RegistrationForm from "../components/join-event/RegistrationForm";
import SuccessMessage from "../components/join-event/SuccessMessage";

export default function JoinEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.EVENTS.DETAIL(id));

            let imageUrl = res.data.PhotoURL || res.data.image;

            if (imageUrl && imageUrl.startsWith("/")) {
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
            };

            setEvent(transformedEvent);
        } catch (err) {
            console.error("Error fetching event:", err);
            if (err.response?.status === 404) {
                setError("Event tidak ditemukan");
            } else {
                setError("Gagal memuat data event. Silakan coba lagi.");
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

    const handleSubmit = async (e) => {
        e?.preventDefault();

        if (!user) {
            toast.error("Silakan login terlebih dahulu untuk bergabung dengan event");
            navigate("/login");
            return;
        }

        setSubmitting(true);

        try {
            await api.post(API_ENDPOINTS.EVENTS.JOIN(id));

            toast.success("Berhasil mendaftar sebagai relawan! Status Anda: Pending");
            setSuccess(true);

            setTimeout(() => {
                navigate("/events");
            }, 3000);
        } catch (err) {
            console.error("Error joining event:", err);

            if (err.response?.status === 409) {
                toast.error("Anda sudah terdaftar untuk event ini");
                setTimeout(() => {
                    navigate("/events");
                }, 2000);
            } else if (err.response?.status === 401) {
                toast.error("Sesi login telah berakhir. Silakan login kembali.");
                localStorage.removeItem("token");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else if (err.response?.status === 403) {
                toast.error("Anda tidak memiliki izin untuk mendaftar event ini");
            } else if (err.response?.status === 404) {
                toast.error("Event tidak ditemukan");
            } else if (err.code === "NETWORK_ERROR" || !err.response) {
                toast.error("Koneksi internet bermasalah. Silakan coba lagi.");
            } else {
                toast.error("Gagal mendaftar. Silakan coba lagi.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-purple-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-sm md:text-base">Memuat event...</p>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4 md:px-6">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Event Tidak Ditemukan
                    </h1>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">
                        {error || "Event yang Anda cari tidak ditemukan."}
                    </p>
                    <button
                        onClick={() => navigate("/events")}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                        Kembali ke Events
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20 md:py-24 px-4 md:px-6">
            <div className="max-w-5xl mx-auto mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali
                </button>
            </div>

            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
                <EventHero event={event} />

                <EventDetails event={event} formatDate={formatDate} />

                <div className="p-4 md:p-8">
                    <div className="flex items-center justify-center mb-6">
                        <Heart className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mr-2" />
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                            Daftar Jadi Relawan
                        </h2>
                    </div>

                    <RegistrationForm
                        user={user}
                        event={event}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        success={success}
                    />

                    {success && <SuccessMessage />}
                </div>
            </div>
        </div>
    );
}