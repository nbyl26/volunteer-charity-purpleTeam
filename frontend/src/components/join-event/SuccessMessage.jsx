import { Check } from 'lucide-react';

export default function SuccessMessage() {
    return (
        <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4 text-center text-green-700 font-medium text-sm md:text-base">
            <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Pendaftaran berhasil! Status Anda: <strong>Pending</strong>.</span>
            </div>
            <br />
            Admin akan meninjau pendaftaran Anda dan menghubungi via email.
        </div>
    );
}