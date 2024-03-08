import axios from "axios";
import { AppError } from "../utils/AppError";


const api = axios.create({
    baseURL: 'http://192.168.0.32:3333'
}) 

api.interceptors.request.use(response => response, error => {
    console.log(error);
    if( error.response && error.data){
        return Promise.reject(new AppError(error.response.data.message))
    }
})

export {api};