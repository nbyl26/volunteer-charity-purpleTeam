import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";

export default function CampaignHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
        >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-2">
                <HeartHandshake className="w-4 h-4" />
                <span>Campaign Donasi</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                Bantu Mereka yang <span className="text-purple-600">Membutuhkan</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                Mari bersama-sama menciptakan perubahan. Setiap donasi Anda, sekecil apapun,
                membuat perbedaan yang berarti bagi kehidupan mereka.
            </p>
        </motion.div>
    );
}