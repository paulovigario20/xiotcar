import { Link } from '@inertiajs/react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const socialLinks = {
    facebook: 'https://www.facebook.com/xiotecar?locale=pt_PT',
    instagram: 'https://www.instagram.com/xiotecar_stand_auto_azeitao/',
    whatsapp: 'https://wa.me/351933188588',
};

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-black font-sans text-white">
            {/* TOP BAR */}
            <div className="bg-zinc-900 border-b border-zinc-800 text-sm text-gray-400 py-2 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-4">
                        <span><i className="fas fa-phone mr-1"></i> +351 933 188 588</span>
                        <span><i className="fas fa-envelope mr-1"></i> xiotecar@gmail.com</span>
                    </div>
                    <div className="flex gap-3">
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white"><i className="fab fa-instagram"></i></a>
                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-white"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            {/* HEADER / NAV */}
            <header className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                    <Link href="/">
                        <img src="/imgs/wp/logo-header.png" alt="Xiotecar" className="h-12 object-contain" />
                    </Link>
                    <nav>
                        <ul className="flex gap-8 text-sm font-medium tracking-wide uppercase">
                            <li><Link href="/" className="text-white hover:text-yellow-400 transition">Início</Link></li>
                            <li><Link href="/carros" className="text-gray-300 hover:text-yellow-400 transition">Viaturas</Link></li>
                            <li><Link href="/sobre" className="text-gray-300 hover:text-yellow-400 transition">Sobre Nós</Link></li>
                            <li><Link href="/contacto" className="text-gray-300 hover:text-yellow-400 transition">Contacto</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>{children}</main>

            {/* FOOTER */}
            <footer className="bg-zinc-900 border-t border-zinc-800">
                <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* About */}
                    <div>
                        <img src="/imgs/wp/logo-header.png" alt="Xiotecar" className="h-10 mb-4 object-contain" />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Fundada em 2018 em Azeitão, a Xiotecar é referência no comércio de automóveis multimarcas usados e seminovos, com foco na confiança, qualidade e proximidade.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li><i className="fas fa-map-marker-alt mr-2 text-yellow-400"></i>Azeitão, Setúbal</li>
                            <li><i className="fas fa-phone mr-2 text-yellow-400"></i>+351 933 188 588</li>
                            <li><i className="fas fa-envelope mr-2 text-yellow-400"></i>xiotecar@gmail.com</li>
                        </ul>
                        <div className="mt-6">
                            <h5 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-3">Siga-nos</h5>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-yellow-500 hover:text-black"
                                >
                                    <i className="fab fa-facebook-f text-lg"></i>
                                    <span>Facebook</span>
                                </a>
                                <a
                                    href={socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-yellow-500 hover:text-black"
                                >
                                    <i className="fab fa-instagram text-lg"></i>
                                    <span>Instagram</span>
                                </a>
                                <a
                                    href={socialLinks.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-yellow-500 hover:text-black"
                                >
                                    <i className="fab fa-whatsapp text-lg"></i>
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-4">Horas</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li>Segunda – Sexta: 9h – 19h</li>
                            <li>Sábado: 9h – 13h</li>
                            <li>Domingo: Encerrado</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 text-center text-gray-500 text-xs py-4">
                    © {new Date().getFullYear()} Xiotecar — Todos os direitos reservados.
                </div>
            </footer>
        </div>
    );
}
