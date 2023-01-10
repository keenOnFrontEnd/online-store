import axios from "axios";
import { $authHost } from ".";


export const getAll = async () => {

    try {
    const data = await $authHost.get('api/item')
    return data
    } catch (e) {
        return e
    }

    
}

export const getOne = async (id) => {

    try {
     const data = await $authHost.get(`api/item/${id}`)
     return data
    } catch (e) {
        return e
    }

   
}

