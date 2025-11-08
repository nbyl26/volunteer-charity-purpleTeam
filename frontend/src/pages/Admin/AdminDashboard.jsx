import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import api from "../../config/api";
import toast from "react-hot-toast";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import PendingReviews from "../../components/admin/dashboard/PendingReviews";
import PlatformSummary from "../../components/admin/dashboard/PlatformSummary";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalCampaigns: 0,
        totalDonationAmount: 0,
        pendingVolunteers: 0,
        pendingDonations: 0,
        approvedVolunteers: 0,
        verifiedDonations: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);

            const [usersRes, eventsRes, campaignsRes] = await Promise.all([
                api.get("/users"),
                api.get("/events"),
                api.get("/campaigns"),
            ]);

            const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;

            const events = Array.isArray(eventsRes.data) ? eventsRes.data : [];
            const totalEvents = events.length;

            let pendingVolunteers = 0;
            let approvedVolunteers = 0;

            events.forEach((event) => {
                const registrations = event.Registrations || event.registrations || [];
                registrations.forEach((reg) => {
                    const status = (reg.Status || reg.status || "").toLowerCase();
                    if (status === "pending") pendingVolunteers++;
                    else if (status === "approved" || status === "selesai") approvedVolunteers++;
                });
            });

            const campaigns = Array.isArray(campaignsRes.data) ? campaignsRes.data : [];
            const totalCampaigns = campaigns.length;

            const totalDonationAmount = campaigns.reduce((sum, campaign) => {
                const collected = parseFloat(campaign.Collected || campaign.collected || 0);
                return sum + collected;
            }, 0);

            let pendingDonations = 0;
            let verifiedDonations = 0;

            campaigns.forEach((campaign) => {
                const donations = campaign.Donations || campaign.donations || [];
                donations.forEach((donation) => {
                    const status = (donation.Status || donation.status || "").toLowerCase();
                    if (status === "pending") {
                        pendingDonations++;
                    } else if (status === "verified") {
                        verifiedDonations++;
                    }
                });
            });

            setStats({
                totalUsers,
                totalEvents,
                totalCampaigns,
                totalDonationAmount,
                pendingVolunteers,
                pendingDonations,
                approvedVolunteers,
                verifiedDonations,
            });
        } catch (error) {
            console.error("Error fetching admin dashboard stats:", error);
            toast.error("Gagal memuat statistik");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-sm p-6 md:p-8 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard Admin</h1>
                <p className="text-purple-100 text-sm md:text-base">
                    Selamat datang kembali! Berikut ringkasan platform PurpleCare hari ini.
                </p>
            </div>

            <DashboardStats stats={stats} formatCurrency={formatCurrency} />

            <QuickActions />

            <PendingReviews stats={stats} />

            <PlatformSummary stats={stats} formatCurrency={formatCurrency} />
        </div>
    );
}