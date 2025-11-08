export default function EventAbout() {
    return (
        <div className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                Tentang Acara Ini
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                Acara ini bertujuan untuk menyatukan relawan, donatur, dan anggota komunitas
                untuk menciptakan dampak yang berarti. Anda dapat bergabung sebagai relawan,
                memberikan donasi, atau membantu menyebarkan kesadaran.
            </p>

            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Cara Anda Dapat Membantu
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm md:text-base">
                <li>Berpartisipasi sebagai relawan selama acara berlangsung.</li>
                <li>Donasi untuk membantu mendanai perlengkapan dan logistik.</li>
                <li>Bagikan acara ini untuk menjangkau lebih banyak orang.</li>
            </ul>
        </div>
    );
}