import { Link } from "@inertiajs/react";

export default function Splash() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
            <div className="text-center max-w-md">
                <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    TP
                </div>
                <h1 className="text-4xl font-bold text-slate-800 mb-3">
                    TaskProof
                </h1>
                <p className="text-slate-500 mb-8">
                    Catat pekerjaan. Pantau progres. Simpan bukti.
                </p>
                <Link
                    href={route("tasks.index")}
                    className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md"
                >
                    Mulai
                </Link>
            </div>
        </div>
    );
}
