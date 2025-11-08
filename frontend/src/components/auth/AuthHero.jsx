import { motion } from "framer-motion";
import { Heart, Users, TrendingUp, Shield } from "lucide-react";

export default function AuthHero({ isLogin }) {
    const loginContent = {
        title: "Selamat Datang Kembali!",
        subtitle: "Lanjutkan perjalanan kebaikan Anda bersama PurpleCare",
        features: [
            {
                icon: Heart,
                title: "Dampak Nyata",
                description: "Setiap tindakan Anda menciptakan perubahan yang berarti"
            },
            {
                icon: Users,
                title: "Komunitas Solid",
                description: "Bergabung dengan 10,000+ relawan aktif"
            },
            {
                icon: TrendingUp,
                title: "Transparansi Penuh",
                description: "Lacak kontribusi dan dampak Anda secara real-time"
            }
        ]
    };

    const registerContent = {
        title: "Mulai Perjalanan Kebaikan",
        subtitle: "Jadilah bagian dari gerakan perubahan sosial yang berkelanjutan",
        features: [
            {
                icon: Shield,
                title: "Aman & Terpercaya",
                description: "Data Anda dilindungi dengan enkripsi tingkat enterprise"
            },
            {
                icon: Heart,
                title: "Mudah Berkontribusi",
                description: "Sistem intuitif untuk relawan dan donatur"
            },
            {
                icon: Users,
                title: "Jaringan Luas",
                description: "Terhubung dengan organisasi sosial terpercaya"
            }
        ]
    };

    const content = isLogin ? loginContent : registerContent;

    return (
        <motion.div
            initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? -50 : 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 items-center justify-center relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 text-center px-12 max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                        {content.title}
                    </h2>
                    <p className="text-white/90 text-lg mb-10 leading-relaxed">
                        {content.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="space-y-6"
                >
                    {content.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-left border border-white/20 hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-10 flex items-center justify-center gap-2 text-white/60 text-sm"
                >
                    <Shield className="w-4 h-4" />
                    <span>Dipercaya oleh ribuan pengguna di seluruh Indonesia</span>
                </motion.div>
            </div>
        </motion.div>
    );
}