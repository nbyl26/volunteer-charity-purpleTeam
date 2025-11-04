import { Github, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-purple-600 text-white relative overflow-hidden">
            {/* Background globe pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('/globe-bg.svg')] bg-cover bg-left"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo & Deskripsi */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <h2 className="font-bold text-lg">Purple Care</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-purple-100 max-w-xs">
                        Platform yang menghubungkan relawan dan donatur untuk mendukung
                        aktivitas sosial dan menciptakan perubahan bermakna.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase tracking-wide">
                        Menu
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#about" className="text-white hover:text-gray-200 transition">
                                Tentang Kami
                            </a>
                        </li>
                        <li>
                            <a href="#events" className="text-white hover:text-gray-200 transition">
                                Kegiatan
                            </a>
                        </li>
                        <li>
                            <a href="#get-involved" className="text-white hover:text-gray-200 transition">
                                Bergabunglah
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="text-white hover:text-gray-200 transition">
                                Kontak
                            </a>
                        </li>
                    </ul>

                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase tracking-wide">
                        Hubungi Kami
                    </h3>
                    <ul className="text-sm space-y-2 mb-4">
                        <li>purplecare01@gmail.com</li>
                        <li>+62 812 3456 7890</li>
                    </ul>
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/nbyl26"
                            className="bg-white text-purple-600 rounded-full p-2 hover:bg-purple-200 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href="https://instagram.com/nbyl.26"
                            className="bg-white text-purple-600 rounded-full p-2 hover:bg-purple-200 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram size={18} />
                        </a>
                        <a
                            href="https://linkedin.com/in/nabilpasha"
                            className="bg-white text-purple-600 rounded-full p-2 hover:bg-purple-200 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="relative border-t border-purple-400/40 mt-6 py-4 text-center text-sm text-purple-200">
                Hak Cipta © 2025 PurpleTeam. Semua hak dilindungi undang-undang.
            </div>
        </footer>
    );
}