import { NextApiRequest, NextApiResponse } from 'next';
import { PedidoRepositorySupabase } from '@/infrastructure/repositories/PedidoRepositorySupabase';
import { Pedido } from '@/domain/entities/Pedido';

const pedidoRepo = new PedidoRepositorySupabase();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    try {
        switch (method) {
            case 'GET':
                if (id) {
                    // Buscar pedido pelo ID
                    const pedido = await pedidoRepo.findById(Number(id));
                    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
                    res.status(200).json(pedido);
                } else {
                    // Buscar todos os pedidos
                    const pedidos = await pedidoRepo.findAll();
                    res.status(200).json(pedidos);
                }
                break;

            case 'POST':
                // Criar pedido
                const novoPedido = req.body as Partial<Pedido>;
                const pedidoCriado = await pedidoRepo.create(novoPedido);
                res.status(201).json(pedidoCriado);
                break;

            case 'DELETE':
                // Excluir pedido
                if (!id) return res.status(400).json({ message: 'ID é obrigatório para exclusão' });
                await pedidoRepo.delete(Number(id));
                res.status(204).end();
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
                break;
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}