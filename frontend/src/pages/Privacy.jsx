import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgGlobe from "../assets/bg-hero.svg";

export default function Privacy() {
    const sections = [
        {
            title: "1. Informasi yang Kami Kumpulkan",
            content: [
                "Informasi Pribadi: Nama lengkap, alamat email, nomor telepon yang Anda berikan saat registrasi.",
                "Informasi Donasi: Jumlah donasi, bukti transfer, dan pesan yang Anda kirimkan.",
                "Informasi Volunteer: Data pendaftaran event, dokumentasi kegiatan yang Anda upload.",
                "Informasi Teknis: Alamat IP, jenis browser, waktu akses, dan halaman yang dikunjungi."
            ]
        },
        {
            title: "2. Bagaimana Kami Menggunakan Informasi Anda",
            content: [
                "Memproses pendaftaran volunteer dan verifikasi donasi.",
                "Mengirimkan notifikasi terkait event, campaign, dan update platform.",
                "Meningkatkan kualitas layanan dan pengalaman pengguna.",
                "Menganalisis penggunaan platform untuk optimasi fitur.",
                "Memenuhi kewajiban hukum dan peraturan yang berlaku."
            ]
        },
        {
            title: "3. Keamanan Data",
            content: [
                "Kami menggunakan enkripsi SSL/TLS untuk melindungi data saat transmisi.",
                "Password Anda disimpan dalam bentuk hash menggunakan algoritma bcrypt.",
                "Akses ke database dibatasi hanya untuk personel yang berwenang.",
                "Kami melakukan backup rutin untuk mencegah kehilangan data.",
                "Sistem keamanan kami diaudit secara berkala oleh pihak ketiga independen."
            ]
        },
        {
            title: "4. Berbagi Informasi dengan Pihak Ketiga",
            content: [
                "Kami TIDAK menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga.",
                "Informasi dapat dibagikan dengan organisasi partner untuk keperluan event atau campaign tertentu (dengan persetujuan Anda).",
                "Kami dapat membagikan data agregat (tanpa identitas pribadi) untuk keperluan penelitian atau pelaporan.",
                "Dalam kasus hukum, kami dapat mengungkapkan informasi jika diwajibkan oleh pengadilan atau otoritas pemerintah."
            ]
        },
        {
            title: "5. Hak Anda atas Data Pribadi",
            content: [
                "Hak Akses: Anda dapat meminta salinan data pribadi yang kami simpan.",
                "Hak Koreksi: Anda dapat memperbarui atau memperbaiki informasi yang tidak akurat.",
                "Hak Penghapusan: Anda dapat meminta penghapusan data Anda kapan saja (dengan beberapa pengecualian hukum).",
                "Hak Portabilitas: Anda dapat meminta data Anda dalam format yang dapat dibaca mesin.",
                "Hak Keberatan: Anda dapat menolak pemrosesan data Anda untuk tujuan tertentu."
            ]
        },
        {
            title: "6. Cookie dan Teknologi Pelacakan",
            content: [
                "Kami menggunakan cookie untuk menyimpan preferensi Anda dan meningkatkan pengalaman pengguna.",
                "Cookie autentikasi digunakan untuk menjaga sesi login Anda.",
                "Anda dapat mengatur browser Anda untuk menolak cookie, namun beberapa fitur mungkin tidak berfungsi optimal.",
                "Kami tidak menggunakan cookie pihak ketiga untuk iklan yang dipersonalisasi."
            ]
        },
        {
            title: "7. Retensi Data",
            content: [
                "Data pribadi Anda akan disimpan selama akun Anda aktif.",
                "Setelah penghapusan akun, data akan dihapus dalam waktu 30 hari (kecuali untuk keperluan hukum).",
                "Data donasi dan aktivitas volunteer dapat disimpan lebih lama untuk keperluan pelaporan dan audit.",
                "Kami melakukan penghapusan data secara otomatis untuk akun yang tidak aktif lebih dari 2 tahun."
            ]
        },
        {
            title: "8. Privasi Anak-Anak",
            content: [
                "Platform PurpleCare tidak ditujukan untuk anak-anak di bawah 13 tahun.",
                "Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak di bawah 13 tahun.",
                "Jika Anda percaya bahwa kami secara tidak sengaja mengumpulkan informasi dari anak di bawah 13 tahun, segera hubungi kami."
            ]
        },
        {
            title: "9. Perubahan Kebijakan Privasi",
            content: [
                "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.",
                "Perubahan akan diumumkan di platform dan melalui email (untuk perubahan material).",
                "Tanggal 'Terakhir Diperbarui' di bagian atas akan diperbarui setiap kali ada perubahan.",
                "Penggunaan Anda yang berkelanjutan setelah perubahan dianggap sebagai penerimaan terhadap kebijakan baru."
            ]
        },
        {
            title: "10. Kontak",
            content: [
                "Jika Anda memiliki pertanyaan atau keluhan tentang Kebijakan Privasi ini:",
                "Email: privacy@purplecare.org atau purplecare01@gmail.com",
                "Telepon: +62 812-3456-7890",
                "Alamat: Jl. Kemanusiaan No. 123, Jakarta Selatan, 12345",
                "Data Protection Officer: privacy@purplecare.org"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
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
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span>Kebijakan Privasi</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Kebijakan Privasi PurpleCare
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda
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
                                        <span className="text-blue-600 mt-1.5 flex-shrink-0">•</span>
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
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">
                            Pertanyaan tentang Privasi Anda?
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Kami siap membantu Anda memahami bagaimana data Anda dikelola dan dilindungi.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/contact"
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-md"
                            >
                                Hubungi Tim Privasi
                            </Link>
                            <Link
                                to="/terms"
                                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition font-medium"
                            >
                                Lihat Syarat & Ketentuan
                            </Link>
                        </div>
                    </div>

                    <Link
                        to="/"
                        className="inline-block mt-8 text-gray-600 hover:text-blue-600 font-medium transition"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}