import { Heart } from "lucide-react";

export default function DonateHeader() {
    return (
        <div className="text-center mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Berikan Donasi
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto px-4">
                Dukungan Anda membantu kami mewujudkan misi kemanusiaan ini
            </p>
        </div>
    );
}