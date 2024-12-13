import { supabase } from '@/infrastructure/supabaseClient';
import { useEffect, useState } from 'react';

const Teste = () => {
    const [dados, setDados] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            // Consulta os dados da tabela "produtos"
            const { data, error } = await supabase.from('produtos').select('*');
            if (error) {
                console.error('Erro ao buscar dados:', error.message);
            } else {
                setDados(data);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Teste do Supabase</h1>
            <pre>{JSON.stringify(dados, null, 2)}</pre>
        </div>
    );
};

export default Teste;