import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bgGlobe from "../../assets/bg-globe.svg";

export default function AboutHero() {
    return (
        <section className="relative py-20 md:py-24">
            <div className="absolute inset-0 flex justify-start items-center opacity-10 pointer-events-none">
                <img src={bgGlobe} alt="background globe" className="w-[600px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-4xl mx-auto text-center px-4 md:px-6"
            >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-700 mb-4">
                    Tentang PurpleCare
                </h1>
                <p className="text-gray-600 text-base md:text-lg mb-6 max-w-2xl mx-auto">
                    Memberdayakan relawan dan donatur untuk menciptakan dampak nyata
                    dalam komunitas di seluruh dunia.
                </p>
                <Link
                    to="/events"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium shadow-md hover:shadow-lg"
                >
                    Mari Berpartisipasi
                </Link>
            </motion.div>
        </section>
    );
}