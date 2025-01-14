import { PostType } from "@/types"
import { service } from "."

export const getPostList = async (): Promise<PostType[]> => {
    const res = await service.get('/post/list')
    return res.data
}