import { IResult } from "@/types"
import { service } from "."
import { ConversationType } from "@/types/message"

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