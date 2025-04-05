export interface MediaType {
    media_id: number
    media_url: string
    media_type: string
    created_at: string
}
export interface PostType {
    post_id: number
    title: string
    content: string
    author_id: number
    created_at: string
    updated_at: string
    is_published: boolean
    media: MediaType[]
    isLiked: boolean
    likeCount: number
    commentCount: number
}

export interface CommentType {
    comment_id: number
    post_id: number
    parent_comment_id: number
    comment_text: string
    created_at: Date
    updated_at: Date
    user: {
        user_id: number
        username: string
        avatar: string
    }
    targetComment?: CommentType
    replyList?: CommentType[]
}