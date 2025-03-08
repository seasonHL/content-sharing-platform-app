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
    token: string | null
    setToken: (token: string) => void
    clearToken: () => void
}
/**
 * 登录token
 */
export const useToken = create(persist<TokenState>((set) => ({
    token: '',
    setToken: (token: string) => set({ token }),
    clearToken: () => set({ token: null }),
}), {
    name: 'access_token',
    storage: createJSONStorage(() => AsyncStorage),
}));
