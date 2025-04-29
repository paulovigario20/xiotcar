import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Sobre() {
    return (
        <PublicLayout>
            <Head title="Sobre Nós" />

            <section className="bg-gray-100 py-16 px-4">
                <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md">
                    <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Sobre o Stand Xiotecar</h1>

                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Fundado em <strong>2018</strong>, em <strong>Azeitão</strong>, o grupo <span className="font-semibold">Xiotecar e Luís Tavares Automóveis</span> é hoje uma referência no comércio de automóveis multimarcas usados e semi-novos.
                    </p>

                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Nasce da junção da <strong>Luís Tavares Automóveis</strong>, com uma alta experiência no mercado automóvel desde <strong>1995</strong>, e a recém-criada <strong>Xiotecar</strong>. Aliando o saber e o querer.
                    </p>

                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Temos ao dispor dos nossos clientes <strong>dois pontos de venda</strong>, nomeadamente, em <strong>Azeitão</strong> e <strong>Covilhã</strong>.
                    </p>

                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        O nosso grupo é composto pelos seus altos padrões de ética de negócio, bem-estar e segurança dos colaboradores, clientes e fornecedores.
                    </p>

                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Todos os dias os nossos colaboradores dão o seu melhor contributo para juntos alcançarem o grande objetivo desta empresa: <strong>oferecer o melhor aos seus clientes</strong>.
                    </p>

                    <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                        O cliente tem à sua disposição viaturas dos mais variados segmentos e um <strong>serviço pós-venda de excelência</strong>. Na hora de comprar o seu novo automóvel, a Xiotecar e Luís Tavares Automóveis é o local a visitar.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/carros" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-center transition-all">
                            Ver Veículos
                        </Link>
                        <a href="https://wa.me/935920018" target="_blank" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-center transition-all">
                            Falar no WhatsApp
                        </a>
                        <Link href="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-full text-center transition-all">
                            Voltar à Home
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}