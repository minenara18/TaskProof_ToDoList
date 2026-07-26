import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import StatusBadge from "../../components/status-badge";
import PhotoGallery from "../../components/photo-gallery";
import ConfirmDeleteModal from "../../components/confirm-delete-modal";

export default function Show({ task }) {
    const { flash } = usePage().props;
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("tasks.destroy", task.id), {
            onSuccess: () => setConfirmOpen(false),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Link
                    href={route("tasks.index")}
                    className="text-sm text-slate-500 hover:text-slate-700"
                >
                    ← Kembali ke daftar
                </Link>

                {flash?.success && (
                    <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-slate-200 p-6 mt-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h1 className="text-2xl font-bold text-slate-800">
                            {task.title}
                        </h1>
                        <StatusBadge status={task.status} />
                    </div>

                    <p className="text-slate-600 mb-6 whitespace-pre-line">
                        {task.description || "Tidak ada deskripsi."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 mb-6 border-t border-slate-100 pt-4">
                        <div>
                            <span className="block text-xs text-slate-400">
                                Dibuat
                            </span>
                            {new Date(task.created_at).toLocaleString("id-ID")}
                        </div>
                        <div>
                            <span className="block text-xs text-slate-400">
                                Terakhir diubah
                            </span>
                            {new Date(task.updated_at).toLocaleString("id-ID")}
                        </div>
                    </div>

                    <div className="flex gap-3 mb-8">
                        <Link
                            href={route("tasks.edit", task.id)}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                        >
                            Edit Task
                        </Link>
                        <button
                            onClick={() => setConfirmOpen(true)}
                            className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
                        >
                            Hapus Task
                        </button>
                    </div>

                    <h2 className="font-semibold text-slate-800 mb-3">
                        Foto Bukti
                    </h2>
                    <PhotoGallery photos={task.photos} />
                </div>
            </div>

            <ConfirmDeleteModal
                open={confirmOpen}
                title="Hapus task ini?"
                message="Task akan dihapus dari daftar aktif namun tetap tersimpan sebagai histori."
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                processing={processing}
            />
        </div>
    );
}
