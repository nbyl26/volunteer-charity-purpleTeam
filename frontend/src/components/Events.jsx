import { ArrowRight } from "lucide-react";
import bgGlobe from "../assets/bg-hero.svg";

import Event1 from "../assets/event1.jpg";
import Event2 from "../assets/event2.jpg";
import Event3 from "../assets/event3.jpg";

const events = [
    {
        id: 1,
        title: "Dibutuhkan! Relawan Assesment Lampung",
        date: "30 Sept 2025",
        description:
            "Wujud Aksi Nyata!",
        image: Event1,
    },
    {
        id: 2,
        title: "Clean up Kolaborasi THJ x GPFI",
        date: "12 Oct 2025",
        description:
            "Trash Hero Jakarta (THJ)",
        image: Event2,
    },
    {
        id: 3,
        title: "World Mental Health Day 2025 - Jakarta",
        date: "25 Oct 2025",
        description:
            "Gandeng ODGJ",
        image: Event3,
    },
];


export default function Events() {
    return (
        <section className="relative bg-white py-24 overflow-hidden">
            {/* Background Globe */}
            <div className="absolute inset-0 flex justify-start items-center opacity-10 pointer-events-none">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[800px] h-auto -ml-20"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                    <div>
                        <span className="text-sm uppercase text-purple-600 font-semibold tracking-wide">
                            Kegiatan
                        </span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                            Acara & Informasi Terbaru
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="text-gray-600 text-sm mb-4">
                            Dapatkan informasi terbaru mengenai aktivitas, acara, dan program
                            kerelawanan kami yang menciptakan dampak nyata.
                        </p>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium">
                            Lihat Semua Acara <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <div className="h-52 w-full overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-xs text-purple-600 bg-purple-50 font-medium rounded-full px-3 py-1 w-fit mb-3">
                                    {event.date}
                                </span>
                                <h3 className="font-semibold text-lg text-gray-900 leading-snug mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-gray-600 text-sm flex-grow">
                                    {event.description}
                                </p>

                                <button className="mt-4 inline-flex items-center text-purple-600 font-medium hover:underline">
                                    Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}