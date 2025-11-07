import React, { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const response = await fetch(API_ENDPOINTS.CONTACT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({
                    type: "success",
                    message: data.message || "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
                });
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus({
                    type: "error",
                    message: data.error || "Gagal mengirim pesan. Silakan coba lagi.",
                });
            }
        } catch (error) {
            console.error("Contact form error:", error);
            setStatus({
                type: "error",
                message: "Terjadi kesalahan koneksi. Silakan coba lagi nanti.",
            });
        } finally {
            setLoading(false);
        }
    };

    const inputClasses =
        "w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-sm";

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6"
        >
            <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    Kirim Pesan
                </h2>
                <p className="text-sm text-gray-600">
                    Isi formulir di bawah ini dan kami akan merespons secepatnya.
                </p>
            </div>

            {status.message && (
                <div
                    className={`flex items-start gap-3 p-4 rounded-lg text-sm animate-fadeIn ${
                        status.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                >
                    {status.type === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p>{status.message}</p>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className={inputClasses}
                    required
                    minLength={2}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contoh@email.com"
                    className={inputClasses}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pesan atau pertanyaan Anda..."
                    rows="5"
                    className={`${inputClasses} resize-none`}
                    required
                    minLength={10}
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                    Minimal 10 karakter • {formData.message.length} karakter
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                    loading
                        ? "bg-purple-400 cursor-not-allowed text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-md"
                }`}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Mengirim...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        <span>Kirim Pesan</span>
                    </>
                )}
            </button>

            <p className="text-xs text-gray-500 text-center">
                Dengan mengirim pesan, Anda menyetujui{" "}
                <a href="#" className="text-purple-600 hover:underline">
                    Kebijakan Privasi
                </a>{" "}
                kami.
            </p>
        </form>
    );
}