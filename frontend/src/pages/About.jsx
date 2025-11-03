import heroImage from "../assets/hero-img.jpg";
import bgGlobe from "../assets/bg-globe.svg";

export default function About() {
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* 🟪 Hero Section */}
            <section className="relative py-24">
                {/* Background Globe */}
                <div className="absolute inset-0 flex justify-start items-center opacity-10 pointer-events-none">
                    <img src={bgGlobe} alt="background globe" className="w-[600px]" />
                </div>

                <div className="relative max-w-4xl mx-auto text-center px-6">
                    <h1 className="text-5xl font-bold text-purple-700 mb-4">
                        Tentang PurpleCare
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Memberdayakan relawan dan donatur untuk menciptakan dampak nyata
                        dalam komunitas di seluruh dunia.
                    </p>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        Mari Berpartisipasi
                    </button>
                </div>
            </section>

            {/* 🟪 Mission Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-bold text-purple-700">
                        Mengapa PurpleCare?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        PurpleCare hadir sebagai platform yang menyatukan relawan dan donatur
                        dalam satu ekosistem digital. Misi kami adalah menciptakan dampak nyata
                        di masyarakat melalui kolaborasi dan aksi sosial.
                    </p>

                    {/* Highlight Icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-purple-100 p-4 rounded-full mb-2 text-2xl">
                                🫂
                            </div>
                            <p className="font-semibold text-gray-800">Relawan</p>
                            <p className="text-sm text-gray-600">
                                Terhubung dan bantu aksi sosial
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-purple-100 p-4 rounded-full mb-2 text-2xl">
                                🔍
                            </div>
                            <p className="font-semibold text-gray-800">Transparansi</p>
                            <p className="text-sm text-gray-600">
                                Laporan terbuka & jelas
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-purple-100 p-4 rounded-full mb-2 text-2xl">
                                🌱
                            </div>
                            <p className="font-semibold text-gray-800">Dampak</p>
                            <p className="text-sm text-gray-600">
                                Memberi perubahan positif
                            </p>
                        </div>
                    </div>
                </div>

                {/* Gambar */}
                <div className="flex-1">
                    <img
                        src={heroImage}
                        alt="About illustration"
                        className="w-full rounded-2xl shadow-lg"
                    />
                </div>
            </section>
        </div>
    );
}