import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DonateCard({ campaignId }) {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white text-center shadow-lg">
            <Heart className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-white/90" />
            <h3 className="text-lg font-bold mb-2">Bantu Wujudkan Harapan</h3>
            <p className="text-white/80 text-sm mb-4">
                Setiap donasi Anda membuat perubahan yang berarti bagi mereka yang membutuhkan.
            </p>
            <button
                onClick={() => navigate(`/donate/${campaignId}`)}
                className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
            >
                Donasi Sekarang
            </button>
        </div>
    );
}