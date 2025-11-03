import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, LogOut } from "lucide-react";

const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/about" },
    { name: "Bergabung", path: "/get-involved" },
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

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setShowMenu(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-purple-700/90 shadow-lg backdrop-blur-md" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className={`text-2xl font-bold transition-colors duration-300 ${scrolled ? "text-white" : "text-purple-700"
                        }`}
                >
                    PurpleCare
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-medium transition-colors duration-300 ${scrolled
                                ? "text-white hover:text-purple-200"
                                : "text-gray-800 hover:text-purple-600"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Auth Buttons */}
                    {!user ? (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className={`px-4 py-2 rounded-xl border transition-all duration-300 ${scrolled
                                    ? "border-white text-white hover:bg-white hover:text-purple-700"
                                    : "border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
                                    }`}
                            >
                                Masuk
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-xl bg-purple-700 text-white hover:bg-purple-800 transition-all duration-300"
                            >
                                Daftar
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-xl transition-all"
                            >
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=6C4AB6&color=fff`}
                                    alt="avatar"
                                    className="w-7 h-7 rounded-full"
                                />
                                <span className="font-medium">{user.name}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                                    >
                                        dashboard
                                    </Link>
                                    {user.role === "admin" && (
                                        <Link
                                            to="/admin"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                                        >
                                            Panel Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut className="w-4 h-4" /> Keluar
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden transition-colors duration-300 ${scrolled ? "text-white" : "text-gray-800"
                        }`}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div
                    className={`md:hidden flex flex-col space-y-4 px-6 py-4 transition-all duration-300 ${scrolled ? "bg-purple-700/90 text-white" : "bg-white text-gray-800"
                        }`}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="font-medium hover:text-purple-300"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-center border rounded-xl hover:bg-purple-700 hover:text-white"
                            >
                                Masuk
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-center bg-purple-700 text-white rounded-xl hover:bg-purple-800"
                            >
                                Daftar
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="px-4 py-2 text-center hover:text-purple-300">
                                dashboard
                            </Link>
                            {user.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="px-4 py-2 text-center hover:text-purple-300"
                                >
                                    Panel Admin
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-center text-red-500 hover:bg-red-50 rounded-xl"
                            >
                                Keluar
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}