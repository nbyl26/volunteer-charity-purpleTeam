import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data);
            } catch (error) {
                console.log("No valid session found");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        if (res.status === 200) {
            const me = await api.get("/auth/me");
            if (me && me.data) {
                const fullName = (me.data.name || "").trim();
                if (!fullName) {
                    me.data.firstName = "";
                    me.data.lastName = "";
                } else {
                    const parts = fullName.split(/\s+/);
                    me.data.firstName = parts[0] || "";
                    me.data.lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
                }
                setUser(me.data);
                return { success: true, user: me.data };
            }
        }
        return { success: false, message: "Login gagal" };
    };

    const register = async (name, email, password) => {
        const res = await api.post("/auth/register", { name, email, password });
        if (res.status === 201) {
            return { success: true };
        }
        return { success: false, message: "Registrasi gagal" };
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
        }
    };

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                return;
            }

            const response = await api.get(API_ENDPOINTS.AUTH.ME);
            setUser(response.data.user);
        } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);