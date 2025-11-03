import React from "react";
import { useAuth } from "../context/AuthContext";
import { Calendar, HeartHandshake, User } from "lucide-react";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20 px-6">
            <div className="max-w-5xl mx-auto text-center">
                {/* Header */}
                <h1 className="text-3xl font-bold text-purple-700 mb-2">
                    Selamat datang kembali {user?.firstName || user?.email?.split("@")[0]} !
                </h1>
                <p className="text-gray-600 mb-12">
                    Berikut ringkasan aktivitas dan progres PurpleCare Anda.
                </p>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Total Events */}
                    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition">
                        <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-800">3 Acara Diikuti</h3>
                        <p className="text-sm text-gray-500 mt-1">Teruskan semangatnya!</p>
                    </div>

                    {/* Volunteer Hours */}
                    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition">
                        <HeartHandshake className="w-8 h-8 text-coral-500 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-800">12 Jam Berkontribusi</h3>
                        <p className="text-sm text-gray-500 mt-1">Anda membuat perubahan yang nyata!</p>
                    </div>

                    {/* Profile */}
                    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition">
                        <User className="w-8 h-8 text-green-500 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-800">Status Profil</h3>
                        <p className="text-sm text-gray-500 mt-1">80% Lengkap</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 my-12"></div>

                {/* Profile Summary */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 max-w-3xl mx-auto text-left">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Profil Saya</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Nama Lengkap</label>
                            <p className="font-medium text-gray-800">
                                {user?.firstName} {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Email</label>
                            <p className="font-medium text-gray-800">{user?.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Bergabung Sejak</label>
                            <p className="font-medium text-gray-800">Oktober 2025</p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Tipe Akun</label>
                            <p className="font-medium text-gray-800 capitalize">
                                {user?.role || "Relawan"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}