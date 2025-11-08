import { AlertCircle, Calendar, MapPin } from "lucide-react";
import DocumentationUpload from "./DocumentationUpload";

export default function EventRegistrationList({ registrations, onUploadSuccess }) {
    if (!registrations || registrations.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm">Belum ada pendaftaran event</p>
            </div>
        );
    }

    const getStatusBadge = (status) => {
        const statusLower = (status || "").toLowerCase();
        const badges = {
            pending: "bg-yellow-100 text-yellow-800",
            approved: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
            selesai: "bg-blue-100 text-blue-800",
        };
        return badges[statusLower] || "bg-gray-100 text-gray-800";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "Tanggal tidak valid";
        }
    };

    const displayedRegistrations = registrations.slice(0, 5);

    return (
        <div className="space-y-3">
            {displayedRegistrations.map((registration) => {
                const event = registration.Event || registration.event;
                const status = registration.Status || registration.status;
                const statusLower = (status || "").toLowerCase();

                return (
                    <div
                        key={registration.ID || registration.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {event?.Title || event?.title || "Event"}
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                        <span>{formatDate(event?.EventDate || event?.event_date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                        <span>{event?.Location || event?.location || "Lokasi"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 items-start md:items-end">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                                        status
                                    )}`}
                                >
                                    {status?.toUpperCase() || "PENDING"}
                                </span>

                                {(statusLower === "approved" || statusLower === "selesai") && (
                                    <DocumentationUpload
                                        registration={registration}
                                        onUploadSuccess={onUploadSuccess}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}