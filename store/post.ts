import { CommentType } from "@/types/home"
import { create } from "zustand"

export interface TCommentState {
    user: {
        user_id: number
        username: string
        avatar: string
    }
    commentId: number
    content: string
    createdAt: Date
    replies?: TCommentState[]
    target?: TCommentState
    replyCount?: number
}

interface CommentStore {
    comments: TCommentState[]
    parentComment: TCommentState | null
    targetComment: TCommentState | null
}

interface CommentActions {
    addComment: (comment: TCommentState | TCommentState[]) => void
    addReply: (commentId: number, reply: TCommentState | TCommentState[]) => void
    reset: () => void
    setParentComment: (comment: CommentStore['parentComment']) => void
    setTargetComment: (comment: CommentStore['targetComment']) => void
    clearSelectedComment: () => void
}



export const useCommentStore = create<CommentStore & CommentActions>((set) => ({
    comments: [],
    parentComment: null,
    targetComment: null,
    addComment: (comment) => set((state) => {
        if (Array.isArray(comment)) {
            return { comments: [...state.comments, ...comment] }
        } else {
            return { comments: [...state.comments, comment] }
        }
    }),
    addReply: (commentId, reply) => set((state) => ({
        comments: state.comments.map((comment) => {
            console.log(comment.commentId, reply, commentId)
            if (comment.commentId === commentId) {
                console.log(comment, reply)
                return { ...comment, replies: [...(comment.replies || [])].concat(reply) }
            } else {
                return comment
            }
        })
    })),
    reset: () => set({ comments: [] }),
    setParentComment: (comment) => set({ parentComment: comment }),
    setTargetComment: (comment) => set({ targetComment: comment }),
    clearSelectedComment: () => set({ parentComment: undefined, targetComment: undefined }),
}))

export const commentAdapter = (comment: CommentType): TCommentState => {
    return {
        user: comment.user,
        commentId: comment.comment_id,
        content: comment.comment_text,
        createdAt: comment.created_at,
        replies: [],
        replyCount: comment.replyList?.length || 0,
    }
}

export const replyAdapter = (comment: CommentType): TCommentState => {
    const target = comment.targetComment ? {
        user: comment.targetComment!.user,
        commentId: comment.targetComment!.comment_id,
        content: comment.targetComment!.comment_text,
        createdAt: comment.targetComment!.created_at,
    } : undefined
    return {
        user: comment.user,
        commentId: comment.comment_id,
        content: comment.comment_text,
        createdAt: comment.created_at,
        target,
    }
}