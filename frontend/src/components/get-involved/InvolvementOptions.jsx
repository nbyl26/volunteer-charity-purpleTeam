import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartHandshake, HandHeart, Users, ArrowRight } from "lucide-react";

export default function InvolvementOptions() {
    const options = [
        {
            id: 1,
            title: "Jadi Relawan",
            description:
                "Bergabunglah dengan komunitas relawan kami yang penuh semangat dan kontribusikan waktu serta keterampilan Anda untuk menciptakan perubahan nyata.",
            icon: Users,
            color: "from-purple-50 to-white",
            iconColor: "text-purple-600",
            button: "Gabung Sekarang",
            link: "/events"
        },
        {
            id: 2,
            title: "Berikan Donasi",
            description:
                "Dukungan Anda membantu kami mendanai program pendidikan, kesehatan, dan kemanusiaan untuk komunitas yang membutuhkan.",
            icon: HandHeart,
            color: "from-pink-50 to-white",
            iconColor: "text-pink-600",
            button: "Donasi Sekarang",
            link: "/campaigns"
        },
        {
            id: 3,
            title: "Jadi Mitra Kami",
            description:
                "Berkolaborasilah dengan PurpleCare sebagai organisasi atau sponsor untuk menciptakan dampak sosial yang berkelanjutan bersama-sama.",
            icon: HeartHandshake,
            color: "from-blue-50 to-white",
            iconColor: "text-blue-600",
            button: "Hubungi Kami",
            link: "/contact"
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
            {options.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`rounded-2xl bg-gradient-to-b ${item.color} p-6 md:p-8 shadow-sm hover:shadow-lg border border-gray-100 transition flex flex-col h-full`}
                >
                    <div className="mb-4 md:mb-6">
                        <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                        {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-6 flex-1 leading-relaxed">
                        {item.description}
                    </p>
                    <Link
                        to={item.link}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition mt-auto group"
                    >
                        {item.button}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}