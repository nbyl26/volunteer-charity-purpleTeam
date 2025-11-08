import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import api from "../../config/api";
import toast from "react-hot-toast";
import EventHeader from "../../components/admin/event-registrations/EventHeader";
import RegistrationStats from "../../components/admin/event-registrations/RegistrationStats";
import RegistrationFilters from "../../components/admin/event-registrations/RegistrationFilters";
import RegistrationTable from "../../components/admin/event-registrations/RegistrationTable";

export default function EventRegistrations() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchEventAndRegistrations();
    }, [eventId]);

    useEffect(() => {
        filterRegistrations();
    }, [searchTerm, statusFilter, registrations]);

    const fetchEventAndRegistrations = async () => {
        try {
            setLoading(true);

            const eventRes = await api.get(`/events/${eventId}`);

            let imageUrl = eventRes.data.PhotoURL || eventRes.data.photo_url;
            if (imageUrl && imageUrl.startsWith('/')) {
                imageUrl = `http://localhost:8080${imageUrl}`;
            }

            const transformedEvent = {
                id: eventRes.data.ID || eventRes.data.id,
                title: eventRes.data.Title || eventRes.data.title,
                description: eventRes.data.Description || eventRes.data.description,
                location: eventRes.data.Location || eventRes.data.location,
                date: eventRes.data.EventDate || eventRes.data.event_date,
                image: imageUrl,
                category: eventRes.data.Category || eventRes.data.category
            };

            setEvent(transformedEvent);

            const registrationsData = eventRes.data.Registrations || [];

            const transformedRegistrations = registrationsData.map(reg => ({
                id: reg.ID || reg.id,
                user_id: reg.UserID || reg.user_id,
                event_id: reg.EventID || reg.event_id,
                status: reg.Status || reg.status || 'pending',
                created_at: reg.CreatedAt || reg.created_at,
                user: {
                    id: reg.User?.ID || reg.User?.id,
                    name: reg.User?.Name || reg.User?.name,
                    email: reg.User?.Email || reg.User?.email,
                    phone: reg.User?.Phone || reg.User?.phone,
                    address: reg.User?.Address || reg.User?.address
                }
            }));

            setRegistrations(transformedRegistrations);

        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response?.status === 403) {
                toast.error("Anda tidak memiliki akses admin");
            } else if (error.response?.status === 404) {
                toast.error("Event tidak ditemukan");
            } else {
                toast.error("Gagal memuat data pendaftaran");
            }
        } finally {
            setLoading(false);
        }
    };

    const filterRegistrations = () => {
        let filtered = [...registrations];

        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(reg =>
                reg.user?.name?.toLowerCase().includes(search) ||
                reg.user?.email?.toLowerCase().includes(search) ||
                reg.user?.phone?.includes(search)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(reg => reg.status === statusFilter);
        }

        setFilteredRegistrations(filtered);
    };

    const handleStatusUpdate = async (registrationId, userId, newStatus) => {
        try {
            setUpdating(registrationId);

            await api.patch(
                `/events/registrations/${registrationId}/approve/${userId}`,
                { status: newStatus }
            );

            toast.success(`Status berhasil diubah menjadi ${getStatusLabel(newStatus)}`);

            setRegistrations(prev =>
                prev.map(reg =>
                    reg.id === registrationId
                        ? { ...reg, status: newStatus }
                        : reg
                )
            );

        } catch (error) {
            console.error("Error updating status:", error);
            const errorMsg = error.response?.data?.error || "Gagal mengubah status";
            toast.error(errorMsg);
        } finally {
            setUpdating(null);
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            'pending': 'Pending',
            'approved': 'Disetujui',
            'rejected': 'Ditolak',
            'selesai': 'Selesai'
        };
        return labels[status] || status;
    };

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const getStats = () => {
        return {
            total: registrations.length,
            pending: registrations.filter(reg => reg.status === 'pending').length,
            approved: registrations.filter(reg => reg.status === 'approved').length,
            rejected: registrations.filter(reg => reg.status === 'rejected').length,
            completed: registrations.filter(reg => reg.status === 'selesai').length
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Tidak Ditemukan</h1>
                    <button
                        onClick={() => navigate("/admin/volunteers")}
                        className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                    >
                        Kembali ke Relawan
                    </button>
                </div>
            </div>
        );
    }

    const stats = getStats();

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate("/admin/volunteers")}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Kembali</span>
                    </button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Kelola Pendaftar</h1>
                </div>

                <EventHeader 
                    event={event} 
                    totalRegistrations={stats.total} 
                    formatDate={formatDate} 
                />

                <RegistrationStats stats={stats} />

                <RegistrationFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                <RegistrationTable
                    registrations={filteredRegistrations}
                    updating={updating}
                    onStatusUpdate={handleStatusUpdate}
                    formatDate={formatDate}
                />
            </div>
        </div>
    );
}