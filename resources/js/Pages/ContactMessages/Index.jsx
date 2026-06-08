import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function ContactMessagesIndex({ mensagens = [] }) {
    const handleDelete = (mensagem) => {
        if (confirm(`Eliminar mensagem de ${mensagem.nome}?`)) {
            router.delete(`/mensagens/${mensagem.id}`);
        }
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

            <div className="py-12 max-w-6xl mx-auto sm:px-6 lg:px-8">
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
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(mensagem)}
                                            className="shrink-0 px-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
                                        >
                                            Eliminar
                                        </button>
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
