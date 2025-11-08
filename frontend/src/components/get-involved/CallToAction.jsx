import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function CallToAction() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-16 md:mt-20 text-center bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-8 md:p-10 shadow-xl"
        >
            <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Heart className="w-6 h-6 md:w-8 md:h-8" />
                </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Siap Bergabung dengan Gerakan Kami?
            </h2>
            <p className="text-purple-100 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 px-4">
                Bersama, kita dapat menciptakan dampak berkelanjutan dan membawa harapan bagi komunitas yang membutuhkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <Link
                    to="/events"
                    className="w-full sm:w-auto bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition shadow-md hover:shadow-lg"
                >
                    Jadi Relawan
                </Link>
                <Link
                    to="/campaigns"
                    className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition border border-white/30"
                >
                    Berdonasi Sekarang
                </Link>
            </div>
        </motion.div>
    );
}