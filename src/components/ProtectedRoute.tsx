import { useSession, signIn } from 'next-auth/react';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
    children: ReactNode; // Conteúdo protegido
    roles?: string[];    // Roles permitidas
};

const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
    const { data: session, status } = useSession();

    // Enquanto a sessão está carregando
    if (status === 'loading') {
        return <p>Carregando...</p>;
    }

    // Caso não exista uma sessão ativa
    if (!session) {
        console.log('Nenhuma sessão ativa.');
        signIn();
        return null;
    }

    // Verifica as permissões do usuário com base na role
    const userRole = session.user.role || 'user'; // Role padrão caso não exista
    if (roles.length > 0 && !roles.includes(userRole)) {
        return <p>Acesso Negado</p>;
    }

    // Renderiza o conteúdo se todas as verificações passarem
    return <>{children}</>;
};

export default ProtectedRoute;