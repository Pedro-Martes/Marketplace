type ImageProps= {
    id: number,
    uri: string
}
export type ProductDTO = {
    id: symbol,
    title: string,
    price: number,
    image: ImageProps[],
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