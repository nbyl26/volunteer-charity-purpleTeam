import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleReset = (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });
        setLoading(true);

        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.find((u) => u.email === email);

            setLoading(false);

            if (userExists) {
                // Simulasi kirim link reset password
                setStatus({
                    type: "success",
                    message:
                        "Link reset password telah dikirim ke email Anda. (Simulasi — lihat konsol untuk pratinjau)",
                });

                console.log(
                    `🔗 Simulated reset link for ${email}: http://localhost:5173/reset-password?email=${email}`
                );
            } else {
                setStatus({
                    type: "error",
                    message: "Email tidak ditemukan. Harap periksa dan coba lagi.",
                });
            }
        }, 800);
    };

    return (
        <AuthLayout
            title="Lupa Password?"
            subtitle="Masukkan email Anda untuk menerima link reset password."
            quote={{
                title: "Setiap aksi peduli dimulai dengan langkah maju.",
                subtitle: "Kami akan membantu Anda kembali ke jalur.",
            }}
        >
            <form onSubmit={handleReset}>
                {status.message && (
                    <div
                        className={`p-3 rounded-md text-sm mb-4 text-center ${status.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {status.message}
                    </div>
                )}

                <AuthInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="anda@contoh.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-xl font-semibold text-white transition ${loading
                        ? "bg-purple-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                        }`}
                >
                    {loading ? "Mengirim..." : "Kirim Link Reset"}
                </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
                Ingat password Anda?{" "}
                <Link to="/login" className="text-purple-400 hover:underline">
                    Masuk
                </Link>
            </p>
        </AuthLayout>
    );
}