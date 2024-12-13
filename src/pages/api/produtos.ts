import { NextApiRequest, NextApiResponse } from 'next';
import { ProdutoRepositorySupabase } from '@/infrastructure/repositories/ProdutoRepositorySupabase';
import { Produto } from '@/domain/entities/Produto';

const produtoRepo = new ProdutoRepositorySupabase();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    try {
        switch (method) {
            case 'GET':
                if (id) {
                    // Buscar produto pelo ID
                    const produto = await produtoRepo.findById(Number(id));
                    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
                    res.status(200).json(produto);
                } else {
                    // Buscar todos os produtos
                    const produtos = await produtoRepo.findAll();
                    res.status(200).json(produtos);
                }
                break;

            case 'POST':
                // Criar produto
                const novoProduto = req.body as Partial<Produto>;
                const produtoCriado = await produtoRepo.create(novoProduto);
                res.status(201).json(produtoCriado);
                break;

            case 'PUT':
                // Atualizar produto
                const produtoAtualizado = req.body as Partial<Produto>;
                if (!id) return res.status(400).json({ message: 'ID é obrigatório para atualização' });
                const atualizado = await produtoRepo.update(Number(id), produtoAtualizado);
                res.status(200).json(atualizado);
                break;

            case 'DELETE':
                // Excluir produto
                if (!id) return res.status(400).json({ message: 'ID é obrigatório para exclusão' });
                await produtoRepo.delete(Number(id));
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