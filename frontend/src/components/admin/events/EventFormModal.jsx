import React, { useState, useEffect } from "react";
import api, { API_ENDPOINTS } from "../../../config/api";
import { X, Loader2, Upload, Calendar, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function EventFormModal({ event, onClose, onSaved }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        event_date: "",
        category: ""
    });
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (event) {
            setForm({
                title: event.Title || event.title || "",
                description: event.Description || event.description || "",
                location: event.Location || event.location || "",
                event_date: event.EventDate ? event.EventDate.split('T')[0] : "",
                category: event.Category || event.category || ""
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error("Harap pilih file gambar");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Ukuran file maksimal 5MB");
                return;
            }
            setPhoto(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Judul wajib diisi";
        if (!form.description.trim()) newErrors.description = "Deskripsi wajib diisi";
        if (!form.location.trim()) newErrors.location = "Lokasi wajib diisi";
        if (!form.event_date) newErrors.event_date = "Tanggal event wajib diisi";
        if (!form.category.trim()) newErrors.category = "Kategori wajib diisi";
        if (!event && !photo) newErrors.photo = "Foto event wajib diisi";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Harap isi semua field yang wajib");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", form.title.trim());
            formData.append("description", form.description.trim());
            formData.append("location", form.location.trim());
            formData.append("category", form.category.trim());
            formData.append("event_date", new Date(form.event_date).toISOString());

            if (photo) {
                formData.append("photo", photo);
            }

            let response;
            if (event && event.id) {
                response = await api.put(`/events/${event.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Event berhasil diperbarui!");
            } else {
                response = await api.post("/events", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Event berhasil ditambahkan!");
            }

            onSaved(response.data);
            onClose();
        } catch (error) {
            console.error("Gagal menyimpan event:", error);
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else if (error.response?.data?.errors) {
                const backendErrors = error.response.data.errors;
                setErrors(backendErrors);
                toast.error("Harap perbaiki kesalahan pada form");
            } else {
                toast.error("Terjadi kesalahan saat menyimpan event");
            }
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        "Pendidikan", "Kesehatan", "Komunitas", "Lingkungan",
        "Sosial", "Budaya", "Teknologi", "Lainnya"
    ];

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {event ? "Edit Event" : "Tambah Event Baru"}
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
                            Judul Event <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Masukkan judul event"
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            disabled={loading}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Jelaskan tentang event ini..."
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            disabled={loading}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            Lokasi <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Contoh: Jakarta Selatan, Indonesia"
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${errors.location ? 'border-red-500' : 'border-gray-300'
                                }`}
                            disabled={loading}
                        />
                        {errors.location && (
                            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Tanggal Event <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="event_date"
                            value={form.event_date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${errors.event_date ? 'border-red-500' : 'border-gray-300'
                                }`}
                            disabled={loading}
                        />
                        {errors.event_date && (
                            <p className="text-red-500 text-xs mt-1">{errors.event_date}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kategori <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
                            disabled={loading}
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Upload className="w-4 h-4 inline mr-1" />
                            Foto Event {!event && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition ${errors.photo ? 'border-red-500' : 'border-gray-300'
                                }`}
                            disabled={loading}
                        />
                        {errors.photo && (
                            <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                            {event ? "Upload foto baru jika ingin mengubah (opsional)" : "Format: JPG, PNG, GIF. Maksimal 5MB"}
                        </p>
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
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <span>{event ? "Perbarui" : "Tambah"}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}