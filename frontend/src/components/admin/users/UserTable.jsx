import { User, Info } from "lucide-react";

export default function UserTable({ users, onViewDetail }) {
    const getRoleBadge = (role) => {
        const roleMap = {
            admin: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", label: "Admin" },
            user: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", label: "User" }
        };

        const config = roleMap[role?.toLowerCase()] || roleMap.user;
        
        return (
            <span className={`inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
                {config.label}
            </span>
        );
    };

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada hasil</h3>
                <p className="text-gray-500 text-sm">
                    Coba ubah kata kunci pencarian Anda.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Pengguna
                            </th>
                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 md:px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 font-semibold text-xs md:text-sm">
                                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <div className="ml-3 md:ml-4">
                                            <div className="text-xs md:text-sm font-medium text-gray-900">
                                                {user.name || 'N/A'}
                                            </div>
                                            <div className="text-xs text-gray-500 md:hidden">
                                                {user.email || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {user.email || 'N/A'}
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                    {getRoleBadge(user.role)}
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onViewDetail(user)}
                                        className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        title="Lihat Detail"
                                    >
                                        <Info className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}