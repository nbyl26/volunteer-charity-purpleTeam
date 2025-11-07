import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../config/api";
import DonationStats from "../../components/admin/donations/DonationStats";
import DonationFilters from "../../components/admin/donations/DonationFilters";
import DonationTable from "../../components/admin/donations/DonationTable";
import DonationDetailModal from "../../components/admin/DonationDetailModal";

export default function DonationsPage() {
    const [donations, setDonations] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchDonations();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [donations, searchTerm, statusFilter]);

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const response = await api.get("/donations");
            
            const processedDonations = (response.data || []).map(donation => ({
                id: donation.id,
                amount: donation.amount,
                status: (donation.status || 'pending').toLowerCase(),
                proof_url: donation.proof_of_payment,
                message: donation.message,
                created_at: donation.created_at,
                user: {
                    id: donation.user?.id,
                    name: donation.user?.name || 'Anonymous',
                    email: donation.user?.email || 'N/A'
                },
                campaign: {
                    id: donation.campaign?.id,
                    title: donation.campaign?.title || 'N/A'
                }
            }));

            processedDonations.sort((a, b) => {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            });

            setDonations(processedDonations);
            setFilteredDonations(processedDonations);

        } catch (error) {
            console.error("Error fetching donations:", error);
            toast.error("Gagal memuat data donasi");
            setDonations([]);
            setFilteredDonations([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...donations];

        if (statusFilter !== "all") {
            filtered = filtered.filter(donation => 
                donation.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (searchTerm.trim()) {
            const keyword = searchTerm.toLowerCase();
            filtered = filtered.filter(donation =>
                donation.user?.name?.toLowerCase().includes(keyword) ||
                donation.campaign?.title?.toLowerCase().includes(keyword) ||
                donation.user?.email?.toLowerCase().includes(keyword)
            );
        }

        setFilteredDonations(filtered);
    };

    const handleVerify = async (id, status) => {
        if (!id) {
            toast.error("ID donasi tidak valid");
            return;
        }

        try {
            setVerifying(id);
            await api.patch(`/donations/${id}/verify`, { status });
            
            toast.success(`Donasi berhasil ${status === 'verified' ? 'diverifikasi' : 'ditolak'}`);
            
            setDonations(prev => 
                prev.map(donation => 
                    donation.id === id ? { ...donation, status } : donation
                )
            );

        } catch (error) {
            console.error("Error verifying donation:", error);
            const errorMsg = error.response?.data?.error || "Gagal memverifikasi donasi";
            toast.error(errorMsg);
        } finally {
            setVerifying(null);
        }
    };

    const calculateStats = () => ({
        total: donations.length,
        pending: donations.filter(d => d.status?.toLowerCase() === 'pending').length,
        verified: donations.filter(d => d.status?.toLowerCase() === 'verified').length,
        rejected: donations.filter(d => d.status?.toLowerCase() === 'rejected').length
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola Donasi</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Verifikasi dan kelola semua donasi yang masuk
                </p>
            </div>

            <DonationStats stats={calculateStats()} />

            <DonationFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <DonationTable
                donations={filteredDonations}
                onViewDetail={setSelectedDonation}
                onVerify={handleVerify}
                verifying={verifying}
            />

            {selectedDonation && (
                <DonationDetailModal
                    donation={selectedDonation}
                    onClose={() => setSelectedDonation(null)}
                />
            )}
        </div>
    );
}