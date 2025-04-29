import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function BrandsIndex({ brands }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Lista de Marcas</h2>}
        >
            <Head title="Marcas" />

            <div className="py-12 max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <ul className="divide-y divide-gray-200">
                        {brands.map(brand => (
                            <li key={brand.id} className="py-2">
                                {brand.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}