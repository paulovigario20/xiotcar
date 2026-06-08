import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';

export default function ContactMessagesIndex({
    mensagens = [],
    whatsappConfigured = false,
    whatsappKeyHint = null,
    whatsappPhone = '351933188588',
}) {
    const { flash } = usePage().props;
    const { data, setData, post, processing } = useForm({
        callmebot_api_key: '',
        whatsapp_phone: whatsappPhone.replace(/\D/g, '') || '351933188588',
    });

    const handleDelete = (mensagem) => {
        if (confirm(`Eliminar mensagem de ${mensagem.nome}?`)) {
            router.delete(`/mensagens/${mensagem.id}`);
        }
    };

    const handleResend = (mensagem) => {
        router.post(`/mensagens/${mensagem.id}/resend`);
    };

    const saveWhatsApp = (e) => {
        e.preventDefault();
        post('/mensagens/whatsapp');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800">
                    Mensagens de Contacto
                </h2>
            }
        >
            <Head title="Mensagens" />

            <div className="py-12 max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-4">
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        {flash.error}
                    </div>
                )}

                {whatsappConfigured ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                        <p className="font-semibold">WhatsApp configurado</p>
                        <p>Chave API: {whatsappKeyHint} · Telefone: +{whatsappPhone.replace(/\D/g, '')}</p>
                    </div>
                ) : (
                    <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">Configurar WhatsApp (CallMeBot)</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Cole aqui a API key que recebeu do CallMeBot. O Railway não está a passar a variável — esta configuração fica guardada no site.
                        </p>
                        <ol className="text-sm text-gray-600 list-decimal list-inside mb-4 space-y-1">
                            <li>Adiciona <strong>+34 644 10 28 72</strong> como contacto &quot;CallMeBot&quot;</li>
                            <li>No telemóvel <strong>933 188 588</strong>, envia: <em>I allow callmebot to send me messages</em></li>
                            <li>Copia a API key recebida e cola abaixo</li>
                        </ol>
                        <form onSubmit={saveWhatsApp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-sm text-gray-600 mb-1">API Key CallMeBot</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: 1234567"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
                                    value={data.callmebot_api_key}
                                    onChange={(e) => setData('callmebot_api_key', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Telefone (sem +)</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
                                    value={data.whatsapp_phone}
                                    onChange={(e) => setData('whatsapp_phone', e.target.value)}
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                                >
                                    Guardar e testar WhatsApp
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    {mensagens.length === 0 ? (
                        <p className="p-8 text-gray-500 text-center">Nenhuma mensagem recebida ainda.</p>
                    ) : (
                        <div className="divide-y">
                            {mensagens.map((mensagem) => (
                                <div key={mensagem.id} className="p-6 hover:bg-gray-50">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-gray-900">{mensagem.nome}</h3>
                                                <span className="text-sm text-gray-500">{mensagem.email}</span>
                                                {mensagem.whatsapp_sent ? (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                        WhatsApp enviado
                                                    </span>
                                                ) : (
                                                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                                        Só guardada no site
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-700 whitespace-pre-wrap">{mensagem.mensagem}</p>
                                            <p className="text-xs text-gray-400 mt-3">
                                                {new Date(mensagem.created_at).toLocaleString('pt-PT')}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 gap-2">
                                            {!mensagem.whatsapp_sent && whatsappConfigured && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleResend(mensagem)}
                                                    className="px-4 py-2 text-sm text-green-700 border border-green-200 rounded hover:bg-green-50 transition"
                                                >
                                                    Enviar WhatsApp
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(mensagem)}
                                                className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
