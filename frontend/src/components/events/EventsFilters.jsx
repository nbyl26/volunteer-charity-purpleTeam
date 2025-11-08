import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function EventsFilters({ 
    searchTerm, 
    onSearchChange, 
    category, 
    onCategoryChange, 
    categories,
    sort,
    onSortChange 
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
        >
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari acara..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-sm"
                />
            </div>

            <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-8 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-sm w-full sm:w-auto min-w-[140px]"
            >
                {categories.map((c) => (
                    <option key={c} value={c}>
                        {c === "All" ? "Semua Kategori" : c}
                    </option>
                ))}
            </select>

            <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-sm w-full sm:w-auto min-w-[140px]"
            >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
            </select>
        </motion.div>
    );
}