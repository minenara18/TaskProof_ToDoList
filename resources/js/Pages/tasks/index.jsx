import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import TaskCard from "../../components/task-card";

export default function Index({ tasks, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("tasks.index"),
            { search },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <div className="max-w-5xl mx-auto px-4 pt-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Daftar Task
                        </h1>
                        <p className="text-sm text-slate-500">
                            Kelola pekerjaan dan bukti prosesnya.
                        </p>
                    </div>
                    <Link
                        href={route("tasks.create")}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition text-center"
                    >
                        + Task Baru
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSearch} className="mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari berdasarkan judul atau deskripsi..."
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </form>

                {tasks.data.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl bg-white">
                        <p className="text-slate-400 mb-4">
                            Belum ada task yang cocok.
                        </p>
                        <Link
                            href={route("tasks.create")}
                            className="text-indigo-600 text-sm font-medium hover:underline"
                        >
                            Buat task pertamamu
                        </Link>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.data.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                )}

                {tasks.links && tasks.data.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {tasks.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url &&
                                    router.visit(link.url, {
                                        preserveState: true,
                                    })
                                }
                                className={`px-3 py-1.5 rounded-lg text-sm border ${
                                    link.active
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                } ${!link.url ? "opacity-40 cursor-not-allowed" : ""}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
