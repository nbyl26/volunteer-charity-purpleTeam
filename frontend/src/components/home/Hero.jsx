import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-img.jpg";
import bgHero from "../assets/bg-hero.svg";
import api from "../config/api";

export default function Hero() {
    const [stats, setStats] = useState({
        totalDonors: 0,
        totalVolunteers: 0,
        totalDonationAmount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHeroStats();
    }, []);

    const fetchHeroStats = async () => {
        try {
            setLoading(true);

            const [usersRes, eventsRes, campaignsRes] = await Promise.all([
                api.get("/users"),
                api.get("/events"),
                api.get("/campaigns"),
            ]);

            console.log("Hero - Users:", usersRes.data);
            console.log("Hero - Events:", eventsRes.data);
            console.log("Hero - Campaigns:", campaignsRes.data);

            const campaigns = Array.isArray(campaignsRes.data) ? campaignsRes.data : [];
            
            const uniqueDonorIds = new Set();
            let totalDonationAmount = 0;

            campaigns.forEach((campaign) => {
                const donations = campaign.Donations || campaign.donations || [];
                donations.forEach((donation) => {
                    const status = (donation.Status || donation.status || "").toLowerCase();
                    
                    if (status === "verified") {
                        const userId = donation.UserID || donation.user_id;
                        if (userId) {
                            uniqueDonorIds.add(userId);
                        }
                        
                        const amount = parseFloat(donation.Amount || donation.amount || 0);
                        totalDonationAmount += amount;
                    }
                });
            });

            const events = Array.isArray(eventsRes.data) ? eventsRes.data : [];
            const uniqueVolunteerIds = new Set();

            events.forEach((event) => {
                const registrations = event.Registrations || event.registrations || [];
                registrations.forEach((reg) => {
                    const status = (reg.Status || reg.status || "").toLowerCase();
                    
                    if (status === "approved" || status === "selesai") {
                        const userId = reg.UserID || reg.user_id;
                        if (userId) {
                            uniqueVolunteerIds.add(userId);
                        }
                    }
                });
            });

            console.log("Unique Donors:", uniqueDonorIds.size);
            console.log("Unique Volunteers:", uniqueVolunteerIds.size);
            console.log("Total Donation Amount:", totalDonationAmount);

            setStats({
                totalDonors: uniqueDonorIds.size,
                totalVolunteers: uniqueVolunteerIds.size,
                totalDonationAmount: totalDonationAmount,
            });

        } catch (error) {
            console.error("❌ Error fetching hero stats:", error);
            setStats({
                totalDonors: 0,
                totalVolunteers: 0,
                totalDonationAmount: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        
        if (amount >= 1000000) {
            const inMillions = (amount / 1000000).toFixed(1);
            return `Rp ${inMillions} Jt`;
        }
        
        if (amount >= 1000) {
            const inThousands = (amount / 1000).toFixed(1);
            return `Rp ${inThousands}rb`;
        }
        
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };

    return (
        <section className="relative bg-gray-10 pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 flex justify-start items-center z-0">
                <img
                    src={bgHero}
                    alt="background globe"
                    className="w-[1200px] max-w-none h-auto opacity-20 -translate-x-40"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Bersama Kita <span className="text-purple-600">Peduli</span>,<br />
                        Bersama Kita <span className="text-purple-600">Berbagi</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-lg">
                        Menghubungkan relawan dan donatur untuk menciptakan dampak nyata
                        di masyarakat. Mari bergabung bersama kami untuk mewujudkan perubahan.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            to="/events"
                            className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition font-medium shadow-md hover:shadow-lg"
                        >
                            Mulai Sekarang
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                        <div className="text-center md:text-left">
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-purple-600 text-2xl font-bold">
                                        {stats.totalDonors > 0 ? `${formatNumber(stats.totalDonors)}+` : "0"}
                                    </p>
                                    <p className="text-gray-600 text-sm">Donatur</p>
                                </>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-purple-600 text-2xl font-bold">
                                        {stats.totalVolunteers > 0 ? formatNumber(stats.totalVolunteers) : "0"}
                                    </p>
                                    <p className="text-gray-600 text-sm">Relawan</p>
                                </>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-purple-600 text-2xl font-bold">
                                        {formatCurrency(stats.totalDonationAmount)}
                                    </p>
                                    <p className="text-gray-600 text-sm">Terkumpul</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <img
                        src={heroImage}
                        alt="Hero"
                        className="w-full h-auto object-cover rounded-l-[80px] shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}