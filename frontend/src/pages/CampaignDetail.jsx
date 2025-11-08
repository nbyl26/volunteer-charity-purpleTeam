import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import api, { API_ENDPOINTS } from "../config/api";

import CampaignHero from "../components/campaign-detail/CampaignHero";
import CampaignAbout from "../components/campaign-detail/CampaignAbout";
import CampaignStats from "../components/campaign-detail/CampaignStats";
import RecentDonations from "../components/campaign-detail/RecentDonations";
import CampaignInfo from "../components/campaign-detail/CampaignInfo";
import DonateCard from "../components/campaign-detail/DonateCard";

export default function CampaignDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCampaign();
    }, [id]);

    const fetchCampaign = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await api.get(API_ENDPOINTS.CAMPAIGNS.DETAIL(id));

            const transformedCampaign = {
                id: res.data.ID || res.data.id,
                title: res.data.Title || res.data.title,
                description: res.data.Description || res.data.description,
                target: res.data.Target || res.data.target,
                collected: res.data.Collected || res.data.collected,
                created_at: res.data.CreatedAt || res.data.created_at,
                donations: res.data.donations || []
            };

            setCampaign(transformedCampaign);
        } catch (err) {
            console.error("Error fetching campaign:", err);
            if (err.response?.status === 404) {
                setError("Campaign tidak ditemukan");
            } else {
                setError("Gagal memuat detail campaign. Silakan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Tanggal tidak valid";

            return date.toLocaleDateString('id-ID', {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat campaign...</p>
                </div>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white pt-20 px-6">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">{error || "Campaign yang Anda cari tidak ditemukan."}</p>
                    <button
                        onClick={() => navigate("/campaigns")}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                        Kembali ke Campaign
                    </button>
                </div>
            </div>
        );
    }

    const progress = campaign.target > 0 ? (campaign.collected / campaign.target) * 100 : 0;
    const donationCount = campaign.donations?.length || 0;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                <button
                    onClick={() => navigate("/campaigns")}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali ke Daftar Campaign
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 pb-12">
                <CampaignHero 
                    campaign={campaign} 
                    progress={progress} 
                    formatCurrency={formatCurrency} 
                />

                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <CampaignAbout description={campaign.description} />

                        <CampaignStats
                            campaign={campaign}
                            progress={progress}
                            donationCount={donationCount}
                            formatCurrency={formatCurrency}
                        />

                        <RecentDonations
                            donations={campaign.donations}
                            formatDate={formatDate}
                            formatCurrency={formatCurrency}
                        />
                    </div>

                    <div className="space-y-6">
                        <CampaignInfo
                            campaign={campaign}
                            donationCount={donationCount}
                            progress={progress}
                            formatDate={formatDate}
                        />

                        <DonateCard campaignId={campaign.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}