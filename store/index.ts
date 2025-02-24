import { User } from '@/types'
import { create } from 'zustand'

export interface UserState {
    user: User | null
    setUser: (user: User) => void
}
export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))
