import { X } from "lucide-react";

export default function ImageModal({ image, title, onClose }) {
    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-full">
                <button
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
                    onClick={onClose}
                    aria-label="Tutup modal"
                >
                    <X className="w-6 h-6" />
                </button>
                <img
                    src={image}
                    alt={title}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    );
}