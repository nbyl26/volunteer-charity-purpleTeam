import { Search, Filter } from "lucide-react";

export default function DonationFilters({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari nama donatur, email, atau campaign..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm min-w-[160px]"
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="verified">Terverifikasi</option>
                        <option value="rejected">Ditolak</option>
                    </select>
                </div>
            </div>
        </div>
    );
}