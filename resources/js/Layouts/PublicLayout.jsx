import { Link } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
            <header className="bg-white shadow py-4 px-8 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-700">XioteCar</div>
                <nav>
                    <ul className="flex gap-6">
                        <li><Link href="/" className="hover:text-blue-600">Início</Link></li>
                        <li><Link href="/carros" className="hover:text-blue-600">Modelos</Link></li>
                        <li><Link href="/sobre" className="hover:text-blue-600">Sobre Nós</Link></li>
                        <li><Link href="#contacto" className="hover:text-blue-600">Contacto</Link></li>
                    </ul>
                </nav>
                <a href="https://wa.me/935920018" target="_blank" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Entrar em Contacto
                </a>
            </header>

            <main>{children}</main>
        </div>
    );
}