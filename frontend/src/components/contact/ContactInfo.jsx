import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
    const contactDetails = [
        {
            icon: Mail,
            label: "Email",
            value: "purplecare01@gmail.com",
            href: "mailto:purplecare01@gmail.com",
        },
        {
            icon: Phone,
            label: "Telepon",
            value: "+62 812 3456 7890",
            href: "tel:+6281234567890",
        },
        {
            icon: MapPin,
            label: "Alamat",
            value: "Indralaya, Sumatera Selatan, Indonesia",
            multiline: true,
        },
    ];

    return (
        <div className="bg-purple-50 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                Informasi Kontak
            </h2>
            <ul className="space-y-4">
                {contactDetails.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 text-gray-700">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <item.icon className="text-purple-600 w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                {item.label}
                            </p>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="text-sm font-medium text-gray-900 hover:text-purple-600 transition"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-sm font-medium text-gray-900">
                                    {item.value}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}