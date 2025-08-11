import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Criar Conta" />

            {/* Ocupa o ecrã todo */}
            <div className="min-h-screen w-full flex flex-col bg-white">
                {/* Título no topo */}
                <div className="p-6 bg-white-600 text-red text-center">
                    <h1 className="text-3xl font-bold">Criar Conta</h1>
                    <p className="text-sm mt-1">Preencha os campos para criar a sua conta</p>
                </div>

                {/* Formulário ocupa todo o resto */}
                <form
                    onSubmit={submit}
                    className="flex flex-col flex-1 p-6 gap-5 justify-center"
                >
                    {/* Nome */}
                    <div>
                        <InputLabel htmlFor="name" value="Nome" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Palavra-passe" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirmar Password */}
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirmar Palavra-passe" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col gap-3 mt-4">
                        <PrimaryButton
                            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition duration-200 w-full"
                            disabled={processing}
                        >
                            Criar Conta
                        </PrimaryButton>

                        <Link
                            href={route('login')}
                            className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-3 rounded-lg transition duration-200"
                        >
                            Já tem conta? Inicie sessão
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
