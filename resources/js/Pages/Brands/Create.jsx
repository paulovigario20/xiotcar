import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CreateBrand() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/brands');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Adicionar Marca</h2>}
        >
            <Head title="Adicionar Marca" />

            <div className="py-12 max-w-xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome da marca *</label>
                            <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Ex: BMW, Mercedes-Benz, Polestar..." />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" disabled={processing}
                                className="py-2 px-6 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                {processing ? 'A guardar...' : 'Criar Marca'}
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
