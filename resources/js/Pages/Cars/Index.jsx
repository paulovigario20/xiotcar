import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CarsIndex({ cars }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Lista de Carros</h2>}
        >
            <Head title="Carros" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Marca</th>
                                <th className="px-4 py-2">Modelo</th>
                                <th className="px-4 py-2">Ano</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map(car => (
                                <tr key={car.id} className="border-t">
                                    <td className="px-4 py-2">{car.id}</td>
                                    <td className="px-4 py-2">{car.brand?.name}</td>
                                    <td className="px-4 py-2">{car.model}</td>
                                    <td className="px-4 py-2">{car.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}