import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, LogOut, Menu, X, LayoutDashboard, ShieldCheck } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/about" },
    { name: "Bergabung", path: "/get-involved" },
    { name: "Kampanye", path: "/campaigns" },
    { name: "Kegiatan", path: "/events" },
    { name: "Kontak", path: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setShowMenu(false);
    }, [location]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleLogout = () => {
        logout();
        setShowMenu(false);
        navigate("/");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
                    scrolled
                        ? "bg-white shadow-xl py-2"
                        : "bg-white/70 backdrop-blur-md shadow-sm py-3"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14 md:h-16">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 z-50 group"
                            onClick={() => setIsOpen(false)}
                        >
                            <img
                                src={logo}
                                alt="PurpleCare Logo"
                                className={`transition-all duration-500 ${
                                    scrolled ? "h-10 w-10" : "h-12 w-12"
                                }`}
                            />
                            <span
                                className={`font-bold text-purple-700 transition-all duration-500 ${
                                    scrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
                                }`}
                            >
                                PurpleCare
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        isActive(link.path)
                                            ? "bg-purple-100 text-purple-700 shadow-sm"
                                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center space-x-4">
                            {!user ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-5 py-2 rounded-lg border-2 border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition-all duration-200"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowMenu(!showMenu)}
                                        className="flex items-center space-x-3 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-lg transition-all duration-200 border border-purple-200 hover:shadow-md"
                                    >
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user.name}&background=6C4AB6&color=fff`}
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full ring-2 ring-purple-200"
                                        />
                                        <span className="font-medium max-w-[120px] truncate">
                                            {user.name}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${
                                                showMenu ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {showMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setShowMenu(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50 animate-fadeIn">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                                                    onClick={() => setShowMenu(false)}
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    Dashboard
                                                </Link>
                                                {user.role === "admin" && (
                                                    <Link
                                                        to="/admin"
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                                                        onClick={() => setShowMenu(false)}
                                                    >
                                                        <ShieldCheck className="w-4 h-4" />
                                                        Panel Admin
                                                    </Link>
                                                )}
                                                <div className="border-t border-gray-100 mt-2 pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        Keluar
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors z-50"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6 text-purple-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-purple-700" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <img
                                src={logo}
                                alt="PurpleCare Logo"
                                className="h-10 w-10"
                            />
                            <span className="text-xl font-bold text-purple-700">
                                PurpleCare
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {user && (
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-b border-purple-200">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=6C4AB6&color=fff`}
                                    alt="avatar"
                                    className="w-12 h-12 rounded-full ring-2 ring-white"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-600 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                        isActive(link.path)
                                            ? "bg-purple-100 text-purple-700 shadow-sm"
                                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user && (
                                <>
                                    <div className="border-t border-gray-200 my-4"></div>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span className="font-medium">Dashboard</span>
                                    </Link>
                                    {user.role === "admin" && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                                        >
                                            <ShieldCheck className="w-5 h-5" />
                                            <span className="font-medium">Panel Admin</span>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>

                    <div className="p-4 border-t border-gray-200 space-y-3">
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full px-4 py-3 text-center border-2 border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-all duration-200"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md"
                                >
                                    Daftar
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-lg transition-all duration-200"
                            >
                                <LogOut className="w-5 h-5" />
                                Keluar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}