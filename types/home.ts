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
}