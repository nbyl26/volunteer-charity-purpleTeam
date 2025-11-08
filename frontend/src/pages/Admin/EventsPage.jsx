import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import api, { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import EventStats from "../../components/admin/events/EventStats";
import EventTable from "../../components/admin/events/EventTable";
import EventFormModal from "../../components/admin/events/EventFormModal";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.EVENTS.LIST);

            const transformedEvents = (res.data || []).map(event => ({
                id: event.ID || event.id,
                title: event.Title || event.title,
                description: event.Description || event.description,
                location: event.Location || event.location,
                event_date: event.EventDate || event.event_date,
                category: event.Category || event.category,
                photo_url: event.PhotoURL || event.photo_url,
                registrations: event.Registrations || event.registrations || [],
                created_at: event.CreatedAt || event.created_at
            }));

            transformedEvents.sort((a, b) => {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            });

            setEvents(transformedEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
            if (error.response?.status === 403) {
                toast.error("Anda tidak memiliki akses admin");
            } else {
                toast.error("Gagal memuat data events");
            }
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.")) {
            return;
        }

        try {
            await api.delete(`/events/${id}`);
            toast.success("Event berhasil dihapus");
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
            if (error.response?.status === 403) {
                toast.error("Anda tidak memiliki izin untuk menghapus event");
            } else if (error.response?.status === 404) {
                toast.error("Event tidak ditemukan");
            } else {
                toast.error("Gagal menghapus event");
            }
        }
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedEvent(null);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const handleSaved = () => {
        fetchEvents();
        handleModalClose();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola Acara</h1>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                        Kelola semua acara dan event yang aktif
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-medium transition shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                    <Plus size={20} />
                    <span className="hidden sm:inline">Tambah Acara</span>
                    <span className="sm:hidden">Tambah</span>
                </button>
            </div>

            <EventStats events={events} />

            <EventTable
                events={events}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showModal && (
                <EventFormModal
                    event={selectedEvent}
                    onClose={handleModalClose}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}