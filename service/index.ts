import axios from "axios";

export const service = axios.create({
    baseURL: 'http://10.17.154.185:3000'
})