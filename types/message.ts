export interface ConversationType {
    conversation_id: number
    user_id: number
    title: string
    updated_at: Date | string | number
    avatar: string
    last_message: string
    unread: number
    friend_id: number
}

/** 消息实体类 */
export interface MessageType {
    conversation_id: number;
    /** 发送者 ID */
    sender_id: number;
    /** 接收者 ID */
    receiver_id: number;
    /** 群组 ID */
    group_id: number
    /** 消息内容 */
    content: string;
    /** 消息发送时间 */
    createdAt: Date;
    /** 消息状态 */
    isRead: boolean;
    /** 关联的用户 ID */
    // user_id: number;
}
