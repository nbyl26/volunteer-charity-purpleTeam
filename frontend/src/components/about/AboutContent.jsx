import { motion } from "framer-motion";
import heroImage from "../../assets/hero-img.jpg";

export default function AboutContent() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 space-y-4 md:space-y-6"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-700">
                        Mengapa PurpleCare?
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        PurpleCare hadir sebagai platform yang menyatukan relawan dan donatur
                        dalam satu ekosistem digital. Misi kami adalah menciptakan dampak nyata
                        di masyarakat melalui kolaborasi dan aksi sosial yang berkelanjutan.
                    </p>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        Dengan teknologi modern dan komunitas yang solid, kami memfasilitasi
                        ribuan kegiatan sosial yang memberikan manfaat langsung kepada
                        mereka yang membutuhkan.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 w-full"
                >
                    <img
                        src={heroImage}
                        alt="About PurpleCare"
                        className="w-full rounded-2xl shadow-lg object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}