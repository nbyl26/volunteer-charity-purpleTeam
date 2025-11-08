import { Heart, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm({ user, event, onSubmit, submitting, success }) {
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                    Silakan login untuk mendaftar sebagai relawan
                </p>
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium text-sm md:text-base"
                >
                    Login Sekarang
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-blue-700 text-xs md:text-sm">
                    <strong>Info:</strong> Pendaftaran akan menggunakan data profil Anda.
                    Status pendaftaran akan ditinjau oleh admin.
                </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                        Data Profil Anda
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
                        <div>
                            <span className="text-gray-600">Nama:</span>
                            <p className="font-medium truncate">{user.name}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Email:</span>
                            <p className="font-medium truncate">{user.email}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">User ID:</span>
                            <p className="font-medium">{user.id}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onSubmit}
                    disabled={submitting || success}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition text-base md:text-lg"
                >
                    {submitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Mendaftarkan...
                        </div>
                    ) : success ? (
                        "Pendaftaran Berhasil!"
                    ) : (
                        "Daftar sebagai Relawan"
                    )}
                </button>
            </div>
        </>
    );
}