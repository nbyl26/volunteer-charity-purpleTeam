import { useParams, useNavigate } from "react-router-dom";
import { events } from "../data/events";
import { ArrowLeft, Calendar, MapPin, Users, Heart } from "lucide-react";
import bgHero from "../assets/bg-hero.svg";

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Ambil event berdasarkan id
    const event = events.find((e) => e.id === id);

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Acara Tidak Ditemukan</h1>
                <p className="text-gray-500 mb-8">Acara yang Anda cari tidak ditemukan.</p>
                <button
                    onClick={() => navigate("/events")}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                >
                    Kembali ke Acara
                </button>
            </div>
        );
    }

    return (
        <div className="relative bg-gray-50 min-h-screen">
            {/* Background Globe */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <img src={bgHero} alt="globe" className="w-[900px] -translate-x-20" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-16">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6"
                >
                    <ArrowLeft className="w-4 h-4" /> Kembali
                </button>

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    <div className="flex-1">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">{event.title}</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <span>
                                    {new Date(event.date).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-5 h-5 text-purple-600" />
                                <span>{event.location || "Online / Hybrid"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Users className="w-5 h-5 text-purple-600" />
                                <span>Perkiraan {Math.floor(Math.random() * 200 + 50)} relawan</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate(`/join-event/${event.id}`)}
                                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                            >
                                Jadi Relawan
                            </button>

                            <button
                                onClick={() => navigate(`/donate/${event.id}`)}
                                className="px-6 py-3 border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition flex items-center gap-2"
                            >
                                <Heart className="w-4 h-4" /> Donasi Sekarang
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tentang Acara Ini</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Acara ini bertujuan untuk menyatukan relawan, donatur, dan anggota komunitas
                        untuk menciptakan dampak yang berarti. Anda dapat bergabung sebagai relawan,
                        memberikan donasi, atau membantu menyebarkan kesadaran.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cara Anda Dapat Membantu</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Berpartisipasi sebagai relawan selama acara berlangsung.</li>
                        <li>Donasi untuk membantu mendanai perlengkapan dan logistik.</li>
                        <li>Bagikan acara ini untuk menjangkau lebih banyak orang.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}