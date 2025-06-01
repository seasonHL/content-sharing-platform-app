import { useUser } from "@/store"
import { service } from "."

import productComments from '@/mock/productComments.json'

export const getProductList = async () => {
    const res = await service.get('/product/list')
    return res.data
}

export const getProduct = async (id: number) => {
    const res = await service.get(`/product/detail`, {
        params: {
            id
        }
    })
    return res.data
}

export const getProductComments = async (id: number) => {
    return productComments
}

export const addToCart = async (productIds: number[]) => {
    try {
        const userId = useUser.getState().user?.user_id
        if (!userId) return
        const res = await service.post(`/cart/add`, {
            productIds
        }, {
            params: {
                userId
            }
        })
        return res.data
    } catch (error) {

    }
}

export const getCart = async () => {
    try {
        const userId = useUser.getState().user?.user_id
        if (!userId) return
        const res = await service.get(`/cart/list`, {
            params: {
                userId
            }
        })
        return res.data
    } catch (error) {

    }
}

export const search = async (keyword: string) => {
    const res = await service.get(`/product/search`, {
        params: { keyword }
    })
    return res.data
}