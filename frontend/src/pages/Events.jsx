import React, { useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import { events as eventsData } from "../data/events";
import bgGlobe from "../assets/bg-hero.svg";

export default function Events() {
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("newest");

    const categories = useMemo(() => {
        const cats = new Set(eventsData.map((e) => e.category || "Uncategorized"));
        return ["All", ...Array.from(cats)];
    }, []);

    const filtered = useMemo(() => {
        let list = [...eventsData];

        if (q.trim()) {
            const keyword = q.toLowerCase();
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
            const da = new Date(a.date).getTime();
            const db = new Date(b.date).getTime();
            return sort === "newest" ? db - da : da - db;
        });

        return list;
    }, [q, category, sort]);

    return (
        <section className="relative bg-white text-gray-800 min-h-screen">
            {/* Background Globe */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[900px] -translate-x-32 select-none"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                    <div className="space-y-3">
                        <span className="text-sm uppercase text-purple-600 font-semibold tracking-wide">
                            Acara
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Acara Mendatang & Peluang Relawan
                        </h1>
                        <p className="text-gray-600 max-w-xl">
                            Jelajahi acara, peluang relawan, dan program donasi yang menciptakan
                            dampak nyata bagi komunitas. Filter atau cari untuk menemukan yang sesuai dengan Anda.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Cari acara atau lokasi..."
                            className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 w-full md:w-56"
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="px-8 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                        >
                            <option value="newest">Terbaru</option>
                            <option value="oldest">Terlama</option>
                        </select>
                    </div>
                </div>

                {/* Event Cards */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-500">
                        Tidak ada acara yang ditemukan. Coba kata kunci atau filter yang berbeda.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}