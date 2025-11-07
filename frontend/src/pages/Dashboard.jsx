import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Calendar, Heart, CheckCircle, DollarSign, Loader2, LogOut } from "lucide-react";
import api from "../config/api";
import toast from "react-hot-toast";

import StatsCard from "../components/dashboard/StatsCard";
import EventRegistrationList from "../components/dashboard/EventRegistrationList";
import DonationHistoryList from "../components/dashboard/DonationHistoryList";
import ProfileCard from "../components/dashboard/ProfileCard";
import ActivitySummary from "../components/dashboard/ActivitySummary";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEvents: 0,
        approvedEvents: 0,
        pendingEvents: 0,
        completedEvents: 0,
        totalDonations: 0,
        totalDonationAmount: 0,
        verifiedDonations: 0,
        pendingDonations: 0,
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/users/me");
            console.log("Profile data:", res.data);

            setProfile(res.data);
            calculateStats(res.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Gagal memuat data profil");
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const eventRegistrations = data.event_registrations || [];
        const donations = data.donations || [];

        const approvedEvents = eventRegistrations.filter(
            (reg) => (reg.Status || reg.status) === "approved"
        ).length;
        const pendingEvents = eventRegistrations.filter(
            (reg) => (reg.Status || reg.status) === "pending"
        ).length;
        const completedEvents = eventRegistrations.filter(
            (reg) => (reg.Status || reg.status) === "selesai"
        ).length;

        let totalDonationAmount = 0;
        let verifiedDonations = 0;
        let pendingDonations = 0;

        donations.forEach((donation) => {
            const status = (donation.Status || donation.status || "").toLowerCase();
            const amount = parseFloat(donation.Amount || donation.amount || 0);

            if (status === "verified") {
                verifiedDonations++;
                totalDonationAmount += amount;
            } else if (status === "pending") {
                pendingDonations++;
            }
        });

        setStats({
            totalEvents: eventRegistrations.length,
            approvedEvents,
            pendingEvents,
            completedEvents,
            totalDonations: donations.length,
            totalDonationAmount,
            verifiedDonations,
            pendingDonations,
        });
    };

    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Berhasil logout");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    const statsCards = [
        {
            icon: Calendar,
            label: "Event Diikuti",
            value: stats.totalEvents,
            badge: "Total",
            color: {
                bg: "bg-purple-100",
                icon: "text-purple-600",
                badge: "bg-purple-50 text-purple-700",
            },
        },
        {
            icon: CheckCircle,
            label: "Event Disetujui",
            value: stats.approvedEvents,
            badge: "Approved",
            color: {
                bg: "bg-green-100",
                icon: "text-green-600",
                badge: "bg-green-50 text-green-700",
            },
        },
        {
            icon: Heart,
            label: "Donasi Diberikan",
            value: stats.totalDonations,
            badge: "Total",
            color: {
                bg: "bg-pink-100",
                icon: "text-pink-600",
                badge: "bg-pink-50 text-pink-700",
            },
        },
        {
            icon: DollarSign,
            label: "Total Donasi",
            value: formatCurrency(stats.totalDonationAmount),
            badge: "Verified",
            color: {
                bg: "bg-blue-100",
                icon: "text-blue-600",
                badge: "bg-blue-50 text-blue-700",
            },
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 md:py-24 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
                                <span className="text-2xl md:text-3xl font-bold">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">
                                    Selamat Datang, {user?.name?.split(" ")[0] || "User"}!
                                </h1>
                                <p className="text-purple-100 text-sm md:text-base mt-1">
                                    Berikut ringkasan aktivitas Anda di PurpleCare
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate("/events")}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition text-sm font-medium"
                            >
                                <Calendar className="w-4 h-4 inline mr-2" />
                                Lihat Event
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition text-sm font-medium"
                            >
                                <LogOut className="w-4 h-4 inline mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {statsCards.map((card, index) => (
                        <StatsCard key={index} {...card} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    Pendaftaran Event Saya
                                </h2>
                                <button
                                    onClick={() => navigate("/events")}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Lihat Semua →
                                </button>
                            </div>
                            <EventRegistrationList registrations={profile?.event_registrations} />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    Riwayat Donasi
                                </h2>
                                <button
                                    onClick={() => navigate("/campaigns")}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Donasi Lagi →
                                </button>
                            </div>
                            <DonationHistoryList donations={profile?.donations} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <ProfileCard profile={profile} user={user} />
                        <ActivitySummary stats={stats} />
                        <QuickActions />
                    </div>
                </div>
            </div>
        </div>
    );
}