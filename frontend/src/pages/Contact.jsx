import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import bgGlobe from "../assets/bg-hero.svg";
import ContactInfo from "../components/contact/ContactInfo";
import OperatingHours from "../components/contact/OperatingHours";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
    return (
        <section className="relative bg-gradient-to-b from-purple-50 to-white min-h-screen overflow-hidden">
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[900px] -translate-x-32 select-none"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <MessageCircle className="w-4 h-4" />
                        <span>Hubungi Kami</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Kami Siap <span className="text-purple-600">Membantu</span> Anda
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Punya pertanyaan, ingin berkolaborasi, atau tertarik menjadi relawan?
                        Silakan hubungi kami melalui formulir atau informasi kontak di bawah ini.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <ContactInfo />
                        <OperatingHours />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}