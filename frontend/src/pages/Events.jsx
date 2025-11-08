import { useMemo, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import api, { API_ENDPOINTS } from "../config/api";
import bgGlobe from "../assets/bg-hero.svg";
import toast from "react-hot-toast";

import EventsHeader from "../components/events/EventsHeader";
import EventsFilters from "../components/events/EventsFilters";
import EventsGrid from "../components/events/EventsGrid";
import EmptyState from "../components/events/EmptyState";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await api.get(API_ENDPOINTS.EVENTS.LIST);

            const transformedEvents = (res.data || []).map(event => {
                let imageUrl = event.PhotoURL || event.photo_url || event.image;

                if (imageUrl && imageUrl.startsWith('/')) {
                    imageUrl = `http://localhost:8080${imageUrl}`;
                }

                if (!imageUrl) {
                    imageUrl = "/default-event.jpg";
                }

                return {
                    id: event.ID || event.id,
                    title: event.Title || event.title,
                    description: event.Description || event.description,
                    location: event.Location || event.location,
                    date: event.EventDate || event.event_date,
                    image: imageUrl,
                    category: event.Category || event.category,
                    created_at: event.CreatedAt || event.created_at
                };
            });

            setEvents(transformedEvents);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError("Gagal memuat data events");
            toast.error("Gagal memuat data events");
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const categories = useMemo(() => {
        const cats = new Set(events.map((e) => e.category || "Uncategorized"));
        return ["All", ...Array.from(cats)];
    }, [events]);

    const filteredEvents = useMemo(() => {
        let list = [...events];

        if (searchTerm.trim()) {
            const keyword = searchTerm.toLowerCase();
            list = list.filter(
                (e) =>
                    e.title.toLowerCase().includes(keyword) ||
                    e.description.toLowerCase().includes(keyword) ||
                    (e.location || "").toLowerCase().includes(keyword)
            );
        }

        if (category !== "All") {
            list = list.filter((e) => (e.category || "Uncategorized") === category);
        }

        list.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sort === "newest" ? dateB - dateA : dateA - dateB;
        });

        return list;
    }, [events, searchTerm, category, sort]);

    const formatDate = (isoString) => {
        if (!isoString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return "Tanggal tidak valid";
            return date.toISOString().split('T')[0];
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const handleResetSearch = () => {
        setSearchTerm("");
        setCategory("All");
        setSort("newest");
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
                        onClick={fetchEvents}
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
                    <EventsHeader />
                    
                    <EventsFilters
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        category={category}
                        onCategoryChange={setCategory}
                        categories={categories}
                        sort={sort}
                        onSortChange={setSort}
                    />
                </div>

                {filteredEvents.length === 0 ? (
                    <EmptyState 
                        hasEvents={events.length > 0} 
                        hasSearch={searchTerm.trim() !== "" || category !== "All"}
                        onReset={handleResetSearch}
                    />
                ) : (
                    <>
                        <div className="mb-6 text-sm text-gray-600">
                            Menampilkan <span className="font-semibold text-purple-600">{filteredEvents.length}</span> acara
                            {searchTerm && ` untuk "${searchTerm}"`}
                            {category !== "All" && ` dalam kategori "${category}"`}
                        </div>

                        <EventsGrid 
                            events={filteredEvents} 
                            formatDate={formatDate}
                        />
                    </>
                )}
            </div>
        </section>
    );
}