import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CreateCar({ brands }) {
    const { data, setData, post, processing, errors } = useForm({
        model: '',
        year: '',
        brand_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cars.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Adicionar Carro</h2>}
        >
            <Head title="Adicionar Carro" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                                Modelo
                            </label>
                            <input
                                id="model"
                                type="text"
                                value={data.model}
                                onChange={(e) => setData('model', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.model && <span className="text-red-500 text-sm">{errors.model}</span>}
                        </div>

                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                Ano
                            </label>
                            <input
                                id="year"
                                type="number"
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.year && <span className="text-red-500 text-sm">{errors.year}</span>}
                        </div>

                        <div>
                            <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">
                                Marca
                            </label>
                            <select
                                id="brand_id"
                                value={data.brand_id}
                                onChange={(e) => setData('brand_id', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Selecione uma marca</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            {errors.brand_id && <span className="text-red-500 text-sm">{errors.brand_id}</span>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {processing ? 'Criando Carro...' : 'Criar Carro'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-4">
                        <Link href="/cars" className="text-blue-500 hover:text-blue-700">
                            Voltar à lista de carros
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}