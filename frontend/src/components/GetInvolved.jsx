import { HeartHandshake, HandCoins } from "lucide-react";
import bgGlobe from "../assets/bg-globe.svg";

export default function GetInvolved() {
    return (
        <section className="relative bg-white py-24 overflow-hidden">
            {/* Background Globe */}
            <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="w-[800px] h-auto -mr-20"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                    <span className="text-sm uppercase text-purple-600 font-semibold tracking-wide">
                        Bergabunglah
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                        Anda Juga Bisa Menciptakan <span className="text-purple-600">Dampak</span>
                    </h2>

                    <div className="mt-10 space-y-6">
                        {/* Donate Card */}
                        <div className="flex items-start gap-4 bg-purple-50 p-5 rounded-2xl border border-purple-100 hover:shadow-md transition">
                            <div className="p-3 bg-purple-100 rounded-xl flex items-center justify-center">
                                <HandCoins className="text-purple-600 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-purple-700 text-lg">Donasi</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Dukung kami secara finansial dengan berdonasi untuk tujuan mulia kami.
                                    Donasi Anda akan membantu kami menciptakan perbedaan nyata di lebih banyak komunitas.
                                </p>
                                <button className="mt-2 text-purple-600 font-medium hover:underline">
                                    Donasi Sekarang →
                                </button>
                            </div>
                        </div>

                        {/* Volunteer Card */}
                        <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                            <div className="p-3 bg-purple-100 rounded-xl flex items-center justify-center">
                                <HeartHandshake className="text-purple-600 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">
                                    Relawan
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Bergabunglah sebagai relawan dan bantu kami menyebarkan kebaikan
                                    serta memperkuat komunitas.
                                </p>
                                <button className="mt-2 text-purple-600 font-medium hover:underline">
                                    Daftar Relawan →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Globe + Floating Elements */}
                <div className="relative flex justify-center items-center">
                    {/* Globe */}
                    <div className="w-[400px] h-[400px] relative flex justify-center items-center">
                        <img
                            src={bgGlobe}
                            alt="Globe Background"
                            className="absolute w-full h-full object-contain opacity-40"
                        />

                        {/* Floating Circle Center */}
                        <div className="relative z-10 bg-purple-600 text-white font-semibold text-center rounded-full w-40 h-40 flex justify-center items-center shadow-xl">
                            AYO <br /> BERAKSI
                        </div>

                        {/* Floating Small Images (Dummy) */}
                        <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                            alt="relawan"
                            className="absolute top-5 left-8 w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
                            alt="donasi"
                            className="absolute bottom-5 left-0 w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1559028012-481c04fa702d"
                            alt="bantuan"
                            className="absolute top-0 right-5 w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb"
                            alt="dukungan"
                            className="absolute bottom-10 right-10 w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}