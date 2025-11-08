import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import AuthInput from "./AuthInput";

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setError("Email atau password salah.");
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
                    Masuk ke Akun
                </h1>
                <p className="text-gray-400 text-sm">
                    Masukkan kredensial Anda untuk melanjutkan
                </p>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <AuthInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="nama@email.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                        />
                        <span className="group-hover:text-gray-300 transition">Ingat saya</span>
                    </label>
                    <Link
                        to="/forgot-password"
                        className="text-purple-400 hover:text-purple-300 transition"
                    >
                        Lupa password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Memproses...
                        </div>
                    ) : (
                        "Masuk"
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Belum punya akun?{" "}
                    <Link
                        to="/register"
                        className="text-purple-400 hover:text-purple-300 font-semibold transition"
                    >
                        Daftar Sekarang
                    </Link>
                </p>
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