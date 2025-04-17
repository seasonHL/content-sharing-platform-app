export { PostType, MediaType } from './home'
export { ProductType } from './shop'

export enum EGender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface User {
    /** 用户ID，自增长，主键 */
    user_id: number;
    /** 用户名，最大长度50字符，不为空 */
    username: string;
    /** 密码，最大长度255字符，不为空 */
    password: string;
    /** 电子邮件，最大长度100字符，不为空 */
    email: string;
    /** 创建时间，默认当前时间 */
    created_at: Date;
    /** 更新时间，自动更新 */
    updated_at: Date;
    /** 角色，最大长度20字符 */
    role: string;
    /** 头像，存储头像 URL 或文件路径 */
    avatar: string;
    /** 简介，存储用户的个人简介 */
    bio: string;
    /** 性别，枚举类型 */
    gender: EGender;
    /** 生日，存储用户的出生日期 */
    birthdate: Date;
    /** 关注数，默认为0 */
    followings: number;
    /** 粉丝数，默认为0 */
    followers: number;
}

export interface IData<T = unknown> {
    code: number
    data: T
    msg: string
}

export type IResult<T = unknown> = Promise<IData<T>>