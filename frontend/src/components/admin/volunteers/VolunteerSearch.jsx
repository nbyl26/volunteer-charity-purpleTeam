import { Search } from "lucide-react";

export default function VolunteerSearch({ searchTerm, onSearchChange }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4 mb-6">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Cari acara, lokasi, atau kategori..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
            </div>
        </div>
    );
}