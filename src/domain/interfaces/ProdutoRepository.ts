import { Produto } from '../entities/Produto';

export interface ProdutoRepository {
    create(produto: Partial<Produto>): Promise<Produto>;
    findAll(): Promise<Produto[]>;
    findById(id: number): Promise<Produto | null>;
    update(id: number, produto: Partial<Produto>): Promise<Produto>;
    delete(id: number): Promise<void>;
}