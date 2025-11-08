import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {LayoutDashboard, Calendar, Users, HeartHandshake, BarChart3, LogOut, UserCheck, Menu, X, Home} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function AdminSidebar() {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
        }`;

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const menuItems = [
        { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
        { to: "/admin/events", icon: Calendar, label: "Acara" },
        { to: "/admin/volunteers", icon: UserCheck, label: "Relawan" },
        { to: "/admin/users", icon: Users, label: "Pengguna" },
        { to: "/admin/campaigns", icon: HeartHandshake, label: "Campaign" },
        { to: "/admin/donations", icon: HeartHandshake, label: "Donasi" },
        { to: "/admin/analytics", icon: BarChart3, label: "Analitik" },
    ];

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-40">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                    <h2 className="text-lg font-bold text-purple-700">PurpleCare</h2>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm">
                        {user?.email?.[0]?.toUpperCase() || "A"}
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed md:static inset-y-0 left-0 z-50
                    w-64 bg-white border-r border-gray-200 
                    transform transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    flex flex-col
                `}
            >
                <div className="hidden md:block p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-purple-700">PurpleCare Admin</h2>
                    <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
                </div>

                <div className="md:hidden p-4 border-b border-gray-200 bg-purple-50">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">
                            {user?.email?.[0]?.toUpperCase() || "A"}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {user?.name || "Admin"}
                            </p>
                            <p className="text-xs text-gray-600">{user?.email || "admin@purplecare.com"}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={linkClasses}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200 space-y-2">
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate("/");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition"
                    >
                        <Home className="w-5 h-5" />
                        <span>Kembali ke Home</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>

                <div className="hidden md:block p-4 text-center">
                    <p className="text-xs text-gray-400">PurpleCare Admin v1.0.0</p>
                </div>
            </aside>
        </>
    );
}