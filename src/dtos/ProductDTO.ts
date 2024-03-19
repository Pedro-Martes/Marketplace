import { string } from "yup";


export type ProductPropsDTO = {

    images: any[];
    name: string;
    description: string;
    is_new: boolean;
    price: string;
    accept_trade: boolean;
    payment_methods: string[];
}