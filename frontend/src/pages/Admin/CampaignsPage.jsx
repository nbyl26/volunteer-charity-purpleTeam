import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api, { API_ENDPOINTS } from "../../config/api";
import CampaignStats from "../../components/admin/campaigns/CampaignStats";
import CampaignTable from "../../components/admin/campaigns/CampaignTable";
import CampaignFormModal from "../../components/admin/campaigns/CampaignFormModal";

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await api.get(API_ENDPOINTS.CAMPAIGNS.LIST);
            
            const transformedCampaigns = (res.data || []).map(campaign => ({
                id: campaign.ID || campaign.id,
                title: campaign.Title || campaign.title,
                description: campaign.Description || campaign.description,
                target: campaign.Target || campaign.target,
                collected: campaign.Collected || campaign.collected,
                created_at: campaign.CreatedAt || campaign.created_at
            }));
            
            setCampaigns(transformedCampaigns);
        } catch (error) {
            const errorMessage = error.response?.status === 403 
                ? "Anda tidak memiliki akses admin"
                : "Gagal memuat data campaign";
            
            toast.error(errorMessage);
            setError(errorMessage);
            setCampaigns([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus campaign ini? Tindakan ini tidak dapat dibatalkan.")) return;
        
        try {
            await api.delete(API_ENDPOINTS.CAMPAIGNS.DELETE(id));
            toast.success("Campaign berhasil dihapus");
            fetchCampaigns();
        } catch (err) {
            if (err.response?.status === 403) {
                toast.error("Anda tidak memiliki izin untuk menghapus campaign");
            } else if (err.response?.status === 404) {
                toast.error("Campaign tidak ditemukan");
            } else {
                toast.error("Gagal menghapus campaign");
            }
        }
    };

    const handleEdit = (campaign) => {
        setSelectedCampaign(campaign);
        setShowModal(true);
    };

    const handleAdd = () => {
        setSelectedCampaign(null);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedCampaign(null);
    };

    const handleSaved = () => {
        fetchCampaigns();
        setShowModal(false);
        setSelectedCampaign(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (error && campaigns.length === 0) {
        return (
            <div className="p-4 md:p-6">
                <div className="text-center py-12">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchCampaigns}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola Campaign</h1>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                        Kelola semua campaign donasi yang aktif
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-medium transition shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                    <Plus className="w-5 h-5" />
                    <span>Tambah Campaign</span>
                </button>
            </div>

            <CampaignStats campaigns={campaigns} />

            <CampaignTable 
                campaigns={campaigns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showModal && (
                <CampaignFormModal
                    campaign={selectedCampaign}
                    onClose={handleModalClose}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}