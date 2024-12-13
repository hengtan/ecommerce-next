import { Pedido } from '../entities/Pedido';

export interface PedidoRepository {
    create(pedido: Partial<Pedido>): Promise<Pedido>;
    findAll(): Promise<Pedido[]>;
    findById(id: number): Promise<Pedido | null>;
    delete(id: number): Promise<void>;
}