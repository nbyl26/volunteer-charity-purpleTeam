import { Link } from "react-router-dom";
import heroImage from "../../assets/hero-img.jpg";
import bgHero from "../../assets/bg-hero.svg";

export default function Hero() {
    return (
        <section className="relative bg-gray-10 pt-52 pb-20 overflow-hidden">
            <div className="absolute inset-0 flex justify-start items-center z-0">
                <img
                    src={bgHero}
                    alt="background globe"
                    className="w-[1200px] max-w-none h-auto opacity-20 -translate-x-40"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Bersama Kita <span className="text-purple-600">Peduli</span>,<br />
                        Bersama Kita <span className="text-purple-600">Berbagi</span>
                    </h1>
                    
                    <p className="text-lg text-gray-600 max-w-lg">
                        Menghubungkan relawan dan donatur untuk menciptakan dampak nyata
                        di masyarakat. Mari bergabung bersama kami untuk mewujudkan perubahan.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            to="/events"
                            className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Jadi Relawan
                        </Link>
                        <Link
                            to="/campaigns"
                            className="px-6 py-3 rounded-lg bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                            Berdonasi Sekarang
                        </Link>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="relative">
                        <img
                            src={heroImage}
                            alt="PurpleCare Community"
                            className="w-full h-auto object-cover rounded-l-[80px] shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white px-6 py-4 rounded-2xl shadow-xl hidden md:block">
                            <p className="text-sm font-medium">Mulai Perjalanan Anda</p>
                            <p className="text-2xl font-bold">Hari Ini!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}