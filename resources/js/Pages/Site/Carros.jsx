import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function Carros({ cars }) {
    return (
        <PublicLayout>
            <Head title="Carros à Venda" />

            <section className="bg-gray-100 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Carros Disponíveis</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map(car => (
                            <div key={car.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105">
                                {/* Placeholder de imagem — substitui car.image_url depois */}
                                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                                    <span>Imagem do carro</span>
                                    {/* Exemplo: <img src={car.image_url} alt={car.model} className="w-full h-full object-cover" /> */}
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{car.brand.name} {car.model}</h2>
                                    <p className="text-gray-600 mb-1">Ano: <strong>{car.year}</strong></p>
                                    <p className="text-gray-600 mb-1">Preço: <strong>{car.price ? `€${car.price.toLocaleString()}` : 'Sob consulta'}</strong></p>
                                    
                                    <Link
                                        href={`/carros/${car.id}`}
                                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-all"
                                    >
                                        Ver Detalhes
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Placeholder caso ainda não haja carros */}
                        {cars.length === 0 && (
                            <div className="col-span-full text-center text-gray-500 text-lg">
                                Nenhum veículo disponível no momento. Volte em breve!
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}