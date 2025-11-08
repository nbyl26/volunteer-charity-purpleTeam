import { motion } from "framer-motion";

export default function GetInvolvedHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
        >
            <span className="text-sm uppercase font-semibold text-purple-600 tracking-wide">
                Mari Terlibat
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 md:mt-3">
                Bersama, Kita Bisa Menciptakan <span className="text-purple-600">Perubahan</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-3 md:mt-4 max-w-2xl mx-auto px-4">
                Ada banyak cara untuk terlibat dengan PurpleCare.
                Baik Anda ingin menjadi relawan, memberikan donasi, atau bermitra dengan kami, kontribusi Anda berarti.
            </p>
        </motion.div>
    );
}