import { $host } from ".";


export const getTypes = async () => {
    try {
        let res = await $host.get("api/type/types")
        return res
    } catch (e) {
        return e
    }
}

export const getBrands = async () => {
    try {
        let res = await $host.get("api/brand/brands")
        return res
    } catch (e) {
        return e
    }
}