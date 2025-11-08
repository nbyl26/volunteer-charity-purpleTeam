import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import SocialButtons from "../components/SocialButtons";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
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
        <AuthLayout
            title="Buat akun"
            subtitle="Bergabunglah dengan komunitas PurpleCare dan mulai perjalanan Anda."
            quote={{
                title: "Bersama Kita Peduli, Bersama Kita Tumbuh",
                subtitle: "Jadikan setiap aksi kebaikan berarti.",
            }}
        >
            <form onSubmit={handleRegister}>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <AuthInput
                        label="Nama Depan"
                        type="text"
                        name="firstName"
                        placeholder="Mas"
                        required
                        value={form.firstName}
                        onChange={(e) => {
                            setForm({ ...form, firstName: e.target.value })
                        }}
                    />
                    <AuthInput
                        label="Nama Belakang"
                        type="text"
                        name="lastName"
                        placeholder="Fuad"
                        required
                        value={form.lastName}
                        onChange={(e) =>
                            setForm({ ...form, lastName: e.target.value })
                        }
                    />
                </div>

                <AuthInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="[email protected]"
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
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-xl font-semibold text-white transition ${loading
                        ? "bg-purple-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                        }`}
                >
                    {loading ? "Membuat Akun..." : "Buat Akun"}
                </button>
            </form>

            <SocialButtons />

            <p className="text-center text-gray-400 text-sm mt-6">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-purple-400 hover:underline">
                    Masuk
                </Link>
            </p>
        </AuthLayout>
    );
}