import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const { email, name } = user;

            // Envia os dados para o backend
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: name,
                    email,
                    telefone: '', // Telefone vazio por padrão
                }),
            });

            if (!response.ok && response.status !== 400) {
                // Retorna erro se não for cliente já cadastrado
                throw new Error('Erro ao cadastrar cliente');
            }

            return true; // Continue com o login
        },
    }
});