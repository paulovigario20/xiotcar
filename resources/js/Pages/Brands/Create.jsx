import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CreateBrand() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('brands.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Adicionar Marca</h2>}
        >
            <Head title="Adicionar Marca" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome da Marca
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                {processing ? 'Criando Marca...' : 'Criar Marca'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-4">
                        <Link href="/brands" className="text-blue-500 hover:text-blue-700">
                            Voltar à lista de marcas
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}