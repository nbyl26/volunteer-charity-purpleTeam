import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("purplecare_user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const USERS = [
        { email: "admin@purplecare.com", password: "admin", role: "admin", name: "Admin PurpleCare" },
        { email: "user@purplecare.com", password: "user123", role: "user", name: "John Doe" },
    ];

    const login = (email, password) => {
        const found = USERS.find((u) => u.email === email && u.password === password);
        if (!found) return { success: false, message: "Email atau kata sandi tidak valid." };

        setUser(found);
        localStorage.setItem("purplecare_user", JSON.stringify(found));
        return { success: true };
    };

    const register = (name, email, password) => {
        const exists = USERS.find((u) => u.email === email);
        if (exists) return { success: false, message: "Email sudah terdaftar." };

        const newUser = { name, email, password, role: "user" };
        setUser(newUser);
        localStorage.setItem("purplecare_user", JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("purplecare_user");
    };

    const forgotPassword = (email) => {
        const exists = USERS.find((u) => u.email === email);
        if (!exists)
            return { success: false, message: "Tidak ditemukan akun dengan email tersebut." };

        return {
            success: true,
            message: "Tautan atur ulang kata sandi telah dikirim! (simulasi)",
        };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, forgotPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);