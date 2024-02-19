
export type ProductDTO = {
    id: symbol,
    title: string,
    price: number,
    ImageUri: string[],
    description: string,
    status: string,
    seller: string,
    troca: boolean,
    boleto: boolean,
    pix: boolean,
    dinheiro: boolean,
    deposito: boolean,
    credito: boolean,
    ativo: boolean,
}