import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import SocialButtons from "../components/SocialButtons";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = login(form.email, form.password);

        setTimeout(() => {
            setLoading(false);

            if (res.success) {
                navigate("/dashboard");
            } else {
                setError(res.message);
            }
        }, 600);
    };

    return (
        <AuthLayout
            title="Selamat datang kembali!"
            subtitle="Masuk untuk melanjutkan perjalanan Anda dengan PurpleCare"
            quote={{
                title: "Menghubungkan Hati, Memberdayakan Perubahan",
                subtitle: "Bergabunglah dengan ribuan relawan yang membuat perubahan setiap hari.",
            }}
        >
            <form onSubmit={handleLogin}>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <AuthInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="test@gmail.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="********"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <div className="text-right mb-4">
                    <Link
                        to="/forgot-password"
                        className="text-purple-400 text-sm hover:underline"
                    >
                        Lupa password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-xl font-semibold text-white transition ${loading
                        ? "bg-purple-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                        }`}
                >
                    {loading ? "Sedang masuk..." : "Masuk"}
                </button>
            </form>

            <SocialButtons />

            <p className="text-center text-gray-400 text-sm mt-6">
                Tidak punya akun?{" "}
                <Link to="/register" className="text-purple-400 hover:underline">
                    Daftar
                </Link>
            </p>
        </AuthLayout>
    );
}