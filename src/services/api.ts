import axios, { AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";

type LogOut = () => void

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManeger: (logOut: LogOut) => () => void;
}

const api = axios.create({
    baseURL: 'http://192.168.0.32:3333'
}) as APIInstanceProps

api.registerInterceptTokenManeger = logOut => {
    const interceptTokenManeger = api.interceptors.request.use(response => response, requestError => {
        
        if(requestError?.response?.status ==  401){
            if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid'){

            }
            logOut();


        }




        if (requestError.response && requestError.data) {
            return Promise.reject(new AppError(requestError.response.data.message))
        }
    });

    return () => {
        api.interceptors.response.eject(interceptTokenManeger)
    }
}


//
export { api };