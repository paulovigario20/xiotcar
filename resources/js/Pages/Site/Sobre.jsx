import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Sobre() {
    return (
        <PublicLayout>
            <Head title="Sobre Nós" />

            {/* Hero */}
            <section className="bg-zinc-900 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Sobre o Stand Xiotecar</h1>
                    <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-black py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 lg:sticky lg:top-28">
                            <span className="inline-flex items-center rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-yellow-400">
                                Desde 2018
                            </span>
                            <h2 className="mt-6 text-3xl font-bold leading-tight text-white">
                                Confiança, qualidade e proximidade no mercado automóvel.
                            </h2>
                            <p className="mt-4 text-gray-400 leading-relaxed">
                                A Xiotecar combina experiência, dedicação e inovação para oferecer um serviço completo em Azeitão.
                            </p>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 text-gray-300 text-lg leading-relaxed">
                            <div className="space-y-6">
                                <p>
                                    Fundada em <strong className="text-white">2018</strong>, em <strong className="text-white">Azeitão</strong>, a <span className="text-yellow-400 font-semibold">Xiotecar</span> é hoje uma referência no comércio de automóveis multimarcas usados e seminovos.
                                </p>
                                <p>
                                    Com uma forte presença no mercado automóvel, a Xiotecar destaca-se pela <strong className="text-white">confiança</strong>, <strong className="text-white">qualidade</strong> e <strong className="text-white">profissionalismo</strong> no atendimento aos seus clientes, aliando experiência, dedicação e inovação em cada negócio.
                                </p>
                                <p>
                                    Atualmente, o grupo é constituído pelas empresas <strong className="text-white">Xiotecar Unipessoal Lda</strong>, <strong className="text-white">JBBC Unipessoal Lda</strong> e <strong className="text-white">XD Unipessoal Lda</strong>, reforçando diariamente a sua posição no setor automóvel através de um serviço de excelência e de uma relação de proximidade com os seus clientes.
                                </p>
                                <p>
                                    Recentemente, o grupo juntou também a <strong className="text-yellow-400">Garage-Wash</strong>, ampliando assim a sua oferta de serviços e proporcionando uma experiência ainda mais completa aos seus clientes.
                                </p>
                                <p>
                                    A nossa empresa rege-se por elevados padrões de <strong className="text-white">ética</strong>, <strong className="text-white">transparência</strong> e <strong className="text-white">compromisso</strong>, promovendo o bem-estar e a segurança de colaboradores, clientes e parceiros.
                                </p>
                                <p>
                                    Todos os dias, a nossa equipa dá o seu melhor contributo para alcançar o principal objetivo da Xiotecar: <strong className="text-yellow-400">oferecer um serviço de excelência e garantir a máxima satisfação dos seus clientes</strong>.
                                </p>
                                <p>
                                    O cliente tem à sua disposição viaturas dos mais variados segmentos, bem como um <strong className="text-white">serviço pós-venda de excelência</strong>. Na hora de comprar o seu novo automóvel, a Xiotecar, em Azeitão, é o local certo para visitar.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <Link href="/carros" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg text-center transition">
                            <i className="fas fa-car mr-2"></i> Ver Viaturas
                        </Link>
                        <a href="https://wa.me/935920018" target="_blank" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg text-center transition">
                            <i className="fab fa-whatsapp mr-2"></i> Falar no WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
