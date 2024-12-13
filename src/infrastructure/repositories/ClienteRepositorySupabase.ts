import { ClienteRepository } from '@/domain/interfaces/ClienteRepository';
import { Cliente } from '@/domain/entities/Cliente';
import { supabase } from '@/infrastructure/supabaseClient';

export class ClienteRepositorySupabase implements ClienteRepository {
    async create(cliente: Partial<Cliente>): Promise<Cliente> {
        const { data, error } = await supabase
            .from('clientes')
            .insert(cliente)
            .select()
            .single();

        if (error) {
            console.error('Erro ao inserir cliente no banco:', error.message);
            throw new Error('Erro ao cadastrar cliente');
        }

        return data as Cliente;
    }

    async findAll(): Promise<Cliente[]> {
        const { data, error } = await supabase.from('clientes').select('*');
        if (error) throw error;
        return data as Cliente[];
    }

    async findByEmail(email: string): Promise<Cliente | null> {
        const { data, error } = await supabase
            .from('clientes')
            .select('*')
            .eq('email', email)
            .single();

        if (error) return null;
        return data as Cliente;
    }

    async findById(id: number): Promise<Cliente | null> {
        const { data, error } = await supabase.from('clientes').select('*').eq('id', id).single();
        if (error) throw error;
        return data || null;
    }

    async update(id: number, cliente: Partial<Cliente>): Promise<Cliente> {
        const { data, error } = await supabase.from('clientes').update(cliente).eq('id', id).select().single();
        if (error) throw error;
        return data as Cliente;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase.from('clientes').delete().eq('id', id);
        if (error) throw error;
    }
}