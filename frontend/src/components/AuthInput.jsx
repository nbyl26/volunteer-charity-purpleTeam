import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({ label, type, name, placeholder, required }) {
    const [show, setShow] = useState(false);
    const inputType = type === "password" && show ? "text" : type;

    return (
        <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-300">{label}</label>
            <div className="relative">
                <input
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    className="w-full bg-[#2A2343] border border-white/10 rounded-xl px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
}
