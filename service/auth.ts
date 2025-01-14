import AsyncStorage from "@react-native-async-storage/async-storage"
import { service } from "."

export interface ILoginData {
    username: string
    password: string
}
export const login = async (data: ILoginData) => {
    const res = await service.post('/auth/login', data)
    const { access_token } = res.data;
    if (access_token) {
        await AsyncStorage.setItem('access_token', access_token)
    } else {
        throw Error('登录错误')
    }
    return true
}

export const verify = async () => {
    const res = await service.get('/auth/verify')
    return res.data
}