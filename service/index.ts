import { useToken } from "@/store";
import axios from "axios";
import io from "socket.io-client";

const BASE_URL = 'http://192.168.45.125:3000'

export const socket = io(BASE_URL, {
    async auth(cb) {
        cb({
            token: useToken.getState().token
        })
    },
})

socket.on('connect', () => {
    console.log('connected')
})
socket.on('disconnect', () => {
    console.log('disconnected')
})

export const service = axios.create({
    baseURL: BASE_URL
})

service.interceptors.request.use(
    async (config) => {
        const token = useToken.getState().token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if (error.status === 401) {
            useToken.getState().clearToken()
        }
        return Promise.reject(error)
    }
)