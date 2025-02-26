import { service } from "."
import { useToken } from "@/store"

export interface ILoginData {
    username: string
    password: string
}
export const login = async (data: ILoginData) => {
    const res = await service.post('/auth/login', data)
    const { access_token } = res.data;
    if (access_token) {
        useToken.setState({ token: access_token })
    } else {
        throw Error('登录错误')
    }
    return true
}

export const verify = async () => {
    const res = await service.get('/auth/verify')
    return res.data
}