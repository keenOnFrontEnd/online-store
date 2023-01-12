import { $authHost } from ".";


export const getBasketItems = async(id) => {
    try {
        const data = await $authHost.get(`api/basket/${id}`)
        return data
    } catch (e) {
        return e
    }
}

export const addItemToBasket = async(candidate) => {
    try {
        const data = await $authHost.post('api/basket',candidate)
        return data
    } catch (e) {
        return e
    }
}

export const Delete = async(id) => {
    try {
        const data = await $authHost.delete(`api/basket/${id}`)
        return data
    } catch (e) {
        return e
    }
}