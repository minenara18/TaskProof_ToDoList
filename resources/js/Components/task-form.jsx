const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
];

export default function TaskForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Judul Task
                </label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    maxLength={255}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Contoh: Perbaikan atap gudang"
                />
                {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Deskripsi
                </label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Detail pekerjaan (opsional)"
                />
                {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.description}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status
                </label>
                <select
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {errors.status && (
                    <p className="text-xs text-red-500 mt-1">{errors.status}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
            >
                {processing ? "Menyimpan..." : submitLabel}
            </button>
        </form>
    );
}
