import { service } from "."

export const getPostDetail = async (post_id: string) => {
    const res = await service.get(`/post/detail`, {
        params: {
            post_id
        }
    })
    return res.data
}