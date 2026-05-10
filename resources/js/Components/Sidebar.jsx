import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed">
            <div className="p-4 text-lg font-bold border-b border-gray-700">
                XioTecar
            </div>
            <nav className="flex flex-col p-4 space-y-2">
                <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
                <Link href="/brands" className="hover:bg-gray-700 p-2 rounded">Marcas</Link>
                <Link href="/cars" className="hover:bg-gray-700 p-2 rounded">Carros</Link>
                {/* Adicione mais links conforme precisar */}
            </nav>
        </div>
    );
}
