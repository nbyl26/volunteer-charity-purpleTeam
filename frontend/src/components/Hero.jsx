import heroImage from "../assets/hero-img.jpg";
import bgHero from "../assets/bg-hero.svg";

export default function Hero() {
    return (
        <section className="relative bg-gray-10 pt-32 pb-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 flex justify-start items-center z-0">
                <img
                    src={bgHero}
                    alt="background globe"
                    className="w-[1200px] max-w-none h-auto opacity-20 -translate-x-40"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Bersama Kita <span className="text-purple-600">Peduli</span>,<br />
                        Bersama Kita <span className="text-purple-600">Berbagi</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-lg">
                        Menghubungkan relawan dan donatur untuk menciptakan dampak nyata
                        di masyarakat. Mari bergabung bersama kami untuk mewujudkan perubahan.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
                            Mulai Sekarang
                        </button>
                        <button className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 transition">
                            Donasi
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                        <div className="text-center md:text-left">
                            <p className="text-purple-600 text-2xl font-bold">900+</p>
                            <p className="text-gray-600">Donatur</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-purple-600 text-2xl font-bold">15k</p>
                            <p className="text-gray-600">Relawan</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-purple-600 text-2xl font-bold">Rp150 Jt</p>
                            <p className="text-gray-600">Terkumpul</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="flex-1 relative">
                    <img
                        src={heroImage}
                        alt="Hero"
                        className="w-full h-auto object-cover rounded-l-[80px] shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}