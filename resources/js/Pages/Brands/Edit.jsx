import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function EditBrand({ brand }) {
    const { data, setData, put, processing, errors } = useForm({
        name: brand.name || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/brands/${brand.id}`);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Editar Marca</h2>}
        >
            <Head title="Editar Marca" />

            <div className="py-12 max-w-xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome da marca *</label>
                            <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" disabled={processing}
                                className="py-2 px-6 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                                {processing ? 'A guardar...' : 'Guardar Alterações'}
                            </button>
                            <Link href="/brands" className="py-2 px-6 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                                Voltar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
