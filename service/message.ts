import { IResult } from "@/types"
import { service } from "."
import { ConversationType } from "@/types/message"

export const createConversation = async (
    user_id: number,
    friend_id: number,
): IResult<Omit<ConversationType, 'messages'>> => {
    const data = {
        user_id,
        friend_id,
    }
    const res = await service.post('/conversation/create', data)
    return res.data
}

export const getConversations = async (user_id: number): IResult<Omit<ConversationType, 'messages'>[]> => {
    const res = await service.get('/conversation/list', {
        params: {
            user_id
        }
    })
    return res.data
}

export const getConversationDetail = async (id: number): IResult<ConversationType> => {
    const res = await service.get('/conversation/detail', {
        params: {
            id
        }
    })
    return res.data
}