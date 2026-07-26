import { Link } from "@inertiajs/react";
import StatusBadge from "./status-badge";

export default function TaskCard({ task }) {
    return (
        <Link
            href={route("tasks.show", task.id)}
            className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-indigo-200 transition"
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-slate-800 line-clamp-1">
                    {task.title}
                </h3>
                <StatusBadge status={task.status} />
            </div>
            <p className="text-sm text-slate-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                {task.description || "Tidak ada deskripsi."}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                    {new Date(task.created_at).toLocaleDateString("id-ID")}
                </span>
                <span>{task.photos_count} foto bukti</span>
            </div>
        </Link>
    );
}
