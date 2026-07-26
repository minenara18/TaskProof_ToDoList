export default function ConfirmDeleteModal({
    open,
    title,
    message,
    onCancel,
    onConfirm,
    processing,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                <h3 className="font-semibold text-slate-800 text-lg mb-2">
                    {title}
                </h3>
                <p className="text-sm text-slate-500 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={processing}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                        {processing ? "Menghapus..." : "Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
