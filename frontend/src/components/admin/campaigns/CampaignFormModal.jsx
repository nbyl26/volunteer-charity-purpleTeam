import React, { useState, useEffect } from "react";
import api, { API_ENDPOINTS } from "../../../config/api";
import toast from "react-hot-toast";
import { X, Loader2 } from "lucide-react";

export default function CampaignFormModal({ campaign, onClose, onSaved }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        target: 10000,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (campaign) {
            setForm({
                title: campaign.title || "",
                description: campaign.description || "",
                target: campaign.target || 10000,
            });
        } else {
            setForm({
                title: "",
                description: "",
                target: 10000,
            });
        }
        setErrors({});
    }, [campaign]);

    const validateForm = () => {
        const newErrors = {};

        if (!form.title.trim()) {
            newErrors.title = "Judul campaign wajib diisi";
        } else if (form.title.trim().length < 5) {
            newErrors.title = "Judul minimal 5 karakter";
        }

        if (!form.description.trim()) {
            newErrors.description = "Deskripsi wajib diisi";
        }

        if (!form.target || form.target < 10000) {
            newErrors.target = "Target minimal Rp 10.000";
        } else if (form.target > 1000000000) {
            newErrors.target = "Target maksimal Rp 1.000.000.000";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "target" ? parseFloat(value) || 0 : value,
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Harap perbaiki kesalahan pada form");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                title: form.title.trim(),
                description: form.description.trim(),
                target: parseFloat(form.target),
            };

            console.log("Submitting payload:", payload);

            let response;
            if (campaign && campaign.id) {
                response = await api.put(API_ENDPOINTS.CAMPAIGNS.UPDATE(campaign.id), payload);
                console.log("Update response:", response.data);
                toast.success("Campaign berhasil diperbarui! ✅");
            } else {
                response = await api.post(API_ENDPOINTS.CAMPAIGNS.CREATE, payload);
                console.log("Create response:", response.data);
                toast.success("Campaign berhasil ditambahkan!");
            }

            onSaved(response.data);
            onClose();
        } catch (error) {
            console.error("Gagal menyimpan campaign:", error);
            
            if (error.response?.data?.error) {
                const backendError = error.response.data.error;
                
                if (backendError.includes("title") && backendError.includes("min=5")) {
                    setErrors(prev => ({ ...prev, title: "Judul minimal 5 karakter" }));
                } else if (backendError.includes("target") && backendError.includes("gt=0")) {
                    setErrors(prev => ({ ...prev, target: "Target harus lebih dari 0" }));
                } else {
                    toast.error(backendError);
                }
            } else if (error.response?.status === 403) {
                toast.error("Anda tidak memiliki izin untuk mengelola campaign");
            } else if (error.response?.status === 401) {
                toast.error("Silakan login terlebih dahulu");
            } else {
                toast.error("Terjadi kesalahan saat menyimpan campaign");
            }
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {campaign ? "Edit Campaign" : "Tambah Campaign Baru"}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="p-1 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Judul Campaign <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            minLength={5}
                            placeholder="Masukkan judul campaign (min. 5 karakter)"
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={loading}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                            Minimal 5 karakter
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            required
                            placeholder="Jelaskan tujuan dan latar belakang campaign ini..."
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={loading}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Donasi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="target"
                            value={form.target}
                            onChange={handleChange}
                            required
                            min="10000"
                            step="1000"
                            placeholder="10000"
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${
                                errors.target ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={loading}
                        />
                        {errors.target && (
                            <p className="text-red-500 text-xs mt-1">{errors.target}</p>
                        )}
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Minimal: {formatCurrency(10000)}</span>
                            <span>Input: {formatCurrency(form.target)}</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:opacity-50 transition min-w-20 justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}