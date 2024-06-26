import { string } from "yup";


export type ProductPropsDTO = {

    product_images: any[];
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    accept_trade: boolean;
    payment_methods: string[];
    is_active?: boolean;

}