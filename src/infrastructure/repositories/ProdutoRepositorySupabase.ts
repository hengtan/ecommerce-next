import { ProdutoRepository } from '@/domain/interfaces/ProdutoRepository';
import { Produto } from '@/domain/entities/Produto';
import { supabase } from '@/infrastructure/supabaseClient';

export class ProdutoRepositorySupabase implements ProdutoRepository {
    async create(produto: Partial<Produto>): Promise<Produto> {
        const { data, error } = await supabase.from('produtos').insert(produto).select().single();
        if (error) throw error;
        return data as Produto;
    }

    async findAll(): Promise<Produto[]> {
        const { data, error } = await supabase.from('produtos').select('*');
        if (error) throw error;
        return data as Produto[];
    }

    async findById(id: number): Promise<Produto | null> {
        const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single();
        if (error) throw error;
        return data || null;
    }

    async update(id: number, produto: Partial<Produto>): Promise<Produto> {
        const { data, error } = await supabase.from('produtos').update(produto).eq('id', id).select().single();
        if (error) throw error;
        return data as Produto;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase.from('produtos').delete().eq('id', id);
        if (error) throw error;
    }
}