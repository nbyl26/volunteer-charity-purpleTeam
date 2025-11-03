import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SocialButtons() {
    return (
        <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px bg-gray-700 flex-1" />
                <span className="text-gray-400 text-sm">atau lanjutkan dengan</span>
                <div className="h-px bg-gray-700 flex-1" />
            </div>

            <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#2A2343] hover:bg-[#352B57] rounded-xl py-2 border border-white/10 text-gray-100 transition">
                    <FcGoogle size={18} /> Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#2A2343] hover:bg-[#352B57] rounded-xl py-2 border border-white/10 text-gray-100 transition">
                    <FaApple size={18} /> Apple
                </button>
            </div>
        </div>
    );
}