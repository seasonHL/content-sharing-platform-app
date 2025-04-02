export interface ICreateComment {
    post_id?: string
    parent_comment_id?: number
    target_comment_id?: number
    user_id: number
    comment_text: string
}

export interface ICreatePost {
    title: string
    content: string
    author_id: number
    media: {
        media_url: string
        media_type: string
    }[]
}