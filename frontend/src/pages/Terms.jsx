import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgGlobe from "../assets/bg-hero.svg";

export default function Terms() {
    const sections = [
        {
            title: "1. Penerimaan Syarat",
            content: [
                "Dengan mengakses dan menggunakan platform PurpleCare, Anda menyetujui untuk terikat dengan syarat dan ketentuan ini.",
                "Jika Anda tidak setuju dengan bagian manapun dari syarat ini, Anda tidak diperbolehkan untuk menggunakan layanan kami.",
                "Kami berhak untuk mengubah syarat ini kapan saja. Perubahan akan diberitahukan melalui platform."
            ]
        },
        {
            title: "2. Penggunaan Platform",
            content: [
                "Platform PurpleCare disediakan untuk tujuan menghubungkan relawan dan donatur dengan kegiatan sosial yang legitimate.",
                "Anda setuju untuk tidak menggunakan platform untuk tujuan ilegal atau tidak sah.",
                "Anda bertanggung jawab untuk menjaga kerahasiaan akun dan password Anda.",
                "Anda setuju untuk segera memberitahu kami tentang penggunaan tidak sah dari akun Anda."
            ]
        },
        {
            title: "3. Kewajiban Pengguna",
            content: [
                "Sebagai relawan: Anda berkomitmen untuk hadir pada event yang Anda daftarkan.",
                "Sebagai donatur: Anda menjamin bahwa dana yang didonasikan adalah milik Anda secara sah.",
                "Anda setuju untuk memberikan informasi yang akurat dan terkini saat registrasi.",
                "Anda tidak akan menyalahgunakan sistem donasi atau registrasi volunteer."
            ]
        },
        {
            title: "4. Donasi",
            content: [
                "Semua donasi bersifat final dan tidak dapat dikembalikan kecuali dalam kasus penipuan yang terbukti.",
                "PurpleCare berhak untuk memverifikasi bukti transfer sebelum donasi dikonfirmasi.",
                "Dana donasi akan digunakan untuk campaign yang ditentukan oleh donatur.",
                "Laporan transparansi penggunaan dana akan dipublikasikan secara berkala."
            ]
        },
        {
            title: "5. Hak Kekayaan Intelektual",
            content: [
                "Semua konten di platform PurpleCare, termasuk teks, grafik, logo, dan software, adalah milik PurpleCare atau pemberi lisensinya.",
                "Anda tidak diperbolehkan untuk mereproduksi, mendistribusikan, atau menggunakan konten kami tanpa izin tertulis.",
                "Anda dapat membagikan link ke campaign atau event untuk tujuan promosi."
            ]
        },
        {
            title: "6. Pembatasan Tanggung Jawab",
            content: [
                "PurpleCare tidak bertanggung jawab atas kerugian langsung, tidak langsung, atau konsekuensial yang timbul dari penggunaan platform.",
                "Kami tidak menjamin bahwa layanan akan selalu tersedia tanpa gangguan atau bebas dari kesalahan.",
                "Kami tidak bertanggung jawab atas tindakan pihak ketiga yang menggunakan platform."
            ]
        },
        {
            title: "7. Penghentian Akun",
            content: [
                "Kami berhak untuk menangguhkan atau menghentikan akun Anda jika Anda melanggar syarat dan ketentuan ini.",
                "Anda dapat menghapus akun Anda kapan saja dengan menghubungi tim support kami.",
                "Setelah penghentian, Anda tidak akan dapat mengakses data yang terkait dengan akun Anda."
            ]
        },
        {
            title: "8. Hukum yang Berlaku",
            content: [
                "Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.",
                "Setiap perselisihan yang timbul akan diselesaikan melalui pengadilan yang berwenang di Jakarta, Indonesia.",
                "Dengan menggunakan platform, Anda setuju untuk tunduk pada yurisdiksi eksklusif pengadilan tersebut."
            ]
        },
        {
            title: "9. Kontak",
            content: [
                "Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami:",
                "Email: purplecare01@gmail.com",
                "Telepon: +62 812-3456-7890",
                "Alamat: Indralaya, Sumatera Selatan, Indonesia"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[900px] -translate-x-32 select-none"
                />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span>Syarat & Ketentuan</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Syarat dan Ketentuan Penggunaan
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Mohon baca dengan seksama sebelum menggunakan platform PurpleCare
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-8"
                >
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                    {section.title}
                                </h2>
                            </div>
                            <ul className="space-y-3 ml-16">
                                {section.content.map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-gray-700 leading-relaxed flex items-start gap-2">
                                        <span className="text-purple-600 mt-1.5 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">
                            Ada Pertanyaan?
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, jangan ragu untuk menghubungi kami.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/contact"
                                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium shadow-md"
                            >
                                Hubungi Kami
                            </Link>
                            <Link
                                to="/privacy"
                                className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition font-medium"
                            >
                                Lihat Kebijakan Privasi
                            </Link>
                        </div>
                    </div>

                    <Link
                        to="/"
                        className="inline-block mt-8 text-gray-600 hover:text-purple-600 font-medium transition"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}