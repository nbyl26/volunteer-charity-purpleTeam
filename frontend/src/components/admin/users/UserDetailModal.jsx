import { X, User, Mail, Shield, Calendar } from "lucide-react";

export default function UserDetailModal({ user, onClose }) {
    const formatDate = (dateString) => {
        if (!dateString) return "Tidak tersedia";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const getRoleBadge = (role) => {
        const roleMap = {
            admin: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", label: "Admin" },
            user: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", label: "User" }
        };

        const config = roleMap[role?.toLowerCase()] || roleMap.user;
        
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Detail Pengguna</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <User className="w-10 h-10 text-purple-600" />
                        </div>
                        {getRoleBadge(user.role)}
                    </div>

                    <div className="space-y-4">
                        <div className="border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">Nama Lengkap</span>
                            </div>
                            <p className="text-gray-900 font-semibold pl-6">
                                {user.name || 'Tidak tersedia'}
                            </p>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm font-medium">Email</span>
                            </div>
                            <p className="text-gray-900 pl-6 break-all">
                                {user.email || 'Tidak tersedia'}
                            </p>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Shield className="w-4 h-4" />
                                <span className="text-sm font-medium">Role</span>
                            </div>
                            <div className="pl-6">
                                {getRoleBadge(user.role)}
                            </div>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Terdaftar Sejak</span>
                            </div>
                            <p className="text-gray-900 pl-6">
                                {formatDate(user.created_at)}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Terakhir Diperbarui</span>
                            </div>
                            <p className="text-gray-900 pl-6">
                                {formatDate(user.updated_at)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}