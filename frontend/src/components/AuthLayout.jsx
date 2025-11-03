import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout({ children, title, subtitle, image, quote }) {
    return (
        <div className="min-h-screen flex bg-[#120E24] text-gray-100">
            {/* Left side - Illustration */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500 items-center justify-center relative"
            >
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center px-10">
                    <h2 className="text-3xl font-semibold text-white mb-3">{quote.title}</h2>
                    <p className="text-white/80">{quote.subtitle}</p>
                </div>
                {image && (
                    <img
                        src={image}
                        alt="ilustrasi"
                        className="absolute bottom-0 w-full h-full object-cover opacity-30"
                    />
                )}
            </motion.div>

            {/* Right side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md bg-[#1F1935] rounded-2xl shadow-2xl p-8 border border-white/10"
                >
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                        {subtitle && (
                            <p className="text-gray-400 text-sm">{subtitle}</p>
                        )}
                    </div>
                    {children}
                    <div className="mt-8 text-center text-sm text-gray-400">
                        <Link to="/" className="hover:text-purple-400 transition">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}