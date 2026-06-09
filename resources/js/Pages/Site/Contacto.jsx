import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Contacto() {
    const { data, setData, post, processing, reset } = useForm({
        nome: '', email: '', mensagem: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contacto', {
            onSuccess: () => { reset(); alert('Mensagem enviada com sucesso!'); },
        });
    };

    return (
        <PublicLayout>
            <Head title="Contacto" />

            {/* Hero */}
            <section className="bg-zinc-900 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Contacte-nos</h1>
                    <p className="text-gray-400 text-lg">Tem dúvidas? Precisa de ajuda? Estamos aqui para si.</p>
                    <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-black py-16">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Form */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">
                            <i className="fas fa-envelope text-yellow-400 mr-2"></i> Enviar Mensagem
                        </h2>
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Nome</label>
                                <input type="text" required placeholder="O seu nome"
                                    className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                                    value={data.nome} onChange={(e) => setData('nome', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Email</label>
                                <input type="email" required placeholder="seu@email.com"
                                    className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                                    value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Mensagem</label>
                                <textarea rows={5} required placeholder="Como podemos ajudar?"
                                    className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                                    value={data.mensagem} onChange={(e) => setData('mensagem', e.target.value)} />
                            </div>
                            <button disabled={processing}
                                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition text-lg">
                                Enviar
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="space-y-8">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                <i className="fas fa-map-marker-alt text-yellow-400 mr-2"></i> Informações
                            </h2>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-map-marker-alt text-yellow-400 mt-1"></i>
                                    <a
                                        href="https://maps.app.goo.gl/Lju9FFuhYrEgGgpD7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-yellow-400 transition"
                                    >
                                        Quinta do Conde, Setúbal
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-envelope text-yellow-400 mt-1"></i>
                                    <span>xiotecar@gmail.com</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-phone text-yellow-400 mt-1"></i>
                                    <span>+351 933 188 588</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="fas fa-clock text-yellow-400 mt-1"></i>
                                    <div>
                                        <div>Segunda – Sexta: 9h – 19h</div>
                                        <div>Sábado: 9h – 13h</div>
                                        <div>Domingo: Encerrado</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-hidden">
                            <iframe
                                title="Localização Xiotecar — Quinta do Conde"
                                src="https://maps.google.com/maps?q=38.569854,-9.037163&z=17&hl=pt&output=embed"
                                width="100%" height="250"
                                style={{ border: 0, borderRadius: '0.5rem' }}
                                allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
