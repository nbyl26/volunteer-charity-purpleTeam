import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, MapPin, Heart } from "lucide-react";

// Simulasi data event nanti bakal ku ganti pake API
const mockEvents = [
    {
        id: "1",
        title: "Hari Bersih-Bersih Komunitas",
        date: "12 November 2025",
        location: "Jakarta Selatan, Indonesia",
        description:
            "Bergabunglah dengan kami membersihkan dan mempercantik area taman setempat untuk meningkatkan kesadaran lingkungan dan keterlibatan komunitas.",
        image:
            "https://images.unsplash.com/photo-1522202222206-7fbe6ecb92d9?auto=format&fit=crop&w=900&q=60",
    },
    {
        id: "2",
        title: "Pengumpulan Makanan untuk Tunawisma",
        date: "20 November 2025",
        location: "Bandung, Indonesia",
        description:
            "Bantu mendistribusikan makanan dan barang-barang penting bagi yang membutuhkan sambil terhubung dengan sesama relawan.",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60",
    },
];

export default function JoinEvent() {
    const { id } = useParams();
    const event = mockEvents.find((e) => e.id === id);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        reason: "",
    });
    const [success, setSuccess] = useState(false);

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                <p>Acara tidak ditemukan.</p>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.phone || !formData.reason) {
            alert("Harap isi semua field sebelum mengirim.");
            return;
        }
        setSuccess(true);
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            reason: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20 px-6">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
                {/* Event Header */}
                <div className="relative">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-lg">
                        {event.title}
                    </h1>
                </div>

                {/* Event Info */}
                <div className="p-8 border-b border-gray-100">
                    <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-purple-600" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-purple-600" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>

                {/* Volunteer Form */}
                <div className="p-8">
                    <div className="flex items-center justify-center mb-6">
                        <Heart className="w-8 h-8 text-purple-600 mr-2" />
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Daftar Jadi Relawan
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Nama lengkap Anda"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="anda@contoh.com"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Nomor Telepon
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="08xxxxxxxxxx"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Mengapa Anda ingin bergabung dengan acara ini?
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Bagikan motivasi Anda..."
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition text-lg"
                        >
                            Kirim Pendaftaran
                        </button>
                    </form>

                    {success && (
                        <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-4 text-center text-green-700 font-medium">
                            ✅ Terima kasih telah bergabung! Kami akan menghubungi Anda segera dengan detail lebih lanjut.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}