import { useState } from 'react';
import { Input } from '@/components/ui/input'; // Ajuste o caminho do input
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import {Button} from "@/components/ui/Button";

const SignUp = () => {
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }

        try {
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    password,
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                alert(`Erro ao cadastrar: ${responseData.message}`);
                return;
            }

            alert('Cadastro realizado com sucesso!');
            router.push('/auth/signin');
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert('Ocorreu um erro ao cadastrar. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
                    Crie sua conta
                </h2>
                <p className="mb-4 text-center text-gray-600">
                    Preencha os campos abaixo para se cadastrar.
                </p>

                <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Nome */}
                    <Input
                        id="nome"
                        type="text"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    {/* Email */}
                    <Input
                        id="email"
                        type="email"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Telefone */}
                    <Input
                        id="telefone"
                        type="tel"
                        placeholder="Seu telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                    />

                    {/* Senha */}
                    <Input
                        id="password"
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Confirmar Senha */}
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Cadastrar
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <a href="/auth/signin" className="text-blue-500 hover:underline">
                        Faça login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;