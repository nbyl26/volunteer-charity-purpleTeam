import { useEffect, useState } from "react";
import { Users, Calendar, Heart, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../config/api";
import StatCard from "../../components/admin/analytics/StatCard";
import CampaignPerformanceChart from "../../components/admin/analytics/CampaignPerformanceChart";
import EventStatusChart from "../../components/admin/analytics/EventStatusChart";
import ActivitySummary from "../../components/admin/analytics/ActivitySummary";

const COLORS = {
    green: "#10B981",
    yellow: "#F59E0B",
    blue: "#3B82F6",
    red: "#EF4444",
};

export default function AnalyticsPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalCampaigns: 0,
        totalDonationAmount: 0,
        pendingVolunteers: 0,
        pendingDonations: 0,
        approvedVolunteers: 0,
        verifiedDonations: 0,
        rejectedDonations: 0,
    });
    const [campaignPerformance, setCampaignPerformance] = useState([]);
    const [eventStatus, setEventStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            setError("");

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
            let rejectedVolunteers = 0;
            let completedVolunteers = 0;

            events.forEach((event) => {
                const registrations = event.Registrations || event.registrations || [];
                registrations.forEach((reg) => {
                    const status = (reg.Status || reg.status || "").toLowerCase();
                    if (status === "pending") pendingVolunteers++;
                    else if (status === "approved") approvedVolunteers++;
                    else if (status === "rejected") rejectedVolunteers++;
                    else if (status === "selesai") completedVolunteers++;
                });
            });

            const campaigns = Array.isArray(campaignsRes.data) ? campaignsRes.data : [];
            const totalCampaigns = campaigns.length;

            const campaignPerf = campaigns
                .map((campaign) => ({
                    name: (campaign.Title || campaign.title || "").substring(0, 20),
                    collected: parseFloat(campaign.Collected || campaign.collected || 0),
                    target: parseFloat(campaign.Target || campaign.target || 0),
                    percentage: campaign.Target > 0 
                        ? Math.round((campaign.Collected / campaign.Target) * 100)
                        : 0,
                }))
                .sort((a, b) => b.collected - a.collected)
                .slice(0, 5);

            const totalDonationAmount = campaigns.reduce((sum, campaign) => {
                return sum + parseFloat(campaign.Collected || campaign.collected || 0);
            }, 0);

            let pendingDonations = 0;
            let verifiedDonations = 0;
            let rejectedDonations = 0;

            campaigns.forEach((campaign) => {
                const donations = campaign.Donations || campaign.donations || [];
                donations.forEach((donation) => {
                    const status = (donation.Status || donation.status || "").toLowerCase();
                    if (status === "pending") pendingDonations++;
                    else if (status === "verified") verifiedDonations++;
                    else if (status === "rejected") rejectedDonations++;
                });
            });

            const eventStatusData = [];
            if (pendingVolunteers > 0) eventStatusData.push({ name: "Pending", value: pendingVolunteers, color: COLORS.yellow });
            if (approvedVolunteers > 0) eventStatusData.push({ name: "Approved", value: approvedVolunteers, color: COLORS.green });
            if (rejectedVolunteers > 0) eventStatusData.push({ name: "Rejected", value: rejectedVolunteers, color: COLORS.red });
            if (completedVolunteers > 0) eventStatusData.push({ name: "Selesai", value: completedVolunteers, color: COLORS.blue });

            setStats({
                totalUsers,
                totalEvents,
                totalCampaigns,
                totalDonationAmount,
                pendingVolunteers,
                pendingDonations,
                approvedVolunteers,
                verifiedDonations,
                rejectedDonations,
            });

            setCampaignPerformance(campaignPerf);
            setEventStatus(eventStatusData);

        } catch (err) {
            console.error("Error fetching analytics:", err);
            setError("Gagal memuat data analitik");
            toast.error("Gagal memuat data analitik");
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

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Memuat Data</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchAnalytics}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-sm p-6 md:p-8 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Analitik Platform</h1>
                <p className="text-purple-100 text-sm md:text-base">
                    Laporan lengkap aktivitas dan performa platform PurpleCare
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                    icon={<Users className="w-6 h-6 md:w-8 md:h-8" />}
                    title="Total Pengguna"
                    value={stats.totalUsers}
                    bgColor="bg-blue-50"
                    iconColor="text-blue-600"
                />
                <StatCard
                    icon={<Calendar className="w-6 h-6 md:w-8 md:h-8" />}
                    title="Total Event"
                    value={stats.totalEvents}
                    bgColor="bg-purple-50"
                    iconColor="text-purple-600"
                />
                <StatCard
                    icon={<Heart className="w-6 h-6 md:w-8 md:h-8" />}
                    title="Total Campaign"
                    value={stats.totalCampaigns}
                    bgColor="bg-pink-50"
                    iconColor="text-pink-600"
                />
                <StatCard
                    icon={<TrendingUp className="w-6 h-6 md:w-8 md:h-8" />}
                    title="Total Donasi Terkumpul"
                    value={formatCurrency(stats.totalDonationAmount)}
                    bgColor="bg-green-50"
                    iconColor="text-green-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CampaignPerformanceChart data={campaignPerformance} />
                <EventStatusChart data={eventStatus} />
                <ActivitySummary stats={stats} />

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-100 p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Performa Platform
                            </h3>
                            <p className="text-sm text-gray-600">
                                Platform PurpleCare telah melayani <strong>{stats.totalUsers} pengguna</strong> dengan{" "}
                                <strong>{stats.totalEvents} event</strong> dan{" "}
                                <strong>{stats.totalCampaigns} campaign</strong>. Total donasi yang terkumpul mencapai{" "}
                                <strong>{formatCurrency(stats.totalDonationAmount)}</strong> dari{" "}
                                <strong>{stats.verifiedDonations} donasi terverifikasi</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}