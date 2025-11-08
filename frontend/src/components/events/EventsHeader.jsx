import { motion } from "framer-motion";

export default function EventsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
        >
            <span className="text-sm uppercase text-purple-600 font-semibold tracking-wide">
                Acara
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Acara Mendatang & Peluang Relawan
            </h1>
            <p className="text-gray-600 max-w-xl text-sm md:text-base">
                Jelajahi acara, peluang relawan, dan program donasi yang menciptakan
                dampak nyata bagi komunitas. Filter atau cari untuk menemukan yang sesuai dengan Anda.
            </p>
        </motion.div>
    );
}