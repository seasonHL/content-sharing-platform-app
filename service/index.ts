import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const service = axios.create({
    baseURL: 'http://10.17.233.184:3000'
})

service.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('access_token')
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
            AsyncStorage.removeItem('access_token')
        }
        return Promise.reject(error)
    }
)