import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            {/* Tela inteira branca */}
            <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6">
                
                {/* Conteúdo central */}
                <div className="w-full max-w-md">
                    {/* Logo e título */}
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src="/logos/logo.jpeg"
                            alt="XioteCar"
                            className="h-16 mb-3"
                        />
                        <h1 className="text-2xl font-bold text-red-600 text-center">
                            Bem-vindo à XioteCar
                        </h1>
                        <p className="text-gray-500 text-center text-sm mt-1">
                            Aceda à sua conta para gerir os seus automóveis e vendas
                        </p>
                    </div>

                    {/* Mensagem de status */}
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    {/* Formulário */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-semibold" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                                placeholder="exemplo@xiotecar.pt"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-semibold" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Lembrar-me */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Manter a sessão iniciada</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-gray-600 hover:text-red-600 transition"
                                >
                                    Esqueceu-se da sua password?
                                </Link>
                            )}
                        </div>

                        {/* Botão de login */}
                        <div className="flex justify-center">
                            <PrimaryButton
                                className="bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition duration-200"
                                disabled={processing}
                            >
                                Entrar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
