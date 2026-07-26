import { useState } from "react";

export default function PhotoGallery({ photos, onDelete, editable = false }) {
    const [selected, setSelected] = useState(null);

    if (!photos || photos.length === 0) {
        return (
            <div className="text-center py-10 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl">
                Belum ada foto bukti.
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                        <img
                            src={`/storage/${photo.photo_path}`}
                            alt={photo.caption || "Foto bukti"}
                            onClick={() => setSelected(photo)}
                            className="w-full h-28 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-90 transition"
                        />
                        {editable && (
                            <button
                                type="button"
                                onClick={() => onDelete(photo)}
                                className="absolute top-1 right-1 bg-red-600 text-white text-xs w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {selected && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
                    onClick={() => setSelected(null)}
                >
                    <img
                        src={`/storage/${selected.photo_path}`}
                        alt={selected.caption || "Foto bukti"}
                        className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </>
    );
}
