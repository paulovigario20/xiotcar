import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function CarroDetalhes({ carro }) {
    const allPhotos = [
        carro.image ? `/storage/${carro.image}` : null,
        ...(carro.extra_photos || []).map(p => `/storage/${p}`),
    ].filter(Boolean);

    const [activePhoto, setActivePhoto] = useState(allPhotos[0] || null);

    return (
        <PublicLayout>
            <Head title={`${carro.brand?.name} ${carro.model}`} />

            <section className="bg-black py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <Link href="/carros" className="text-yellow-400 hover:text-yellow-300 text-sm mb-6 inline-block">
                        <i className="fas fa-arrow-left mr-2"></i> Voltar às viaturas
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Photos */}
                        <div>
                            {/* Main photo */}
                            <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 mb-4">
                                {activePhoto ? (
                                    <img src={activePhoto} alt={`${carro.brand?.name} ${carro.model}`}
                                        className="w-full h-[400px] object-cover" />
                                ) : (
                                    <div className="w-full h-[400px] flex items-center justify-center text-gray-600">
                                        <i className="fas fa-car text-6xl"></i>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {allPhotos.length > 1 && (
                                <div className="grid grid-cols-5 gap-2">
                                    {allPhotos.map((photo, i) => (
                                        <button key={i} onClick={() => setActivePhoto(photo)}
                                            className={`rounded-lg overflow-hidden border-2 transition ${
                                                activePhoto === photo ? 'border-yellow-400' : 'border-zinc-700 hover:border-zinc-500'
                                            }`}>
                                            <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-16 object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div>
                            <div className="mb-2">
                                {carro.is_sold && (
                                    <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded mr-2">VENDIDO</span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-white mb-1">
                                {carro.brand?.name} {carro.model}
                            </h1>
                            {carro.version && (
                                <p className="text-gray-400 text-lg mb-4">{carro.version}</p>
                            )}

                            <div className="text-3xl font-bold text-yellow-400 mb-8">
                                €{Number(carro.price).toLocaleString()}
                            </div>

                            {/* Specs grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {carro.year && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Ano</div>
                                        <div className="text-white font-semibold">{carro.year}</div>
                                    </div>
                                )}
                                {carro.kilometers != null && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Quilómetros</div>
                                        <div className="text-white font-semibold">{Number(carro.kilometers).toLocaleString()} km</div>
                                    </div>
                                )}
                                {carro.fuel && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Combustível</div>
                                        <div className="text-white font-semibold">{carro.fuel}</div>
                                    </div>
                                )}
                                {carro.transmission && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Transmissão</div>
                                        <div className="text-white font-semibold">{carro.transmission}</div>
                                    </div>
                                )}
                                {carro.power > 0 && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Potência</div>
                                        <div className="text-white font-semibold">{carro.power} cv</div>
                                    </div>
                                )}
                                {carro.color && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Cor</div>
                                        <div className="text-white font-semibold">{carro.color}</div>
                                    </div>
                                )}
                                {carro.doors > 0 && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Portas</div>
                                        <div className="text-white font-semibold">{carro.doors}</div>
                                    </div>
                                )}
                                {carro.engine_capacity && (
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                        <div className="text-gray-500 text-xs uppercase mb-1">Cilindrada</div>
                                        <div className="text-white font-semibold">{carro.engine_capacity} cc</div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {carro.description && (
                                <div className="mb-8">
                                    <h3 className="text-white font-semibold mb-2">Descrição</h3>
                                    <p className="text-gray-400 leading-relaxed">{carro.description}</p>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://wa.me/935920018" target="_blank"
                                    className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg text-center transition">
                                    <i className="fab fa-whatsapp mr-2"></i> WhatsApp
                                </a>
                                <a href="tel:+351935920018"
                                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg text-center transition">
                                    <i className="fas fa-phone mr-2"></i> Ligar
                                </a>
                                <Link href="/contacto"
                                    className="border border-zinc-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-400 font-semibold px-6 py-3 rounded-lg text-center transition">
                                    <i className="fas fa-envelope mr-2"></i> Contactar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
