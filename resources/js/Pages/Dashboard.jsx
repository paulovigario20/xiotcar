import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ carsCount = 0, brandsCount = 0, usersCount = 0, retomas = [] }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800">
                    Painel de Administração - Xiotecar
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Ligações para o site público */}
<div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Páginas do Site</h3>
    <div className="flex flex-wrap gap-4">
        <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Ver Página Inicial
        </Link>
        <Link href="/carros" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Ver Carros à Venda
        </Link>
        <Link href="/sobre" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
            Ver Sobre Nós
        </Link>
    </div>
</div>
                    {/* Cards de Estatísticas com Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Link href="/cars" className="bg-white p-6 rounded-lg shadow text-center hover:bg-blue-50 transition">
                            <h3 className="text-2xl font-bold text-blue-600">{carsCount}</h3>
                            <p className="text-gray-600 mt-2">Carros Disponíveis</p>
                            <span className="text-sm text-blue-500">Ver Carros &rarr;</span>
                        </Link>

                        <Link href="/brands" className="bg-white p-6 rounded-lg shadow text-center hover:bg-green-50 transition">
                            <h3 className="text-2xl font-bold text-green-600">{brandsCount}</h3>
                            <p className="text-gray-600 mt-2">Marcas Registadas</p>
                            <span className="text-sm text-green-500">Ver Marcas &rarr;</span>
                        </Link>

                        <Link href="/users" className="bg-white p-6 rounded-lg shadow text-center hover:bg-gray-100 transition">
                            <h3 className="text-2xl font-bold text-gray-800">{usersCount}</h3>
                            <p className="text-gray-600 mt-2">Utilizadores Registados</p>
                            <span className="text-sm text-gray-500">Ver Utilizadores &rarr;</span>
                        </Link>
                    </div>

                    {/* Ações rápidas */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Ações Rápidas</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/cars/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                Adicionar Carro
                            </Link>
                            <Link href="/brands/create" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                Adicionar Marca
                            </Link>
                            <Link href="/users" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
                                Ver Utilizadores
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Retomas Recentes</h3>
    {retomas.length === 0 ? (
        <p className="text-gray-500">Nenhuma retoma recebida ainda.</p>
    ) : (
        <ul className="space-y-4">
            {retomas.map((retoma) => (
                <li key={retoma.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                    <p><strong>Nome:</strong> {retoma.nome}</p>
                    <p><strong>Email:</strong> {retoma.email}</p>
                    <p><strong>Marca:</strong> {retoma.marca}</p>
                    <p><strong>Modelo:</strong> {retoma.modelo}</p>
                    <p><strong>Mensagem:</strong> {retoma.mensagem}</p>
                    <p className="text-sm text-gray-500 mt-2">Recebido em: {new Date(retoma.created_at).toLocaleString()}</p>
                </li>
            ))}
        </ul>
    )}
</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}