import { useState } from "react";
import { Upload, QrCode } from "lucide-react";
import qrCodeImage from "../../assets/QR-Donate.jpg";

export default function DonationForm({ onSubmit, loading }) {
    const [amount, setAmount] = useState("");
    const [proof, setProof] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setProof(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!amount || !proof) {
            alert("Harap isi semua field dan unggah bukti transfer.");
            return;
        }

        onSubmit({ amount, proof, message });
        
        setAmount("");
        setProof(null);
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                    Jumlah Donasi (Rp)
                </label>
                <input
                    type="number"
                    min="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="contoh: 50000"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm md:text-base"
                    required
                />
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 md:p-6 text-center">
                <div className="flex justify-center mb-3">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                        <QrCode className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                    </div>
                </div>
                <h2 className="font-semibold text-purple-700 mb-3 text-base md:text-lg">
                    Scan QR Code untuk Donasi
                </h2>
                <div className="bg-white p-3 rounded-xl inline-block shadow-sm">
                    <img
                        src={qrCodeImage}
                        alt="QR Code Donasi"
                        className="w-40 h-40 md:w-48 md:h-48 object-contain"
                    />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                    Selesaikan pembayaran, lalu unggah buktinya di bawah.
                </p>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                    Unggah Bukti Transfer
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-6 md:py-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50/30 transition">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-gray-500 text-sm md:text-base px-4 text-center">
                        {proof ? proof.name : "Klik untuk mengunggah gambar (JPG, PNG)"}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                    />
                </label>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                    Pesan (opsional)
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Tulis pesan atau dedikasi singkat..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-sm md:text-base"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 md:py-4 rounded-xl font-semibold transition text-base md:text-lg shadow-md hover:shadow-lg"
            >
                {loading ? "Mengirim..." : "Kirim Donasi"}
            </button>
        </form>
    );
}