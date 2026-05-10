import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function BrandsIndex({ brands }) {
    const handleDelete = (brand) => {
        if (confirm(`Tem a certeza que quer eliminar a marca "${brand.name}"?`)) {
            router.delete(`/brands/${brand.id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold leading-tight text-gray-800">Marcas</h2>
                    <Link href="/brands/create" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
                        + Adicionar Marca
                    </Link>
                </div>
            }
        >
            <Head title="Marcas" />

            <div className="py-12 max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <table className="min-w-full table-auto text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nome</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Carros</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map(brand => (
                                <tr key={brand.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-500">{brand.id}</td>
                                    <td className="px-4 py-3 font-medium">{brand.name}</td>
                                    <td className="px-4 py-3">
                                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                                            {brand.cars_count || 0}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <Link href={`/brands/${brand.id}/edit`}
                                                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition">
                                                Editar
                                            </Link>
                                            <button onClick={() => handleDelete(brand)}
                                                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                                                disabled={brand.cars_count > 0}
                                                title={brand.cars_count > 0 ? 'Não pode eliminar marca com carros' : ''}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {brands.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                        Nenhuma marca registada. <Link href="/brands/create" className="text-blue-600 hover:underline">Adicionar a primeira</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
