import { service } from "."

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