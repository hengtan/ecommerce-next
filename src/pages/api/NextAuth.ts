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
        async session({ session, token }) {
            // Garantir que o token.sub e token.role são strings
            if (typeof token.sub === 'string') {
                session.user.id = token.sub;
            }
            if (typeof token.role === 'string') {
                session.user.role = token.role;
            } else {
                session.user.role = 'user'; // Role padrão
            }
            return session;
        },
        async jwt({ token, user }) {
            // Propagar informações do usuário para o token JWT
            if (user) {
                token.role = user.role || 'user'; // Adiciona a role ao token
            }
            return token;
        },
    },
});