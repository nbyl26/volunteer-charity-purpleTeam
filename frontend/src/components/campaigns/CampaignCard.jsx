import React from "react";
import { Link } from "react-router-dom";
import { Heart, Target, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function CampaignCard({ campaign, index }) {
    const progress = campaign.target > 0 ? (campaign.collected / campaign.target) * 100 : 0;

    const formatCurrency = (amount) => {
        if (!amount || isNaN(amount)) return "Rp 0";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Tanggal tidak valid";

            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
        >
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 text-white">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
                    <span className="text-6xl font-black uppercase whitespace-nowrap">
                        PurpleCare
                    </span>
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                            Campaign #{campaign.id}
                        </span>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-xs text-white/80 mb-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>Progress</span>
                            </div>
                            <div className="text-2xl font-bold">{progress.toFixed(0)}%</div>
                        </div>
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl line-clamp-2 leading-tight drop-shadow-md">
                        {campaign.title || "Judul Tidak Tersedia"}
                    </h3>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {campaign.description || "Tidak ada deskripsi tersedia."}
                </p>

                <div className="mb-4">
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-2 shadow-inner">
                        <div
                            className="h-2.5 bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Terkumpul</span>
                        <span>Target</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                        <span className="text-green-600">{formatCurrency(campaign.collected)}</span>
                        <span className="text-gray-900">{formatCurrency(campaign.target)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <Target className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-600 mb-1">Target</div>
                        <div className="text-sm font-bold text-gray-900 truncate">
                            {formatCurrency(campaign.target)}
                        </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                        <Heart className="w-5 h-5 text-red-500 mx-auto mb-2" />
                        <div className="text-xs text-gray-600 mb-1">Terkumpul</div>
                        <div className="text-sm font-bold text-green-600 truncate">
                            {formatCurrency(campaign.collected)}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 pt-3 border-t border-gray-100">
                    <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="truncate">Dibuat {formatDate(campaign.created_at)}</span>
                </div>

                <Link
                    to={`/campaigns/${campaign.id}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg mt-auto flex items-center justify-center gap-2"
                >
                    <Heart className="w-4 h-4" />
                    <span>Lihat Detail & Donasi</span>
                </Link>
            </div>
        </motion.div>
    );
}