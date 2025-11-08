import React from "react";
import { Search } from "lucide-react";

export default function CampaignFilters({ searchQuery, onSearchChange, sortBy, onSortChange }) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari campaign..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
            </div>

            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-sm font-medium text-gray-700 cursor-pointer"
            >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="most_funded">Terbanyak Donasi</option>
                <option value="closest_target">Hampir Tercapai</option>
            </select>
        </div>
    );
}