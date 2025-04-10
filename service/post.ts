import { ICreateComment, ICreatePost } from "@/types/post"
import { service } from "."
import { IResult } from "@/types"
import { CommentType } from "@/types/home"

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

export const createComment = async (data: ICreateComment): IResult<CommentType> => {
    const res = await service.post(`/comment/create`, data)
    return res.data
}

export const createPost = async (data: ICreatePost) => {
    const res = await service.post(`/post/create`, data)
    return res.data
}

export const likePost = async (postId: number) => {
    const res = await service.post(`/post/like`, { postId })
    return res.data
}

export const unlikePost = async (postId: number) => {
    const res = await service.post(`/post/unlike`, { postId })
    return res.data
}

export const share = async (postId: number, to: number) => {
    const res = await service.post(`/post/share`, { post_id: postId, receiver_id: to })
    return res.data
}