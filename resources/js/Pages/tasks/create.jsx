import { Link, useForm } from '@inertiajs/react';
import TaskForm from '../../components/task-form';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        status: 'pending',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-lg mx-auto">
                <Link href={route('tasks.index')} className="text-sm text-slate-500 hover:text-slate-700">
                    ← Kembali ke daftar
                </Link>
                <h1 className="text-2xl font-bold text-slate-800 mt-2 mb-6">Buat Task Baru</h1>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <TaskForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel="Simpan Task"
                    />
                </div>
            </div>
        </div>
    );
}
