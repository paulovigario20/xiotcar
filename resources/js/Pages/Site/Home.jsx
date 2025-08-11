// resources/js/Pages/Site/Home.jsx
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import CarImageCarousel from '@/Components/CarImageCarousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import '@fortawesome/fontawesome-free/css/all.min.css';

SwiperCore.use([Autoplay]);

export default function Home({ testemunhos = [] }) {
    return (
        <PublicLayout>
            <Head title="Início" />

            {/* Hero */}
            <section className="bg-cover bg-center text-white py-20 px-6" style={{ backgroundImage: "url('/logos/logo.jpeg')" }}>
    <div className="max-w-3xl mx-auto text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Encontre o Veículo dos seus Sonhos</h1>
        
    </div>
</section>

            {/* Formulário de busca */}
            <section className="py-12 bg-white-600 text-center">
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
            <section className="py-12 bg-white-600 text-center">
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
            <section className="py-12 bg-white-600 text-center">
    <h2 className="text-2xl font-semibold mb-8">🔥 Modelos em Destaque</h2>
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* BMW X5 */}
        <div className="bg-gray-100 rounded p-4 shadow">
  <CarImageCarousel images={['/a4.jpeg', '/a4-2.jpeg', '/a4-3.jpeg']} />

  <h3 className="text-xl font-bold mt-2">Audi A4</h3>
  <p className="text-gray-700 text-lg font-semibold">30.000€</p>

  <div className="mt-2 text-sm text-gray-600">
    <p><strong>Ano:</strong> 2021</p>
    <p><strong>Quilómetros:</strong> 45.000 km</p>
    <p><strong>Combustível:</strong> Gasóleo</p>
    <p><strong>Transmissão:</strong> Automática</p>
    <p><strong>Potência:</strong> 150 cv</p>
  </div>

  <div className="mt-2 text-sm text-gray-600">
    <p><strong>Características:</strong></p>
    <ul className="list-disc list-inside">
      <li>Ar Condicionado Automático</li>
      <li>Estofos em pele</li>
      <li>Sensores de Estacionamento</li>
      <li>Jantes de Liga Leve</li>
      <li>GPS</li>
      <li>Câmara de Marcha Atrás</li>
    </ul>
  </div>

  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    Ver Detalhes
  </button>
</div>
        

        {/* Audi A4 */}
        <div className="bg-gray-100 rounded p-4 shadow">
  <CarImageCarousel images={['/a4.jpeg', '/a4-2.jpeg', '/a4-3.jpeg']} />

  <h3 className="text-xl font-bold mt-2">Audi A4</h3>
  <p className="text-gray-700 text-lg font-semibold">30.000€</p>

  <div className="mt-2 text-sm text-gray-600">
    <p><strong>Ano:</strong> 2021</p>
    <p><strong>Quilómetros:</strong> 45.000 km</p>
    <p><strong>Combustível:</strong> Gasóleo</p>
    <p><strong>Transmissão:</strong> Automática</p>
    <p><strong>Potência:</strong> 150 cv</p>
  </div>

  <div className="mt-2 text-sm text-gray-600">
    <p><strong>Características:</strong></p>
    <ul className="list-disc list-inside">
      <li>Ar Condicionado Automático</li>
      <li>Estofos em pele</li>
      <li>Sensores de Estacionamento</li>
      <li>Jantes de Liga Leve</li>
      <li>GPS</li>
      <li>Câmara de Marcha Atrás</li>
    </ul>
  </div>

  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    Ver Detalhes
  </button>
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

        {/* Marcas comercializadas */}
<section className="py-12 bg-white text-center">
    <h2 className="text-2xl font-bold mb-2">Marcas</h2>
    <p className="text-red-600 font-semibold mb-6">MARCAS QUE COMERCIALIZAMOS</p>

    <div className="px-4">
        <Swiper
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
            }}
        >
            {[
                'audi', 'bmw', 'byd', 'citroen', 'dacia',
                'fiat', 'ford', 'honda', 'hyundai', 'jeep',
                'kia', 'mazda', 'mercedes', 'nissan', 'peugeot',
                'renault', 'seat', 'skoda', 'toyota', 'volkswagen', 'volvo'
            ].map((marca, idx) => (
                <SwiperSlide key={idx} className="flex justify-center">
                    <div className="bg-white rounded-3xl shadow-md p-4 w-32 h-28 flex flex-col justify-center items-center">
                        <img
                            src={`/imgs/marcas/${marca}.png`}
                            alt={marca}
                            className="h-10 object-contain mb-1"
                        />
                        <span className="text-sm font-medium capitalize">{marca}</span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
</section>


<section className="py-16 bg-white text-center">
  <div className="max-w-2xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-2 text-gray-800">🚙 Entregue o seu carro usado</h2>
    <p className="text-gray-600 mb-8">Aceitamos retomas! Preencha os dados e entraremos em contacto rapidamente.</p>

    <form
      method="POST"
      action="/retomas"
      encType="multipart/form-data"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
    >
      <div className="flex flex-col">
        <label htmlFor="marca" className="text-sm font-medium text-gray-700 mb-1">Marca</label>
        <input
          name="marca"
          id="marca"
          type="text"
          placeholder="Ex: BMW"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="modelo" className="text-sm font-medium text-gray-700 mb-1">Modelo</label>
        <input
          name="modelo"
          id="modelo"
          type="text"
          placeholder="Ex: Série 3"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="ano" className="text-sm font-medium text-gray-700 mb-1">Ano</label>
        <input
          name="ano"
          id="ano"
          type="number"
          placeholder="Ex: 2020"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quilometragem" className="text-sm font-medium text-gray-700 mb-1">Quilometragem</label>
        <input
          name="quilometragem"
          id="quilometragem"
          type="number"
          placeholder="Ex: 50000"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label htmlFor="contacto" className="text-sm font-medium text-gray-700 mb-1">Contacto</label>
        <input
          name="contacto"
          id="contacto"
          type="text"
          placeholder="Email ou telefone"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label htmlFor="observacoes" className="text-sm font-medium text-gray-700 mb-1">Observações</label>
        <textarea
          name="observacoes"
          id="observacoes"
          placeholder="Alguma informação adicional?"
          rows={4}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label htmlFor="imagens" className="text-sm font-medium text-gray-700 mb-1">Imagens do veículo</label>
        <input
          type="file"
          name="imagens[]"
          id="imagens"
          accept="image/*"
          multiple
          className="p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </div>

      <div className="md:col-span-2 text-center">
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Enviar Proposta
        </button>
      </div>
    </form>
  </div>
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
<section className="py-12 bg-gray-400 text-center text-white">
    <h2 className="text-2xl font-semibold mb-6">🚗 Qual a opinião dos nossos clientes?</h2>

    {/* Formulário */}
    <form method="POST" action="/testemunhos" className="max-w-xl mx-auto space-y-4 mb-8 bg-white p-4 rounded shadow text-black">
    
    <input type="text" name="nome" placeholder="O seu nome" required className="w-full p-2 border rounded" />
    <textarea name="mensagem" placeholder="A sua opinião" required className="w-full p-2 border rounded" rows="3" />
    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar Testemunho</button>
</form>

    {/* Lista de testemunhos */}
    <div className="max-w-2xl mx-auto space-y-6">
        {testemunhos.map((t, idx) => (
            <blockquote key={idx} className="bg-white p-4 rounded shadow text-black">
                <p>"{t.mensagem}"</p>
                <h4 className="mt-2 font-bold">- {t.nome}</h4>
            </blockquote>
        ))}
    </div>
    <footer className="bg-gray-900 text-white py-10 mt-12">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Logo e descrição */}
    <div>
      <h3 className="text-xl font-bold mb-2">XioteCar</h3>
      <p className="text-gray-400">A sua escolha de confiança para veículos novos e usados com garantia, qualidade e segurança.</p>
    </div>

    {/* Links úteis */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Links Rápidos</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="/" className="hover:text-white">Início</a></li>
        <li><a href="#simulador" className="hover:text-white">Simulador de Crédito</a></li>
        <li><a href="#retoma" className="hover:text-white">Entregar Veículo</a></li>
        <li><a href="#servicos" className="hover:text-white">Serviços</a></li>
      </ul>
    </div>

    {/* Contactos */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Contacto</h4>
      <ul className="text-gray-300 space-y-2">
        <li>📍 Rua do Exemplo, Lisboa</li>
        <li>📞 935 920 018</li>
        <li>✉️ xiotecar@gmail.com</li>
      </ul>
    </div>

    {/* Redes sociais */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Siga-nos</h4>
      <div className="flex space-x-4 mt-2">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <i className="fab fa-facebook fa-lg"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <i className="fab fa-instagram fa-lg"></i>
        </a>
        <a href="https://wa.me/935920018" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
          <i className="fab fa-whatsapp fa-lg"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Direitos Autorais */}
  <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} XioteCar. Todos os direitos reservados.
  </div>
</footer>
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
