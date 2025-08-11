import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    // Usa a rota hardcoded do Laravel para o envio de reset.
    // Se tens Ziggy/route global a funcionar, podes voltar a usar: post(route('password.email'));
    post('/forgot-password');
  };

  return (
    <>
      <Head title="Recuperar Password" />

      {/* Fundo full screen */}
      <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
        {/* Card central */}
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          {/* Título */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-red-600">Recuperar a Palavra-passe</h1>
            <p className="text-gray-500 text-sm mt-2">
              Introduza o seu email e enviaremos um link para redefinir a sua palavra-passe.
            </p>
          </div>

          {/* Mensagem de status */}
          {status && (
            <div className="mb-4 text-sm font-medium text-green-600 text-center">{status}</div>
          )}

          {/* Formulário */}
          <form onSubmit={submit} className="space-y-6">
            <div>
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="exemplo@email.com"
                isFocused={true}
                onChange={(e) => setData('email', e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="flex flex-col gap-3">
              <PrimaryButton
                type="submit"
                className="bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition duration-200 w-full"
                disabled={processing}
              >
                Enviar link de redefinição
              </PrimaryButton>

              {/* Botão para home (usa link absoluto -> evita dependência de 'route') */}
              <Link
                href="/"
                className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-3 rounded-lg transition duration-200"
              >
                ← Voltar à página inicial
              </Link>

              {/* Botão "voltar" que utiliza o histórico do browser */}
              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full text-center bg-transparent border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-4 py-3 rounded-lg transition duration-200"
              >
                ← Voltar (página anterior)
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
