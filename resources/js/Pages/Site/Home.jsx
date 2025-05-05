// resources/js/Pages/Site/Home.jsx
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import CarImageCarousel from '@/Components/CarImageCarousel';

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
        {/* BMW X5 */}
        <div className="bg-gray-100 rounded p-4 shadow">
            <CarImageCarousel images={['/imgs/Tesla/tesla1.jpeg', '/imgs/Tesla/tesla3.jpeg', '/imgs/Tesla/tesla2.jpeg']} />
            <h3 className="text-xl font-bold mt-2">Tesla</h3>
            <p className="text-gray-700">22.900€</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Ver Detalhes</button>
        </div>

        {/* Audi A4 */}
        <div className="bg-gray-100 rounded p-4 shadow">
            <CarImageCarousel images={['/a4.jpeg', '/a4-2.jpeg', '/a4-3.jpeg']} />
            <h3 className="text-xl font-bold mt-2">Audi A4</h3>
            <p className="text-gray-700">30.000€</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Ver Detalhes</button>
        </div>

        {/* Seat Cupra */}
        <div className="bg-gray-100 rounded p-4 shadow">
            <CarImageCarousel images={['/imgs/Cupra/cupra1.jpeg', '/imgs/Cupra/cupra2.jpeg', '/imgs/Cupra/cupra3.jpeg', '/imgs/Cupra/cupra4.jpeg', '/imgs/Cupra/cupra5.jpeg', '/imgs/Cupra/cupra6.jpeg']} />
            <h3 className="text-xl font-bold mt-2">Seat Cupra</h3>
            <p className="text-gray-700">31.500€</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Ver Detalhes</button>
        </div>
    </div>
</section>
<section className="py-12 bg-white text-center">
    <h2 className="text-2xl font-semibold mb-6">🚙 Quer entregar o seu carro usado?</h2>
    <p className="mb-6 text-gray-700">Aceitamos retomas! Preencha os dados do seu veículo e entraremos em contacto.</p>
    <form
    method="POST"
    action="/retomas"
    encType="multipart/form-data"
    className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
>
    <input name="marca" type="text" placeholder="Marca" className="p-2 border rounded" required />
    <input name="modelo" type="text" placeholder="Modelo" className="p-2 border rounded" required />
    <input name="ano" type="number" placeholder="Ano" className="p-2 border rounded" required />
    <input name="quilometragem" type="number" placeholder="Quilometragem" className="p-2 border rounded" required />
    <input name="contacto" type="text" placeholder="Contacto (email ou telefone)" className="p-2 border rounded md:col-span-2" required />
    <textarea name="observacoes" placeholder="Observações" className="p-2 border rounded md:col-span-2" rows="3" />
    <input type="file" name="imagens[]" accept="image/*" multiple className="md:col-span-2" />
    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2">Enviar Pedido</button>
</form>

</section>

<section className="py-12 bg-white text-center">
    <h2 className="text-2xl font-semibold mb-6">🛠️ Serviços Incluídos</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
        <div className="flex items-start gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <div>
                <h3 className="font-bold">Garantia incluída</h3>
                <p className="text-gray-700">Todos os veículos são vendidos com garantia de conformidade legal.</p>
            </div>
        </div>
        <div className="flex items-start gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <div>
                <h3 className="font-bold">Inspecção e revisão</h3>
                <p className="text-gray-700">Cada carro passa por uma revisão completa antes da entrega.</p>
            </div>
        </div>
        <div className="flex items-start gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <div>
                <h3 className="font-bold">Apoio ao financiamento</h3>
                <p className="text-gray-700">Ajudamos a encontrar as melhores condições de crédito para si.</p>
            </div>
        </div>
        <div className="flex items-start gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <div>
                <h3 className="font-bold">Aceitamos retoma</h3>
                <p className="text-gray-700">Pode entregar o seu carro atual como parte do pagamento.</p>
            </div>
        </div>
    </div>
</section>


        {/* Estatisticas */}
<section className="py-12 bg-gray-100 text-center">
    <h2 className="text-2xl font-semibold mb-8">📈 Resultados que inspiram confiança</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-3xl font-bold text-blue-600">+200</h3>
            <p className="mt-2 text-gray-700">Carros vendidos</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-3xl font-bold text-blue-600">10</h3>
            <p className="mt-2 text-gray-700">Anos de experiência</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-3xl font-bold text-blue-600">98%</h3>
            <p className="mt-2 text-gray-700">Clientes satisfeitos</p>
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