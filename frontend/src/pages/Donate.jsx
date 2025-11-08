import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";

import DonateHeader from "../components/donate/DonateHeader";
import CampaignInfo from "../components/donate/CampaignInfo";
import DonationForm from "../components/donate/DonationForm";
import SuccessMessage from "../components/donate/SuccessMessage";

export default function Donate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [campaign, setCampaign] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchCampaign();
    }, [id]);

    const fetchCampaign = async () => {
        try {
            setFetching(true);
            const res = await api.get(`/campaigns/${id}`);
            setCampaign(res.data);
        } catch (err) {
            console.error("Error fetching campaign:", err);
            setCampaign(null);
        } finally {
            setFetching(false);
        }
    };

    const handleDonationSubmit = async ({ amount, proof, message }) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("amount", amount);
            formData.append("proof_of_payment", proof);
            if (message) {
                formData.append("message", message);
            }

            await api.post(`/campaigns/${id}/donate`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error("Gagal mengirim donasi:", error);
            alert("Gagal mengirim donasi. Pastikan data valid dan Anda sudah login.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat campaign...</p>
                </div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 bg-gray-50 pt-20">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Campaign Tidak Ditemukan
                </h1>
                <p className="text-gray-600 mb-6 max-w-md">
                    Campaign yang ingin Anda donasikan tidak ditemukan atau sudah tidak aktif.
                </p>
                <button
                    onClick={() => navigate("/campaigns")}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium shadow-md"
                >
                    Kembali ke Daftar Campaign
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 py-20 md:py-24 px-4 md:px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-100">
                <DonateHeader />
                
                <CampaignInfo campaign={campaign} />

                <DonationForm 
                    onSubmit={handleDonationSubmit}
                    loading={loading}
                />

                {success && <SuccessMessage />}
            </div>
        </div>
    );
}