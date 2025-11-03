import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import bgGlobe from "../assets/bg-hero.svg";

export default function Contact() {
    return (
        <section className="relative bg-white text-gray-800 min-h-screen overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[900px] -translate-x-32 select-none"
                />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Hubungi <span className="text-purple-600">PurpleCare</span>
                    </h1>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Punya pertanyaan, ingin berkolaborasi, atau tertarik menjadi relawan?
                        Silakan hubungi kami melalui formulir atau informasi kontak di bawah ini.
                    </p>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="bg-purple-50 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Informasi Kontak
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-gray-700">
                                    <Mail className="text-purple-600 w-5 h-5" />
                                    <span>purpleTeam@gmail.com</span>
                                </li>
                                <li className="flex items-center gap-4 text-gray-700">
                                    <Phone className="text-purple-600 w-5 h-5" />
                                    <span>+62 812 3456 7890</span>
                                </li>
                                <li className="flex items-start gap-4 text-gray-700">
                                    <MapPin className="text-purple-600 w-5 h-5 mt-1" />
                                    <span>
                                        Indralaya,
                                        <br /> Sumatera Selatan, Indonesia
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white shadow-lg">
                            <h3 className="text-lg font-semibold mb-2">Jam Operasional</h3>
                            <p className="text-sm">Senin - Jumat: 09:00 - 17:00</p>
                            <p className="text-sm">Weekend: Tutup</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                placeholder="Nama Anda"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-300 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                placeholder="contoh@email.com"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-300 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pesan
                            </label>
                            <textarea
                                placeholder="Tulis pesan Anda..."
                                rows="5"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-300 outline-none resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                        >
                            Kirim Pesan
                            <Send className="w-4 h-4" />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}