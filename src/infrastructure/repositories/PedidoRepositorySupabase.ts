import { PedidoRepository } from '@/domain/interfaces/PedidoRepository';
import { Pedido } from '@/domain/entities/Pedido';
import { supabase } from '@/infrastructure/supabaseClient';

export class PedidoRepositorySupabase implements PedidoRepository {
    async create(pedido: Partial<Pedido>): Promise<Pedido> {
        const { data, error } = await supabase.from('pedidos').insert(pedido).select().single();
        if (error) throw error;
        return data as Pedido;
    }

    async findAll(): Promise<Pedido[]> {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*, clientes(*), itens_pedido(produto_id, quantidade)');
        if (error) throw error;
        return data as Pedido[];
    }

    async findById(id: number): Promise<Pedido | null> {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*, clientes(*), itens_pedido(produto_id, quantidade)')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data || null;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase.from('pedidos').delete().eq('id', id);
        if (error) throw error;
    }
}