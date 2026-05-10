import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function CarsIndex({ cars }) {
    const handleDelete = (car) => {
        if (confirm(`Tem a certeza que quer eliminar ${car.brand?.name} ${car.model}?`)) {
            router.delete(`/cars/${car.id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold leading-tight text-gray-800">Lista de Carros</h2>
                    <Link href="/cars/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
                        + Adicionar Carro
                    </Link>
                </div>
            }
        >
            <Head title="Carros" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <table className="min-w-full table-auto text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Foto</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Marca</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Modelo</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ano</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Preço</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Km</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map(car => (
                                <tr key={car.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        {car.image ? (
                                            <img src={`/storage/${car.image}`} alt="" className="w-16 h-12 object-cover rounded" />
                                        ) : (
                                            <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                                Sem foto
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 font-medium">{car.brand?.name}</td>
                                    <td className="px-4 py-2">{car.model}</td>
                                    <td className="px-4 py-2">{car.year}</td>
                                    <td className="px-4 py-2 font-semibold">
                                        {car.price ? `€${Number(car.price).toLocaleString()}` : '—'}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-500">
                                        {car.kilometers ? `${Number(car.kilometers).toLocaleString()} km` : '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {car.is_sold ? (
                                            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">Vendido</span>
                                        ) : (
                                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">Disponível</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <Link href={`/cars/${car.id}/edit`}
                                                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition">
                                                Editar
                                            </Link>
                                            <button onClick={() => handleDelete(car)}
                                                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition">
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cars.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                        Nenhum carro registado. <Link href="/cars/create" className="text-blue-600 hover:underline">Adicionar o primeiro</Link>
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
