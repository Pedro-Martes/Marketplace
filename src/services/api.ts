import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";
import { storageAuthTokenGet, storageAuthTokenInsert } from "../storage/storageAuthToken";
import { storageUserSave } from "../storage/storageUser";

type LogOut = () => void

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManeger: (logOut: LogOut) => () => void;
}
type PromisesType = {
    onSuccess: (token: string) => void,
    onError: (error: AxiosError) => void
}
const api = axios.create({
    baseURL: 'http://192.168.0.32:3333'
}) as APIInstanceProps

let faliedQueue: Array<PromisesType> = [];
let isRefreshing = false;

api.registerInterceptTokenManeger = logOut => {
    const interceptTokenManeger = api.interceptors.request.use(response => response, async (requestError) => {

        if (requestError?.response?.status == 401) {
            if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
                const { refresh_token } = await storageAuthTokenGet();
                if (!refresh_token) {
                    logOut();
                    return Promise.reject(requestError);
                }

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        faliedQueue.push({
                            onSuccess: (token: string) => {
                                originalRequestConfig.headers = {'Authorization': `Bearer ${token}`}
                                resolve(originalRequestConfig);
                             },
                            onError: (error: AxiosError) => {
                                reject(error);
                             }
                        })
                    })
                }
                isRefreshing = true;

                return new Promise(async (resolve, reject) => {
                    try {

                            const {data} = await api.post('/sessions/refresh-token', {refresh_token});
                            await storageAuthTokenInsert({token: data.token, refresh_token: data.refresh_token})

                            if(originalRequestConfig.data){
                                originalRequestConfig.data = JSON.parse(originalRequestConfig.data); 
                            }
                            originalRequestConfig.headers = {'Authorization': `Bearer ${data.token}`};
                            api.defaults.headers.common[ 'Authorization' ]= `Bearer ${data.token}`;
                            faliedQueue.forEach(request => {
                                request.onSuccess(data.token);
                            });

                            console.log("Token Autalizado!");
                            resolve(api(originalRequestConfig));
                        
                    } catch (error: any) {
                        faliedQueue.forEach(request => {
                            request.onError(error);
                        });
                        logOut();
                        reject(error);
                    }finally{
                        isRefreshing = false;
                        faliedQueue = []
                    }
                })

                const originalRequestConfig = requestError.config;
                console.log('Req => ' + originalRequestConfig);
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