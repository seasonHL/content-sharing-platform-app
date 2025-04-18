import { search as searchPost } from "./post";
import { search as searchProduct } from "./shop";
import { search as searchUser } from "./user";

export const search = async (keyword: string) => {
    const [postRes, productRes, userRes] = await Promise.all([searchPost(keyword), searchProduct(keyword), searchUser(keyword)])
    return {
        post: postRes.data,
        product: productRes.data,
        user: userRes.data
    }
}