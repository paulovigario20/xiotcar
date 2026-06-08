import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function ContactMessagesIndex({
    mensagens = [],
    whatsappConfigured = false,
    whatsappKeyHint = null,
    whatsappPhone = '351933188588',
}) {
    const { flash } = usePage().props;

    const handleDelete = (mensagem) => {
        if (confirm(`Eliminar mensagem de ${mensagem.nome}?`)) {
            router.delete(`/mensagens/${mensagem.id}`);
        }
    };

    const handleResend = (mensagem) => {
        router.post(`/mensagens/${mensagem.id}/resend`);
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
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-4 rounded-lg text-sm leading-relaxed">
                        <p className="font-semibold mb-2">WhatsApp não configurado</p>
                        <p>As mensagens estão a ser guardadas no site, mas não chegam ao WhatsApp porque o servidor não está a ler a variável <code className="bg-amber-100 px-1 rounded">CALLMEBOT_API_KEY</code>.</p>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                            <li>Confirma <code className="bg-amber-100 px-1 rounded">CALLMEBOT_API_KEY</code> no Railway (serviço web)</li>
                            <li>Faz <strong>Redeploy</strong> após guardar as variáveis</li>
                            <li>A API key deve ser ativada no telemóvel <strong>+351 933 188 588</strong> via CallMeBot (+34 644 10 28 72)</li>
                        </ol>
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
                                            {!mensagem.whatsapp_sent && (
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
