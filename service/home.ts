import { IResult, PostType } from "@/types"
import { service } from "."

interface IParams {
    page?: number
    pageSize?: number
    authorId?: number
}
export const getPostList = async (params?: IParams): IResult<PostType[]> => {
    const res = await service.get('/post/list', {
        params
    })
    return res.data
}