import { Search, CalendarOff } from "lucide-react";

export default function EmptyState({ hasEvents, hasSearch }) {
    return (
        <div className="text-center py-16 md:py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full mb-4">
                {hasSearch ? (
                    <Search className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                ) : (
                    <CalendarOff className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                )}
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {hasEvents 
                    ? "Tidak ada acara yang sesuai" 
                    : "Belum ada acara tersedia"
                }
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto px-4">
                {hasEvents
                    ? "Coba ubah kata kunci pencarian atau filter kategori Anda."
                    : "Acara baru akan segera ditambahkan. Silakan cek kembali nanti."
                }
            </p>
        </div>
    );
}