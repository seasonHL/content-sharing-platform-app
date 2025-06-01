import { useToken } from "@/store";
import axios, { AxiosError } from "axios";
import { ToastAndroid } from "react-native";
export { socket } from './socket'

// export const BASE_URL = 'http://192.168.227.125:3000'
const BASE_URL = 'http://123.56.81.201:3000'

export const service = axios.create({
    baseURL: BASE_URL
})

const refreshQueue: any[] = []
let isRefreshing = false

const refreshToken = async () => {
    try {
        const token = useToken.getState().refresh_token
        if (!token) return
        const res = await service.get('/auth/refresh', {
            params: { token }
        })
        const { access_token, refresh_token } = res.data
        useToken.getState().setAccessToken(access_token)
        useToken.getState().setRefreshToken(refresh_token)
    } catch (error) {
        console.log(error)
    } finally {
        isRefreshing = false
        refreshQueue.forEach(cb => cb())
        refreshQueue.length = 0
    }
}

service.interceptors.request.use(
    async (config) => {
        const token = useToken.getState().access_token
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
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError
            switch (err.code) {
                case AxiosError.ERR_NETWORK:
                    ToastAndroid.show('网络错误', ToastAndroid.SHORT)
                    break
            }
        }

        if (error.status === 401) {
            return new Promise((resolve, reject) => {
                if (isRefreshing) {
                    refreshQueue.push(() => {
                        service(error.config)
                            .then(res => { resolve(res) })
                            .catch(err => { reject(err) })
                    })
                } else {
                    isRefreshing = true
                    refreshToken().then(() => {
                        service(error.config)
                            .then(res => { resolve(res) })
                            .catch(err => { reject(err) })
                    })
                }
            })
        }
        return Promise.reject(error)
    }
)