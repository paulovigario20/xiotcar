import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import '@fortawesome/fontawesome-free/css/all.min.css';

SwiperCore.use([Autoplay, Pagination]);

export default function Home({ testemunhos = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        marca: '', modelo: '', ano: '', km: '',
        combustivel: '', telefone: '', fotos: null, observacoes: '',
    });

    const submitRetoma = (e) => {
        e.preventDefault();
        post('/retomas', {
            forceFormData: true,
            onSuccess: () => { reset(); alert("Pedido de retoma enviado com sucesso!"); },
            onError: () => { alert("Erro ao enviar o pedido. Verifique os campos."); },
        });
    };

    const heroImages = [
        '/imgs/wp/hero-car-1.png',
        '/imgs/wp/hero-car-2.png',
        '/imgs/wp/hero-car-3.png',
        '/imgs/wp/hero-car-4.png',
        '/imgs/wp/hero-car-5.png',
    ];

    const brands = [
        'audi','bmw','citroen','dacia','fiat','ford','honda','hyundai',
        'kia','mazda','mercedes','mitsubishi','nissan','opel','peugeot',
        'renault','seat','skoda','smart','toyota','volkswagen','volvo'
    ];

    return (
        <PublicLayout>
            <Head title="Início" />

            {/* ═══════ HERO ═══════ */}
            <section className="relative">
                <Swiper
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    className="w-full h-[500px] md:h-[600px]"
                >
                    {heroImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${img})` }}
                            >
                                <div className="w-full h-full bg-black/50 flex items-center justify-center">
                                    <div className="text-center px-6 max-w-3xl">
                                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                            Encontre o usado e semi-novo perfeito
                                        </h1>
                                        <p className="text-lg text-gray-200 mb-8">
                                            Em Azeitão, com confiança, garantia e acompanhamento profissional em todas as etapas.
                                        </p>
                                        <a href="/carros" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg transition text-lg">
                                            Ver Viaturas
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* ═══════ EXPERIÊNCIA / STATS ═══════ */}
            <section className="bg-zinc-900 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Experiência Xiotecar
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { num: '7+', label: 'Anos de experiência', icon: 'fas fa-calendar-check' },
                            { num: '500+', label: 'Viaturas vendidas', icon: 'fas fa-car' },
                            { num: '98%', label: 'Clientes satisfeitos', icon: 'fas fa-smile' },
                            { num: '50+', label: 'Marcas disponíveis', icon: 'fas fa-tags' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6">
                                <i className={`${stat.icon} text-yellow-400 text-3xl mb-4`}></i>
                                <div className="text-4xl font-bold text-white mb-2">{stat.num}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SERVIÇOS ═══════ */}
            <section className="bg-black py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-14">Serviços</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: 'fas fa-handshake',
                                title: 'Compra e Venda',
                                desc: 'Compra e venda de automóveis usados multimarcas, rigorosamente selecionados, com garantia e transparência total.',
                                img: '/imgs/wp/service-vendas.png',
                            },
                            {
                                icon: 'fas fa-file-invoice-dollar',
                                title: 'Financiamento',
                                desc: 'Financiamento automóvel personalizado, aceitação de retomas e apoio em toda a burocracia associada à compra.',
                                img: '/imgs/wp/service-financiamento.png',
                            },
                            {
                                icon: 'fas fa-exchange-alt',
                                title: 'Retomas',
                                desc: 'Avaliação justa e imediata da sua viatura atual. Simplificamos a troca para que conduza o carro que sempre quis.',
                                img: null,
                            },
                        ].map((svc, i) => (
                            <div key={i} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-yellow-500/30 transition group">
                                {svc.img && (
                                    <div className="h-48 overflow-hidden">
                                        <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <i className={`${svc.icon} text-yellow-400 text-2xl mb-3`}></i>
                                    <h3 className="text-xl font-semibold text-white mb-3">{svc.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ MARCAS ═══════ */}
            <section className="bg-zinc-900 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-10">Marcas</h2>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-4">
                        {brands.map((brand) => (
                            <div key={brand} className="bg-zinc-800 rounded-lg p-3 flex items-center justify-center hover:bg-zinc-700 transition">
                                <img
                                    src={`/imgs/marcas/${brand}.png`}
                                    alt={brand}
                                    className="h-10 w-10 object-contain"
                                    title={brand.charAt(0).toUpperCase() + brand.slice(1)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ TESTEMUNHO ═══════ */}
            <section className="bg-black py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10">
                        <i className="fas fa-quote-left text-yellow-400 text-3xl mb-6"></i>
                        <blockquote className="text-xl text-gray-200 italic leading-relaxed mb-6">
                            "Viaturas a excelentes preços comparado com outros stands e inclusive comparei com os mais baratos das páginas na internet! Já comprei e encaminhei para mais do que um amigo que ficaram igualmente satisfeitos!"
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <img src="/imgs/wp/testimonial-bruno.jpg" alt="Bruno Dias" className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400" />
                            <div className="text-left">
                                <div className="text-white font-semibold">Bruno Dias</div>
                                <div className="text-yellow-400 text-sm">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SIMULADOR DE CRÉDITO ═══════ */}
            <section className="bg-zinc-900 py-16" id="simulador">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        <i className="fas fa-calculator text-yellow-400 mr-2"></i>
                        Simulador de Crédito
                    </h2>
                    <p className="text-gray-400 mb-10">Descubra a sua mensalidade em segundos</p>

                    <form onSubmit={handleSimuladorSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="number" id="valor" placeholder="Valor do veículo (€)"
                            className="p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none" />
                        <input type="number" id="entrada" placeholder="Entrada (€)"
                            className="p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none" />
                        <input type="number" id="parcelas" placeholder="Nº parcelas"
                            className="p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none" />
                        <button className="bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
                            Calcular
                        </button>
                    </form>
                    <p id="result" className="mt-6 text-xl font-bold text-yellow-400"></p>
                </div>
            </section>

            {/* ═══════ FORMULÁRIO DE RETOMA ═══════ */}
            <section className="bg-black py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-3">
                        <i className="fas fa-exchange-alt text-yellow-400 mr-2"></i>
                        Pretende fazer uma retoma?
                    </h2>
                    <p className="text-gray-400 mb-10 text-center">
                        Preencha os dados da sua viatura e entraremos em contacto com uma proposta.
                    </p>

                    <form onSubmit={submitRetoma}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-zinc-900 border border-zinc-800 p-8 rounded-xl"
                        encType="multipart/form-data">
                        {[
                            { name: 'marca', placeholder: 'Marca', type: 'text' },
                            { name: 'modelo', placeholder: 'Modelo', type: 'text' },
                            { name: 'ano', placeholder: 'Ano', type: 'number' },
                            { name: 'km', placeholder: 'Quilómetros', type: 'number' },
                        ].map((field) => (
                            <input key={field.name} type={field.type} placeholder={field.placeholder}
                                className="p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)} />
                        ))}

                        <select className="p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:border-yellow-500 focus:outline-none"
                            value={data.combustivel} onChange={(e) => setData('combustivel', e.target.value)}>
                            <option value="">Combustível</option>
                            <option value="Gasolina">Gasolina</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Híbrido">Híbrido</option>
                            <option value="Elétrico">Elétrico</option>
                        </select>

                        <input type="text" placeholder="Telefone"
                            className="p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                            value={data.telefone} onChange={(e) => setData('telefone', e.target.value)} />

                        <div className="md:col-span-2">
                            <label className="text-gray-400 text-sm mb-2 block">Fotos da viatura</label>
                            <input type="file" multiple
                                className="p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg w-full"
                                onChange={(e) => setData('fotos', e.target.files)} />
                        </div>

                        <textarea placeholder="Observações adicionais"
                            className="md:col-span-2 p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg h-32 placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                            value={data.observacoes} onChange={(e) => setData('observacoes', e.target.value)} />

                        <button disabled={processing}
                            className="md:col-span-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition text-lg">
                            Enviar Pedido de Retoma
                        </button>
                    </form>
                </div>
            </section>

            {/* ═══════ CONTACTO CTA ═══════ */}
            <section className="bg-zinc-900 py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Contacte-nos</h2>
                    <p className="text-gray-400 mb-8">Estamos disponíveis para esclarecer qualquer dúvida.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contacto" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg transition">
                            <i className="fas fa-envelope mr-2"></i> Enviar Mensagem
                        </a>
                        <a href="tel:+351933188588" className="inline-block border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition">
                            <i className="fas fa-phone mr-2"></i> Ligar Agora
                        </a>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}

function handleSimuladorSubmit(e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valor').value);
    const entrada = parseFloat(document.getElementById('entrada').value);
    const parcelas = parseInt(document.getElementById('parcelas').value);

    if (!isNaN(valor) && !isNaN(entrada) && !isNaN(parcelas) && parcelas > 0) {
        const saldo = valor - entrada;
        const mensalidade = saldo / parcelas;
        document.getElementById('result').textContent = `Parcelas de €${mensalidade.toFixed(2)} por mês.`;
    } else {
        document.getElementById('result').textContent = 'Preencha todos os campos corretamente.';
    }
}
