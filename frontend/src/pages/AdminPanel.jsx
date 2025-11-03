import React from "react";
import { useAuth } from "../context/AuthContext";
import { CalendarPlus, Users, BarChart3 } from "lucide-react";

export default function AdminPanel() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-purple-700 mb-2">
                        Panel Admin
                    </h1>
                    <p className="text-gray-600">
                        Halo, <span className="font-semibold">{user?.email}</span> 👋 <br />
                        Kelola acara, pengguna, dan lihat analitik platform di sini.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Manage Events */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 hover:shadow-md transition">
                        <div className="flex items-center justify-center mb-4">
                            <CalendarPlus className="w-10 h-10 text-purple-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
                            Kelola Acara
                        </h2>
                        <p className="text-gray-500 text-sm text-center mb-4">
                            Tambah, edit, dan hapus acara relawan yang akan datang.
                        </p>
                        <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition">
                            Ke Acara
                        </button>
                    </div>

                    {/* Manage Users */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 hover:shadow-md transition">
                        <div className="flex items-center justify-center mb-4">
                            <Users className="w-10 h-10 text-coral-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
                            Kelola Pengguna
                        </h2>
                        <p className="text-gray-500 text-sm text-center mb-4">
                            Lihat dan kelola data relawan dan donatur.
                        </p>
                        <button className="w-full py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-xl font-medium transition">
                            Lihat Pengguna
                        </button>
                    </div>

                    {/* Analytics */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 hover:shadow-md transition">
                        <div className="flex items-center justify-center mb-4">
                            <BarChart3 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
                            Analitik
                        </h2>
                        <p className="text-gray-500 text-sm text-center mb-4">
                            Pantau partisipasi dan kinerja dampak.
                        </p>
                        <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition">
                            Lihat Laporan
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-16 bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Statistik Platform
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="text-3xl font-bold text-purple-600">128</p>
                            <p className="text-gray-500 text-sm">Relawan Aktif</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-coral-500">42</p>
                            <p className="text-gray-500 text-sm">Total Acara</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-green-500">Rp 87,5Jt</p>
                            <p className="text-gray-500 text-sm">Dana Terkumpul</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}