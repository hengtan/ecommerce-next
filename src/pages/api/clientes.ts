import { NextApiRequest, NextApiResponse } from 'next';
import { ClienteRepositorySupabase } from '@/infrastructure/repositories/ClienteRepositorySupabase';
import { Cliente } from '@/domain/entities/Cliente';

const clienteRepo = new ClienteRepositorySupabase();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    try {
        switch (method) {
            case 'GET':
                if (id) {
                    // Buscar cliente pelo ID
                    const cliente = await clienteRepo.findById(Number(id));
                    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
                    res.status(200).json(cliente);
                } else {
                    // Buscar todos os clientes
                    const clientes = await clienteRepo.findAll();
                    res.status(200).json(clientes);
                }
                break;

            case 'POST':
                const novoCliente = req.body as Partial<Cliente>;
                if (!novoCliente.email || !novoCliente.nome || !novoCliente.telefone) {
                    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
                }

                // Validar se o cliente já existe
                const clienteExistente = await clienteRepo.findByEmail(novoCliente.email);
                if (clienteExistente) {
                    return res.status(400).json({ message: 'Cliente já cadastrado.' });
                }

                // Criar cliente se não existir
                try {
                    const clienteCriado = await clienteRepo.create(novoCliente);
                    res.status(201).json(clienteCriado);
                } catch (error) {
                    console.error('Erro ao criar cliente:', error);
                    res.status(500).json({ message: 'Erro ao cadastrar cliente. Tente novamente mais tarde.' });
                }
                break;

            case 'PUT':
                // Atualizar cliente
                const clienteAtualizado = req.body as Partial<Cliente>;
                if (!id) return res.status(400).json({ message: 'ID é obrigatório para atualização' });
                const atualizado = await clienteRepo.update(Number(id), clienteAtualizado);
                res.status(200).json(atualizado);
                break;

            case 'DELETE':
                // Excluir cliente
                if (!id) return res.status(400).json({ message: 'ID é obrigatório para exclusão' });
                await clienteRepo.delete(Number(id));
                res.status(204).end();
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
                break;
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}