import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../config/api";
import AuthInput from "./AuthInput";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/auth/forgot-password", { email });

            toast.success("Link reset password telah dikirim ke email Anda");
            setSuccess(true);

            if (res.data.reset_link) {
                console.log("🔗 Reset link:", res.data.reset_link);
                console.log("📋 Copy link ini dan paste di browser untuk reset password");
            }

            setEmail("");
        } catch (error) {
            console.error("Forgot password error:", error);
            toast.error("Gagal mengirim link reset. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md bg-[#1F1935] rounded-2xl shadow-2xl p-8 border border-white/10"
        >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-8 text-center"
            >
                <h1 className="text-3xl font-bold text-white mb-2">
                    Lupa Password?
                </h1>
                <p className="text-gray-400 text-sm">
                    Masukkan email Anda untuk menerima link reset password
                </p>
            </motion.div>

            {success && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-green-400 mb-1">Email Terkirim!</p>
                            <p className="text-green-300/80 text-xs">
                                Silakan cek inbox atau spam folder Anda untuk link reset password.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <AuthInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="nama@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Mengirim...
                        </div>
                    ) : (
                        "Kirim Link Reset"
                    )}
                </button>
            </form>

            <div className="mt-8 space-y-4 text-center">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-[#1F1935] text-gray-400">atau</span>
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <p className="text-gray-400">
                        Ingat password Anda?{" "}
                        <Link
                            to="/login"
                            className="text-purple-400 hover:text-purple-300 font-semibold transition"
                        >
                            Masuk
                        </Link>
                    </p>
                    <p className="text-gray-400">
                        Belum punya akun?{" "}
                        <Link
                            to="/register"
                            className="text-purple-400 hover:text-purple-300 font-semibold transition"
                        >
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>

                <Link
                    to="/"
                    className="block mt-4 text-gray-500 hover:text-gray-300 text-sm transition"
                >
                    ← Kembali ke Beranda
                </Link>
            </div>
        </motion.div>
    );
}