export interface ICreateComment {
    post_id?: string
    parent_comment_id?: number
    user_id: number
    comment_text: string
}