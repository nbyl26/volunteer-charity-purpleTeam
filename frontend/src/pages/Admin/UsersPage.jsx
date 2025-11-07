import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../config/api";
import UserStats from "../../components/admin/users/UserStats";
import UserSearch from "../../components/admin/users/UserSearch";
import UserTable from "../../components/admin/users/UserTable";
import UserDetailModal from "../../components/admin/users/UserDetailModal";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        applySearch();
    }, [users, searchTerm]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/users");
            const userList = response.data || [];
            setUsers(userList);
            setFilteredUsers(userList);
        } catch (error) {
            toast.error("Gagal memuat data pengguna");
            setUsers([]);
            setFilteredUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const applySearch = () => {
        if (!searchTerm.trim()) {
            setFilteredUsers(users);
            return;
        }

        const keyword = searchTerm.toLowerCase();
        const filtered = users.filter(user =>
            user.name?.toLowerCase().includes(keyword) ||
            user.email?.toLowerCase().includes(keyword)
        );
        setFilteredUsers(filtered);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola Pengguna</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Kelola semua pengguna yang terdaftar di platform
                </p>
            </div>

            <UserStats users={users} />

            <UserSearch 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <UserTable 
                users={filteredUsers}
                onViewDetail={setSelectedUser}
            />

            {selectedUser && (
                <UserDetailModal 
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}