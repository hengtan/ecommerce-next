import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/input";



const SignIn = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (session) {
        router.push('/dashboard');
        return null;
    }

    const handleEmailSignIn = () => {
        // Simula login com email e senha
        alert(`Login com email: ${email}`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
                    Bem-vindo de volta!
                </h2>
                <p className="mb-4 text-center text-gray-600">
                    Faça login com sua conta.
                </p>

                {/* Botão para login com Google */}
                <Button
                    variant="default"
                    className="w-full mb-4 bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => signIn('google')}
                >
                    Entrar com Google
                </Button>

                <div className="relative flex items-center justify-center py-4">
                    <span className="absolute px-4 text-gray-500 bg-white">ou</span>
                    <hr className="w-full border-t border-gray-300" />
                </div>

                {/* Formulário de login com email e senha */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEmailSignIn();
                    }}
                    className="space-y-4"
                >
                    <Input
                        id="email"
                        type="email"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Entrar
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <a href="/auth/signup" className="text-blue-500 hover:underline">
                        Cadastre-se
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;