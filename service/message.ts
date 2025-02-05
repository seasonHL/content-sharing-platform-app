import { service } from "."

export const getConversations = async () => {
    return {
        data: [{
            conversation_id: 1,
            user_id: 1,
            avatar: "",
            title: 'John-Doe',
            updated_at: '2021-01-01',
            last_message: 'Hello',
            unread: 1,
        }]
    }
}