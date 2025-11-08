import React, { useEffect, useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import api, { API_ENDPOINTS } from "../config/api";
import bgGlobe from "../assets/bg-hero.svg";
import toast from "react-hot-toast";

import CampaignHeader from "../components/campaigns/CampaignHeader";
import CampaignFilters from "../components/campaigns/CampaignFilters";
import CampaignCard from "../components/campaigns/CampaignCard";
import EmptyState from "../components/campaigns/EmptyState";

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await api.get(API_ENDPOINTS.CAMPAIGNS.LIST);
            console.log("✅ Campaigns data:", res.data);

            const transformedCampaigns = (res.data || []).map((campaign) => ({
                id: campaign.ID || campaign.id,
                title: campaign.Title || campaign.title,
                description: campaign.Description || campaign.description,
                target: campaign.Target || campaign.target,
                collected: campaign.Collected || campaign.collected,
                created_at: campaign.CreatedAt || campaign.created_at,
            }));

            setCampaigns(transformedCampaigns);
        } catch (err) {
            console.error("Error fetching campaigns:", err);
            setError("Gagal memuat data campaign");
            toast.error("Gagal memuat data campaign");
            setCampaigns([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredCampaigns = useMemo(() => {
        let list = [...campaigns];

        if (searchQuery.trim()) {
            const keyword = searchQuery.toLowerCase();
            list = list.filter(
                (campaign) =>
                    campaign.title?.toLowerCase().includes(keyword) ||
                    campaign.description?.toLowerCase().includes(keyword)
            );
        }

        list.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            switch (sortBy) {
                case "newest":
                    return dateB - dateA;
                case "oldest":
                    return dateA - dateB;
                case "most_funded":
                    return (b.collected || 0) - (a.collected || 0);
                case "closest_target":
                    const progressA = a.target > 0 ? (a.collected / a.target) * 100 : 0;
                    const progressB = b.target > 0 ? (b.collected / b.target) * 100 : 0;
                    return progressB - progressA;
                default:
                    return 0;
            }
        });

        return list;
    }, [campaigns, searchQuery, sortBy]);

    const handleResetSearch = () => {
        setSearchQuery("");
        setSortBy("newest");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Terjadi Kesalahan
                    </h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetchCampaigns}
                        className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[1000px] -translate-x-32 select-none"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                    <CampaignHeader />
                    <CampaignFilters
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>

                {filteredCampaigns.length === 0 ? (
                    <EmptyState hasSearch={searchQuery.trim() !== ""} onReset={handleResetSearch} />
                ) : (
                    <>
                        <div className="mb-6 text-sm text-gray-600">
                            Menampilkan <span className="font-semibold text-purple-600">{filteredCampaigns.length}</span> campaign
                            {searchQuery && ` untuk "${searchQuery}"`}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredCampaigns.map((campaign, index) => (
                                <CampaignCard key={campaign.id} campaign={campaign} index={index} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}