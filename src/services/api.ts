import axios from "axios";


const api = axios.create({
    baseURL: '192.168.1.56:3333'
}) 

export {api};