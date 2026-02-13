import React from "react";
import { Settings } from "lucide-react";

export default function ProfileCard({ profile, user }) {
    const formatDate = (isoString) => {
        if (!isoString) return "-";
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Informasi Profil</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">
                        Nama Lengkap
                    </label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                        {profile?.name || user?.name || "-"}
                    </p>
                </div>
                <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Email</label>
                    <p className="text-sm font-medium text-gray-900 mt-1 break-all">
                        {profile?.email || user?.email || "-"}
                    </p>
                </div>
                <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">Role</label>
                    <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                        {profile?.role || user?.role || "User"}
                    </p>
                </div>
                <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">
                        Bergabung Sejak
                    </label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                        {formatDate(profile?.created_at || user?.created_at)}
                    </p>
                </div>
            </div>
        </div>
    );
}