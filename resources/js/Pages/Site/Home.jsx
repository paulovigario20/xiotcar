// resources/js/Pages/Site/Home.jsx
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Início" />

            {/* Hero */}
            <section className="bg-cover bg-center text-white py-20 px-6" style={{ backgroundImage: "url('/logos/logo.jpeg')" }}>
    <div className="max-w-3xl mx-auto text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Encontre o Veículo dos Seus Sonhos</h1>
        <p className="mb-6">Escolha entre uma seleção variada de veículos.</p>
        <div className="flex justify-center gap-4">
            <a href="/carros" className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700">Pesquisar Veículos</a>
            <a href="https://wa.me/935920018" className="bg-green-600 px-6 py-2 rounded hover:bg-green-700">Comprar Agora</a>
        </div>
    </div>
</section>

            {/* Formulário de busca */}
            <section className="py-12 bg-white text-center">
                <h2 className="text-2xl font-semibold mb-6">Encontre o seu veículo</h2>
                <form className="flex flex-col md:flex-row gap-4 justify-center">
                    <input type="text" placeholder="Modelo ou Marca" className="p-2 border rounded w-full md:w-60" />
                    <input type="number" placeholder="Preço Máximo" className="p-2 border rounded w-full md:w-48" />
                    <select className="p-2 border rounded w-full md:w-48">
                        <option value="">Tipo de Veículo</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="esportivo">Desportivo</option>
                    </select>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Procurar</button>
                </form>
            </section>

            {/* Simulador de Crédito */}
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-2xl font-semibold mb-6">💰 Simule o seu Crédito</h2>
                <form onSubmit={handleSimuladorSubmit} className="flex flex-col md:flex-row gap-4 justify-center mb-4">
                    <input type="number" id="valor" placeholder="Valor do veiculo" className="p-2 border rounded" />
                    <input type="number" id="entrada" placeholder="Entrada" className="p-2 border rounded" />
                    <input type="number" id="parcelas" placeholder="Nº Parcelas" className="p-2 border rounded" />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Calcular</button>
                </form>
                <p id="result" className="text-lg font-bold"></p>
            </section>

            {/* Modelos em Destaque */}
            <section className="py-12 bg-white text-center">
                <h2 className="text-2xl font-semibold mb-8">🔥 Modelos em Destaque</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-gray-100 rounded p-4 shadow">
                        <img src="/bmwx5.jpg" alt="BMW X5" className="w-full h-60 object-cover rounded" />
                        <h3 className="text-xl font-bold mt-2">BMW X5</h3>
                        <p className="text-gray-700">52.900€</p>
                        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Ver Detalhes</button>
                    </div>
                    <div className="bg-gray-100 rounded p-4 shadow">
                        <img src="/a4.jpeg" alt="Audi A4" className="w-full h-60 object-cover rounded" />
                        <h3 className="text-xl font-bold mt-2">Audi A4</h3>
                        <p className="text-gray-700">30.000€</p>
                        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Ver Detalhes</button>
                    </div>
                </div>
            </section>

            {/* Testemunhos */}
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-2xl font-semibold mb-6">🚗 O que nossos clientes dizem?</h2>
                <div className="max-w-2xl mx-auto space-y-6">
                    <blockquote className="bg-white p-4 rounded shadow">
                        <p>"Comprei o meu carro aqui e adorei o atendimento! Recomendo muito!"</p>
                        <h4 className="mt-2 font-bold">- João Silva</h4>
                    </blockquote>
                    <blockquote className="bg-white p-4 rounded shadow">
                        <p>"Melhor experiência na compra de um veículo. Equipa muito atenciosa!"</p>
                        <h4 className="mt-2 font-bold">- Maria Oliveira</h4>
                    </blockquote>
                </div>
            </section>

            {/* Botão Flutuante WhatsApp */}
            <a href="https://wa.me/935920018" target="_blank" className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700">
                📞 WhatsApp
            </a>
        </PublicLayout>
    );
}

// Função JS para calcular o crédito
function handleSimuladorSubmit(e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById("valor").value);
    const entrada = parseFloat(document.getElementById("entrada").value);
    const parcelas = parseInt(document.getElementById("parcelas").value);

    if (!isNaN(valor) && !isNaN(entrada) && !isNaN(parcelas)) {
        const saldo = valor - entrada;
        const mensalidade = saldo / parcelas;
        document.getElementById("result").textContent = `Parcelas de €${mensalidade.toFixed(2)} por mês.`;
    } else {
        document.getElementById("result").textContent = "Preencha todos os campos corretamente.";
    }
}