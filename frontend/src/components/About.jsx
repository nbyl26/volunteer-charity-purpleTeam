import { Users, ShieldCheck, HeartHandshake } from "lucide-react";
import aboutImage from "../assets/about-img.jpg";
import bgGlobe from "../assets/bg-globe.svg";

export default function About() {
    return (
        <section className="relative bg-white py-24 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 flex items-center opacity-25 pointer-events-none">
                <img
                    src={bgGlobe}
                    alt="background globe"
                    className="h-full w-auto object-cover"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Mengapa Pilih <span className="text-purple-600">PurpleCare?</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        PurpleCare mempermudah para relawan dan donatur untuk terhubung
                        dalam satu platform. Kami menyediakan cara yang transparan dan
                        berdampak nyata untuk mendukung komunitas yang membutuhkan.
                    </p>

                    {/* Highlights */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Users className="text-purple-600 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Ramah Relawan
                                </h3>
                                <p className="text-gray-600">
                                    Mudah untuk bergabung, mengelola, dan berpartisipasi dalam
                                    berbagai kegiatan kerelawanan.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <ShieldCheck className="text-purple-600 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Transparansi</h3>
                                <p className="text-gray-600">
                                    Pelacakan donasi yang jelas dan akuntabilitas penuh
                                    untuk setiap bantuan yang diberikan.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <HeartHandshake className="text-purple-600 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Dampak Nyata</h3>
                                <p className="text-gray-600">
                                    Donasi dan kegiatan relawan secara langsung memberikan
                                    manfaat bagi komunitas yang menjadi sasaran.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="relative">
                    <img
                        src={aboutImage}
                        alt="Tentang PurpleCare"
                        className="rounded-2xl shadow-lg w-full object-cover"
                    />
                    {/* Decorative Accent */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-2xl -z-10"></div>
                </div>
            </div>
        </section>
    );
}