import { useAuth } from "../../../context/AuthContext";
import { ChevronDown, User } from "lucide-react";
import { useState } from "react";

export default function AdminNavbar() {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
    };

    return (
        <header className="bg-white border-b border-gray-200 py-3 md:py-4 px-4 md:px-6 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="hidden md:block">
                        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                            Admin Panel
                        </h1>
                        <p className="text-xs md:text-sm text-gray-500">
                            Kelola platform PurpleCare
                        </p>
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-purple-700">
                            Platform Aktif
                        </span>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200"
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md">
                                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-semibold text-gray-900 max-w-[120px] truncate">
                                    {user?.name || "Admin"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Administrator
                                </p>
                            </div>
                            <ChevronDown 
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
                            />
                        </button>

                        {showDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowDropdown(false)}
                                />
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50 animate-fadeIn">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {user?.name || "Administrator"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email || "admin@purplecare.com"}
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-100 px-2 py-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}