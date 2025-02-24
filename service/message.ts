import { service } from "."

export const getConversations = async (user_id: number) => {
    const res = await service.get('/conversation/list', {
        params: {
            user_id
        }
    })
    return res.data
}

export const getConversationDetail = async (id: number) => {
    const res = await service.get('/conversation/detail', {
        params: {
            id
        }
    })
    return res.data
}