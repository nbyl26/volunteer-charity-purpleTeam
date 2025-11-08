import { motion } from "framer-motion";
import { Handshake, Eye, TrendingUp } from "lucide-react";

export default function AboutValues() {
    const values = [
        {
            icon: Handshake,
            title: "Kolaborasi",
            description: "Menghubungkan relawan dan donatur untuk aksi sosial bersama",
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            icon: Eye,
            title: "Transparansi",
            description: "Laporan terbuka dan akuntabilitas penuh untuk setiap donasi",
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            icon: TrendingUp,
            title: "Dampak Nyata",
            description: "Menciptakan perubahan positif yang terukur di masyarakat",
            color: "text-green-600",
            bgColor: "bg-green-100"
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-10 md:mb-12"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Nilai-Nilai Kami
                </h2>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                    Prinsip yang memandu setiap langkah kami dalam menciptakan dampak sosial
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                {values.map((value, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                    >
                        <div className={`${value.bgColor} p-4 rounded-full mb-4`}>
                            <value.icon className={`w-7 h-7 ${value.color}`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                            {value.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {value.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}