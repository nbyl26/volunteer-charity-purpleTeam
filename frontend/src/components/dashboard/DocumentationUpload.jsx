import { useState } from "react";
import { Upload, Loader2, CheckCircle, X, Image as ImageIcon } from "lucide-react";
import api from "../../config/api";
import toast from "react-hot-toast";

export default function DocumentationUpload({ registration, onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Hanya file gambar yang diperbolehkan");
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            toast.error("Ukuran file maksimal 5MB");
            return;
        }

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Pilih foto dokumentasi terlebih dahulu");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("documentation", file);

            await api.post(`/upload/documentation/${registration.ID || registration.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Dokumentasi berhasil diupload!");
            setShowModal(false);
            setFile(null);
            setPreview(null);

            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            console.error("Upload error:", error);

            if (error.response?.status === 404) {
                toast.error("Pendaftaran event tidak ditemukan");
            } else if (error.response?.status === 400) {
                toast.error("File tidak valid atau terlalu besar");
            } else {
                toast.error("Gagal mengupload dokumentasi. Silakan coba lagi.");
            }
        } finally {
            setUploading(false);
        }
    };

    const hasDocumentation = registration?.DocumentationUpload || registration?.documentation_upload;

    return (
        <>
            {hasDocumentation ? (
                <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">Dokumentasi Sudah Diupload</span>
                    <button
                        onClick={() => window.open(`http://localhost:8080${hasDocumentation}`, "_blank")}
                        className="text-purple-600 hover:text-purple-700 underline"
                    >
                        Lihat
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm font-medium"
                >
                    <Upload className="w-4 h-4" />
                    Upload Dokumentasi
                </button>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Upload Dokumentasi Kegiatan
                            </h3>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setFile(null);
                                    setPreview(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Event:</strong> {registration?.Event?.Title || registration?.event?.title || "Event"}
                            </p>
                            <p className="text-xs text-gray-500">
                                Upload foto dokumentasi aktivitas Anda selama event (maks. 5MB)
                            </p>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="doc-upload"
                                className="block w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 transition"
                            >
                                {preview ? (
                                    <div className="space-y-2">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <p className="text-sm text-gray-600">{file.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                                        <p className="text-sm text-gray-600">
                                            Klik untuk pilih foto
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, JPEG (maks. 5MB)
                                        </p>
                                    </div>
                                )}
                            </label>
                            <input
                                id="doc-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={uploading}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setFile(null);
                                    setPreview(null);
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                                disabled={uploading}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {uploading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Uploading...
                                    </div>
                                ) : (
                                    "Upload"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}