export class Pedido {
    constructor(
        public id: number,
        public cliente_id: number,
        public data_pedido: string,
        public produtos: { produto_id: number; quantidade: number }[]
    ) {}
}