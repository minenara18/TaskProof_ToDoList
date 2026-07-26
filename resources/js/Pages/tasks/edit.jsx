import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import TaskForm from '../../components/task-form';
import PhotoGallery from '../../components/photo-gallery';
import ConfirmDeleteModal from '../../components/confirm-delete-modal';

export default function Edit({ task }) {
    const { flash } = usePage().props;
    const [photoToDelete, setPhotoToDelete] = useState(null);

    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        description: task.description || '',
        status: task.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tasks.update', task.id));
    };

    const {
        data: photoData,
        setData: setPhotoData,
        post: postPhotos,
        processing: uploadingPhotos,
        errors: photoErrors,
        reset: resetPhotoForm,
    } = useForm({ photos: [] });

    const submitPhotos = (e) => {
        e.preventDefault();
        postPhotos(route('tasks.photos.store', task.id), {
            forceFormData: true,
            onSuccess: () => resetPhotoForm(),
        });
    };

    const { delete: destroyPhoto, processing: deletingPhoto } = useForm();

    const confirmDeletePhoto = () => {
        destroyPhoto(route('tasks.photos.destroy', [task.id, photoToDelete.id]), {
            onSuccess: () => setPhotoToDelete(null),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Link
                    href={route("tasks.index")}
                    className="text-sm text-slate-500 hover:text-slate-700"
                >
                    ← Kembali ke daftar task
                </Link>
                <h1 className="text-2xl font-bold text-slate-800 mt-2 mb-6">
                    Edit Task
                </h1>

                {flash?.success && (
                    <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <TaskForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel="Perbarui Task"
                    />
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="font-semibold text-slate-800 mb-4">
                        Foto Bukti
                    </h2>

                    <form onSubmit={submitPhotos} className="mb-6 space-y-3">
                        <input
                            type="file"
                            multiple
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(e) =>
                                setPhotoData(
                                    "photos",
                                    Array.from(e.target.files),
                                )
                            }
                            className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm file:font-medium hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-slate-400">
                            Format jpg, jpeg, png, webp. Maksimal 5MB per foto.
                        </p>
                        {photoErrors.photos && (
                            <p className="text-xs text-red-500">
                                {photoErrors.photos}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={
                                uploadingPhotos || photoData.photos.length === 0
                            }
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
                        >
                            {uploadingPhotos ? "Mengupload..." : "Upload Foto"}
                        </button>
                    </form>

                    <PhotoGallery
                        photos={task.photos}
                        editable
                        onDelete={(photo) => setPhotoToDelete(photo)}
                    />
                </div>
            </div>

            <ConfirmDeleteModal
                open={!!photoToDelete}
                title="Hapus foto ini?"
                message="Foto yang dihapus tidak dapat dikembalikan."
                onCancel={() => setPhotoToDelete(null)}
                onConfirm={confirmDeletePhoto}
                processing={deletingPhoto}
            />
        </div>
    );
}
