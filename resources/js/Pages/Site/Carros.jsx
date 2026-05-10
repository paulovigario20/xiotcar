import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Carros({ cars }) {
    return (
        <PublicLayout>
            <Head title="Viaturas" />

            {/* Hero */}
            <section className="bg-zinc-900 py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Viaturas Disponíveis</h1>
                    <p className="text-gray-400">Explore a nossa seleção de usados e semi-novos.</p>
                    <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
                </div>
            </section>

            {/* Car Grid */}
            <section className="bg-black py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map(car => (
                            <Link key={car.id} href={`/carros/${car.id}`}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/30 transition group block">

                                {/* Image */}
                                <div className="h-52 bg-zinc-800 overflow-hidden">
                                    {car.image ? (
                                        <img src={`/storage/${car.image}`} alt={`${car.brand?.name} ${car.model}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                            <i className="fas fa-car text-4xl"></i>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="p-5">
                                    <h2 className="text-lg font-semibold text-white mb-2">
                                        {car.brand?.name} {car.model}
                                    </h2>

                                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                                        <span><i className="fas fa-calendar-alt text-yellow-400 mr-1"></i>{car.year}</span>
                                        {car.kilometers && <span><i className="fas fa-tachometer-alt text-yellow-400 mr-1"></i>{Number(car.kilometers).toLocaleString()} km</span>}
                                        {car.fuel && <span><i className="fas fa-gas-pump text-yellow-400 mr-1"></i>{car.fuel}</span>}
                                        {car.transmission && <span><i className="fas fa-cog text-yellow-400 mr-1"></i>{car.transmission}</span>}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-yellow-400">
                                            {car.price ? `€${Number(car.price).toLocaleString()}` : 'Sob consulta'}
                                        </span>
                                        {car.is_sold && (
                                            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">VENDIDO</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {cars.length === 0 && (
                            <div className="col-span-full text-center py-20">
                                <i className="fas fa-car text-6xl text-zinc-700 mb-4"></i>
                                <p className="text-gray-500 text-lg">Nenhuma viatura disponível no momento.</p>
                                <p className="text-gray-600 text-sm mt-2">Volte em breve ou contacte-nos para mais informações.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
