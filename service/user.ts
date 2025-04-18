import { IResult, User } from "@/types"
import { service } from "."

export const findUserById = async (id: number): IResult<User> => {
    const res = await service.get(`/user/find`, {
        params: {
            user_id: id
        }
    })
    return res.data
}

export const search = async (keyword: string): IResult<User[]> => {
    const res = await service.get(`/user/search`, {
        params: { keyword }
    })
    return res.data
}