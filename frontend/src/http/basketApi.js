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

export const Increment = async(id) => {
    try {
        const data = await $authHost.post("api/basket/increment", {id})
        return data
    } catch (e) {
        return e
    }
}
export const Decrement = async(id) => {
    try {
        const data = await $authHost.post("api/basket/decrement", {id})
        return data
    } catch (e) {
        return e
    }
}

export const TotalCount = async(id) => {
    try {
        const data = await $authHost.get(`api/basket/total/${id}`)
        return data
    } catch (e) {
        return e
    }
}