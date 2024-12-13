import { Cliente } from '../entities/Cliente';

export interface ClienteRepository {
    create(cliente: Partial<Cliente>): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    findById(id: number): Promise<Cliente | null>;
    update(id: number, cliente: Partial<Cliente>): Promise<Cliente>;
    delete(id: number): Promise<void>;
}