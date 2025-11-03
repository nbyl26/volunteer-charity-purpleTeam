import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../data/events";
import { Upload, Heart, QrCode, Calendar, MapPin } from "lucide-react";
import qrCodeImage from "../assets/QR-Donate.jpg";

export default function Donate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = events.find((e) => String(e.id) === id);

    const [amount, setAmount] = useState("");
    const [proof, setProof] = useState(null);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        setProof(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || !proof) {
            alert("Harap isi semua field dan unggah bukti transfer.");
            return;
        }

        setSuccess(true);
        setAmount("");
        setProof(null);
        setMessage("");

        setTimeout(() => setSuccess(false), 4000);
    };

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Acara Tidak Ditemukan</h1>
                <p className="text-gray-500 mb-8">Acara yang ingin Anda donasikan tidak ditemukan.</p>
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
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-24 px-6">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-10 border border-gray-100">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <Heart className="w-10 h-10 text-purple-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Berikan Donasi</h1>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Kontribusi Anda membantu kami mewujudkan acara ini dan mendukung komunitas yang membutuhkan
                    </p>
                </div>

                {/* Event Summary */}
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-10">
                    <h2 className="text-lg font-semibold text-purple-700 mb-1">{event.title}</h2>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span>
                                {new Date(event.date).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span>{event.location || "Online / Hybrid"}</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Jumlah Donasi (Rp)
                        </label>
                        <input
                            type="number"
                            min="1000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="contoh: 50000"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none"
                            required
                        />
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-center">
                        <div className="flex justify-center mb-4">
                            <QrCode className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="font-semibold text-purple-700 mb-2">Scan QR Code untuk Donasi</h2>
                        <img
                            src={qrCodeImage}
                            alt="QR Code Donasi"
                            className="mx-auto w-48 h-48 object-contain rounded-lg border border-purple-200 shadow-sm"
                        />
                        <p className="text-sm text-gray-500 mt-3">
                            Selesaikan pembayaran Anda, lalu unggah buktinya di bawah.
                        </p>
                    </div>

                    {/* Upload Proof */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Unggah Bukti Transfer
                        </label>
                        <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-6 cursor-pointer hover:border-purple-400 transition">
                            <Upload className="w-6 h-6 text-gray-400 mr-2" />
                            <span className="text-gray-500 text-sm">
                                {proof ? proof.name : "Klik untuk mengunggah gambar (JPG, PNG)"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                        </label>
                    </div>

                    {/* Optional Message */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Pesan (opsional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            placeholder="Tulis pesan atau dedikasi singkat..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition text-lg"
                    >
                        Kirim Donasi
                    </button>
                </form>

                {/* Success Message */}
                {success && (
                    <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-4 text-center text-green-700 font-medium animate-fadeIn">
                        ✅ Terima kasih atas donasi Anda! Kami akan memverifikasi kontribusi Anda segera.
                    </div>
                )}
            </div>
        </div>
    );
}