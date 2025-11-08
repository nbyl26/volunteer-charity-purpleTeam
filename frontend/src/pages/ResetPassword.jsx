import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../config/api";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const tokenParam = searchParams.get("token");
        if (!tokenParam) {
            toast.error("Token tidak valid");
            navigate("/login");
        } else {
            setToken(tokenParam);
        }
    }, [searchParams, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error("Password minimal 6 karakter");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password tidak cocok");
            return;
        }

        setLoading(true);

        try {
            await api.post("/auth/reset-password", { token, password });
            
            toast.success("Password berhasil direset! Silakan login.");
            navigate("/login");
        } catch (error) {
            console.error("Reset password error:", error);
            const errorMsg = error.response?.data?.error || "Gagal reset password";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Masukkan password baru Anda"
            quote={{
                title: "Password Baru, Harapan Baru",
                subtitle: "Buat password yang kuat dan mudah diingat untuk keamanan akun Anda.",
            }}
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <AuthInput
                    label="Password Baru"
                    type="password"
                    name="password"
                    placeholder="Minimal 6 karakter"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <AuthInput
                    label="Konfirmasi Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Ulangi password baru"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Mereset Password...
                        </div>
                    ) : (
                        "Reset Password"
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link
                    to="/login"
                    className="text-gray-400 hover:text-gray-300 text-sm transition"
                >
                    ← Kembali ke Login
                </Link>
            </div>
        </AuthLayout>
    );
}