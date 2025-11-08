import { CheckCircle } from "lucide-react";

export default function SuccessMessage() {
    return (
        <div className="mt-6 md:mt-8 bg-green-50 border border-green-200 rounded-xl p-4 md:p-5 text-center animate-fadeIn">
            <div className="flex justify-center mb-3">
                <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
            </div>
            <p className="text-green-700 font-medium text-sm md:text-base">
                Terima kasih atas donasi Anda! Kami akan memverifikasinya segera.
            </p>
        </div>
    );
}