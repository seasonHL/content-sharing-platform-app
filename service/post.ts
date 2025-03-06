import { ICreateComment } from "@/types/post"
import { service } from "."

export const getPostDetail = async (post_id: string) => {
    const res = await service.get(`/post/detail`, {
        params: {
            post_id
        }
    })
    return res.data
}

export const getCommentList = async (post_id: string) => {
    const res = await service.get(`/comment/list`, {
        params: {
            post_id
        }
    })
    return res.data
}
/**
 * 
 * @param comment_id 
 * @returns 
 */
export const getReplyList = async (comment_id: number) => {
    const res = await service.get(`/comment/replies`, {
        params: {
            comment_id
        }
    })
    return res.data
}

export const createComment = async (data: ICreateComment) => {
    const res = await service.post(`/comment/create`, data)
    return res.data
}
