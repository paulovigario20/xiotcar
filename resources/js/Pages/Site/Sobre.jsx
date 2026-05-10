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
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 space-y-6 text-gray-300 text-lg leading-relaxed">
                        <p>
                            Fundado em <strong className="text-white">2018</strong>, em <strong className="text-white">Azeitão</strong>, o grupo <span className="text-yellow-400 font-semibold">Xiotecar e Luís Tavares Automóveis</span> é hoje uma referência no comércio de automóveis multimarcas usados e semi-novos.
                        </p>
                        <p>
                            Nasce da junção da <strong className="text-white">Luís Tavares Automóveis</strong>, com uma alta experiência no mercado automóvel desde <strong className="text-white">1995</strong>, e a recém-criada <strong className="text-white">Xiotecar</strong>. Aliando o saber e o querer.
                        </p>
                        <p>
                            Temos ao dispor dos nossos clientes <strong className="text-white">dois pontos de venda</strong>, nomeadamente, em <strong className="text-white">Azeitão</strong> e <strong className="text-white">Covilhã</strong>.
                        </p>
                        <p>
                            O nosso grupo é composto pelos seus altos padrões de ética de negócio, bem-estar e segurança dos colaboradores, clientes e fornecedores.
                        </p>
                        <p>
                            Todos os dias os nossos colaboradores dão o seu melhor contributo para juntos alcançarem o grande objetivo desta empresa: <strong className="text-yellow-400">oferecer o melhor aos seus clientes</strong>.
                        </p>
                        <p>
                            O cliente tem à sua disposição viaturas dos mais variados segmentos e um <strong className="text-white">serviço pós-venda de excelência</strong>. Na hora de comprar o seu novo automóvel, a Xiotecar e Luís Tavares Automóveis é o local a visitar.
                        </p>
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
