import React from "react";
import { HeartHandshake, HandHeart, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import bgGlobe from "../assets/bg-hero.svg";

export default function GetInvolved() {
    const options = [
        {
            id: 1,
            title: "Jadi Relawan",
            description:
                "Bergabunglah dengan komunitas relawan kami yang penuh semangat dan kontribusikan waktu serta keterampilan Anda untuk menciptakan perubahan nyata.",
            icon: <Users className="w-8 h-8 text-purple-600" />,
            color: "from-purple-50 to-white",
            button: "Gabung Sekarang",
        },
        {
            id: 2,
            title: "Berikan Donasi",
            description:
                "Dukungan Anda membantu kami mendanai program pendidikan, kesehatan, dan kemanusiaan untuk komunitas yang membutuhkan.",
            icon: <HandHeart className="w-8 h-8 text-purple-600" />,
            color: "from-pink-50 to-white",
            button: "Donasi",
        },
        {
            id: 3,
            title: "Jadi Mitra Kami",
            description:
                "Berkolaborasilah dengan PurpleCare sebagai organisasi atau sponsor untuk menciptakan dampak sosial yang berkelanjutan bersama-sama.",
            icon: <HeartHandshake className="w-8 h-8 text-purple-600" />,
            color: "from-purple-50 to-white",
            button: "Hubungi Kami",
        },
    ];

    return (
        <section className="relative bg-white text-gray-800 overflow-hidden min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[900px] -translate-x-24 select-none"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm uppercase font-semibold text-purple-600">
                        Mari Terlibat
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Bersama, Kita Bisa Menciptakan <span className="text-purple-600">Perubahan</span>
                    </h1>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Ada banyak cara untuk terlibat dengan PurpleCare.
                        Baik Anda ingin menjadi relawan, memberikan donasi, atau bermitra dengan kami, kontribusi Anda berarti.
                    </p>
                </motion.div>

                {/* Cards Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {options.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`rounded-2xl bg-gradient-to-b ${item.color} p-8 shadow-sm hover:shadow-lg border border-gray-100 transition`}
                        >
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 mb-6">{item.description}</p>
                            <button className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800 transition">
                                {item.button}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="mt-20 text-center bg-purple-600 text-white rounded-2xl p-10 shadow-xl"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        Siap Bergabung dengan Gerakan Kami?
                    </h2>
                    <p className="text-purple-100 max-w-xl mx-auto mb-6">
                        Bersama, kita dapat menciptakan dampak berkelanjutan dan membawa harapan bagi komunitas yang membutuhkan.
                    </p>
                    <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition">
                        Mulai Sekarang
                    </button>
                </motion.div>
            </div>
        </section>
    );
}