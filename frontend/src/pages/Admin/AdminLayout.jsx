import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import AdminNavbar from "../../components/admin/layout/AdminNavbar";

export default function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <AdminSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-20 md:pt-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}