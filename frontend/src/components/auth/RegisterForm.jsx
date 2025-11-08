import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import AuthInput from "./AuthInput";

export default function RegisterForm() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Password tidak cocok");
            return;
        }

        if (form.password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        if (!form.agree) {
            setError("Anda harus menyetujui Syarat & Ketentuan");
            return;
        }

        setLoading(true);

        const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`;

        try {
            await register(fullName, form.email, form.password);
            navigate("/login");
        } catch (err) {
            console.error("Register error:", err);
            setError("Gagal mendaftar. Email mungkin sudah digunakan.");
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
                    Buat Akun Baru
                </h1>
                <p className="text-gray-400 text-sm">
                    Bergabunglah dengan komunitas PurpleCare
                </p>
            </motion.div>

            <form onSubmit={handleRegister} className="space-y-4">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <AuthInput
                        label="Nama Depan"
                        type="text"
                        name="firstName"
                        placeholder="Nama Depan"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                    <AuthInput
                        label="Nama Belakang"
                        type="text"
                        name="lastName"
                        placeholder="Nama Belakang"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                </div>

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
                    placeholder="Minimal 6 karakter"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <AuthInput
                    label="Konfirmasi Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Ulangi password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />

                <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                        className="w-4 h-4 mt-0.5 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                    />
                    <span className="group-hover:text-gray-300 transition leading-relaxed">
                        Saya setuju dengan{" "}
                        <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                            Syarat & Ketentuan
                        </Link>{" "}
                        dan{" "}
                        <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                            Kebijakan Privasi
                        </Link>
                    </span>
                </label>

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
                        "Buat Akun"
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Sudah punya akun?{" "}
                    <Link
                        to="/login"
                        className="text-purple-400 hover:text-purple-300 font-semibold transition"
                    >
                        Masuk
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