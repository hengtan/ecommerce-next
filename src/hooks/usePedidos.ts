import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';

interface Produto {
    id: number;
    nome: string;
    preco: number;
}

export const useProdutos = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProdutos = async () => {
        setLoading(true);
        try {
            const data = await apiClient.get('/produtos');
            setProdutos(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addProduto = async (produto: Omit<Produto, 'id'>) => {
        setLoading(true);
        try {
            const newProduto = await apiClient.post('/produtos', produto);
            setProdutos((prev) => [...prev, newProduto]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    return { produtos, loading, error, addProduto, fetchProdutos };
};