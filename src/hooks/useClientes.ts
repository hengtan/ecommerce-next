import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';

interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

export const useClientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchClientes = async () => {
        setLoading(true);
        try {
            const data = await apiClient.get('/clientes');
            setClientes(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    return { clientes, loading, error, fetchClientes };
};