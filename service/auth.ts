import { service } from "."
import { useToken } from "@/store"

export interface ILoginData {
    username: string
    password: string
}
export const login = async (data: ILoginData) => {
    const res = await service.post('/auth/login', data)
    const { access_token, refresh_token } = res.data;
    if (access_token) {
        useToken.setState({
            access_token,
            refresh_token
        })
    } else {
        return false
    }
    return true
}

export const verify = async () => {
    const res = await service.get('/auth/verify')
    return res.data
}