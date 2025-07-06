// resources/js/Pages/CarroDetalhes.jsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function CarroDetalhes({ carro }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Head title={`${carro.brand.name} ${carro.model}`} />

      <h1 className="text-3xl font-bold mb-4">
        {carro.brand.name} {carro.model}
      </h1>

      <img
        src={`/storage/${carro.image}`}
        alt={`${carro.brand.name} ${carro.model}`}
        className="w-full max-h-[400px] object-cover mb-4 rounded-xl"
      />

      <p className="text-xl font-semibold mb-2">Preço: {carro.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</p>
      <ul className="mb-4 space-y-1">
        <li><strong>Ano:</strong> {carro.year}</li>
        <li><strong>Quilómetros:</strong> {carro.kilometers ?? '—'} km</li>
        <li><strong>Combustível:</strong> {carro.fuel ?? '—'}</li>
        <li><strong>Transmissão:</strong> {carro.transmission ?? '—'}</li>
        <li><strong>Potência:</strong> {carro.power ?? '—'} cv</li>
      </ul>

      <h2 className="text-lg font-semibold">Características:</h2>
      {carro.features?.length > 0 ? (
        <ul className="list-disc ml-6 mb-4">
          {carro.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      ) : (
        <p className="mb-4">Nenhuma característica especificada.</p>
      )}

      <p className="mb-6">{carro.description}</p>

      <Link href="/" className="text-blue-600 hover:underline">← Voltar</Link>
    </div>
  );
}