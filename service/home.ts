import { PostType } from "@/types"
import { service } from "."

interface IParams {
    page?: number
    pageSize?: number
    user_id?: number
}
export const getPostList = async (params?: IParams): Promise<PostType[]> => {
    const res = await service.get('/post/list', {
        params
    })
    return res.data
}