import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";
import api, { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import VolunteerStats from "../../components/admin/volunteers/VolunteerStats";
import VolunteerSearch from "../../components/admin/volunteers/VolunteerSearch";
import EventCard from "../../components/admin/volunteers/EventCard";
import RegistrationModal from "../../components/admin/volunteers/RegistrationModal";

export default function VolunteersPage() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEventsWithRegistrations();
    }, []);

    useEffect(() => {
        applySearch();
    }, [searchTerm, events]);

    const fetchEventsWithRegistrations = async () => {
        try {
            setLoading(true);
            const res = await api.get(API_ENDPOINTS.EVENTS.LIST);
            console.log("Events data:", res.data);

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
            setFilteredEvents(transformedEvents);

        } catch (error) {
            console.error("Error fetching events:", error);
            if (error.response?.status === 403) {
                toast.error("Anda tidak memiliki akses admin");
            } else {
                toast.error("Gagal memuat data events");
            }
            setEvents([]);
            setFilteredEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const applySearch = () => {
        if (!searchTerm.trim()) {
            setFilteredEvents(events);
            return;
        }

        const keyword = searchTerm.toLowerCase();
        const filtered = events.filter(event =>
            event.title?.toLowerCase().includes(keyword) ||
            event.location?.toLowerCase().includes(keyword) ||
            event.category?.toLowerCase().includes(keyword)
        );
        setFilteredEvents(filtered);
    };

    const calculateOverallStats = () => {
        return events.reduce((acc, event) => {
            const registrations = event.registrations || [];
            return {
                total: acc.total + registrations.length,
                pending: acc.pending + registrations.filter(reg =>
                    (reg.Status || reg.status || '').toLowerCase() === 'pending'
                ).length,
                approved: acc.approved + registrations.filter(reg =>
                    (reg.Status || reg.status || '').toLowerCase() === 'approved'
                ).length,
                rejected: acc.rejected + registrations.filter(reg =>
                    (reg.Status || reg.status || '').toLowerCase() === 'rejected'
                ).length,
                completed: acc.completed + registrations.filter(reg =>
                    (reg.Status || reg.status || '').toLowerCase() === 'selesai'
                ).length
            };
        }, { total: 0, pending: 0, approved: 0, rejected: 0, completed: 0 });
    };

    const handleManageClick = (event) => {
        setSelectedEvent(event);
    };

    const handleModalClose = () => {
        setSelectedEvent(null);
        fetchEventsWithRegistrations();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    const overallStats = calculateOverallStats();

    return (
        <div className="p-4 md:p-6">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola Relawan</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Kelola pendaftaran relawan untuk semua acara
                </p>
            </div>

            <VolunteerStats stats={overallStats} />

            <VolunteerSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onManageClick={handleManageClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {events.length === 0 ? "Belum ada acara" : "Tidak ada hasil pencarian"}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {events.length === 0
                            ? "Belum ada acara yang dibuat."
                            : "Coba ubah kata kunci pencarian."
                        }
                    </p>
                </div>
            )}

            {selectedEvent && (
                <RegistrationModal
                    event={selectedEvent}
                    onClose={handleModalClose}
                    onUpdate={fetchEventsWithRegistrations}
                />
            )}
        </div>
    );
}