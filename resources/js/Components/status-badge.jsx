const STATUS_STYLES = {
    pending: 'bg-slate-100 text-slate-600 border border-slate-200',
    in_progress: 'bg-amber-100 text-amber-700 border border-amber-200',
    completed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
};

const STATUS_LABELS = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
};

export default function StatusBadge({ status }) {
    return (
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status] ?? STATUS_STYLES.pending}`}>
            {STATUS_LABELS[status] ?? status}
        </span>
    );
}
