import React from "react";
import { Search, HeartOff } from "lucide-react";

export default function EmptyState({ hasSearch, onReset }) {
    return (
        <div className="text-center py-20 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                {hasSearch ? (
                    <Search className="w-10 h-10 text-gray-400" />
                ) : (
                    <HeartOff className="w-10 h-10 text-gray-400" />
                )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {hasSearch ? "Tidak Ada Hasil Ditemukan" : "Belum Ada Campaign"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {hasSearch
                    ? "Coba gunakan kata kunci lain atau ubah filter pencarian Anda."
                    : "Campaign donasi belum tersedia saat ini. Silakan cek kembali nanti."}
            </p>
            {hasSearch && (
                <button
                    onClick={onReset}
                    className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                >
                    Reset Pencarian
                </button>
            )}
        </div>
    );
}