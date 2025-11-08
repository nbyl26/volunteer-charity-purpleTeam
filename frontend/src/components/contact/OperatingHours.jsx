import React from "react";
import { Clock } from "lucide-react";

export default function OperatingHours() {
    const hours = [
        { days: "Senin - Jumat", time: "09:00 - 17:00", isOpen: true },
        { days: "Sabtu - Minggu", time: "Tutup", isOpen: false },
    ];

    return (
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                    <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold">Jam Operasional</h3>
            </div>
            <div className="space-y-2">
                {hours.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-purple-100">{item.days}</span>
                        <span
                            className={`text-sm font-medium ${
                                item.isOpen ? "text-white" : "text-purple-200"
                            }`}
                        >
                            {item.time}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-purple-400/30">
                <p className="text-xs text-purple-100">
                    Kami biasanya membalas email dalam 1-2 hari kerja
                </p>
            </div>
        </div>
    );
}