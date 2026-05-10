import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EditCar({ car, brands }) {
    const { data, setData, put, post, processing, errors, progress } = useForm({
        _method: 'PUT',
        model: car.model || '',
        year: car.year || '',
        brand_id: car.brand_id || '',
        price: car.price || '',
        kilometers: car.kilometers || '',
        fuel: car.fuel || '',
        transmission: car.transmission || '',
        power: car.power || '',
        description: car.description || '',
        is_sold: car.is_sold || false,
        photos: [],
    });

    const [previews, setPreviews] = useState([]);

    const handlePhotos = (e) => {
        const files = Array.from(e.target.files);
        setData('photos', files);
        setPreviews(files.map(f => URL.createObjectURL(f)));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/cars/${car.id}`, {
            forceFormData: true,
            onSuccess: () => alert('Carro atualizado com sucesso!'),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Editar Carro</h2>}
        >
            <Head title="Editar Carro" />

            <div className="py-12 max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Marca *</label>
                            <select value={data.brand_id} onChange={(e) => setData('brand_id', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="">Selecione uma marca</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                            {errors.brand_id && <span className="text-red-500 text-sm">{errors.brand_id}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Modelo *</label>
                            <input type="text" value={data.model} onChange={(e) => setData('model', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            {errors.model && <span className="text-red-500 text-sm">{errors.model}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ano *</label>
                            <input type="number" value={data.year} onChange={(e) => setData('year', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            {errors.year && <span className="text-red-500 text-sm">{errors.year}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preço (€) *</label>
                            <input type="number" step="0.01" value={data.price} onChange={(e) => setData('price', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quilómetros</label>
                            <input type="number" value={data.kilometers} onChange={(e) => setData('kilometers', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Combustível</label>
                            <select value={data.fuel} onChange={(e) => setData('fuel', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="">Selecione</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="Elétrico">Elétrico</option>
                                <option value="GPL">GPL</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Transmissão</label>
                            <select value={data.transmission} onChange={(e) => setData('transmission', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="">Selecione</option>
                                <option value="Manual">Manual</option>
                                <option value="Automática">Automática</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Potência (cv)</label>
                            <input type="number" value={data.power} onChange={(e) => setData('power', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Descrição</label>
                            <textarea rows={3} value={data.description} onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>

                        {/* Sold toggle */}
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={data.is_sold}
                                    onChange={(e) => setData('is_sold', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                <span className="text-sm font-medium text-gray-700">Marcar como vendido</span>
                            </label>
                        </div>

                        {/* Current image */}
                        {car.image && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Foto atual</label>
                                <img src={`/storage/${car.image}`} alt="Foto atual"
                                    className="h-40 object-cover rounded-lg border border-gray-200" />
                            </div>
                        )}

                        {/* Photo Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Substituir fotografias
                            </label>
                            <input type="file" multiple accept="image/*" onChange={handlePhotos}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            <p className="text-xs text-gray-400 mt-1">Deixe vazio para manter as fotos atuais.</p>

                            {previews.length > 0 && (
                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    {previews.map((url, i) => (
                                        <div key={i} className="relative">
                                            <img src={url} alt={`Preview ${i + 1}`}
                                                className="w-full h-24 object-cover rounded-lg border border-gray-200" />
                                            {i === 0 && (
                                                <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                                                    Principal
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {progress && (
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all"
                                        style={{ width: `${progress.percentage}%` }} />
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2 flex gap-4">
                            <button type="submit" disabled={processing}
                                className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                {processing ? 'A guardar...' : 'Guardar Alterações'}
                            </button>
                            <Link href="/cars" className="py-2 px-6 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                                Voltar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
