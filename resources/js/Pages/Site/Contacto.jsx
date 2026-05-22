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
                                    <span>Azeitão, Setúbal</span>
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
                                title="mapa"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.123456789!2d-9.139337384657219!3d38.7369465795965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19331c9f9a1f3f%3A0x7bc0c4b3bd0b3b0!2sLisboa!5e0!3m2!1spt-PT!2spt!4v0000000000000"
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
