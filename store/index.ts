import { User } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
export { useCommentStore } from './post'

export interface UserState {
    user: User | null
    setUser: (user: User) => void
}
/**
 * 用户信息
 */
export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))

export interface TokenState {
    access_token: string | null
    refresh_token: string | null
}
interface TokenAction {
    clearToken: () => void
    setAccessToken: (token: string) => void
    setRefreshToken: (token: string) => void
}
/**
 * 登录token
 */
export const useToken = create(persist<TokenState & TokenAction>((set) => ({
    clearToken: () => set({ access_token: null, refresh_token: null }),
    access_token: '',
    setAccessToken: (token: string) => set({ access_token: token }),
    refresh_token: '',
    setRefreshToken: (token: string) => set({ refresh_token: token }),
}), {
    name: 'token',
    storage: createJSONStorage(() => AsyncStorage),
}));
