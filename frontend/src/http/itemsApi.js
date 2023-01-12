import axios from "axios";
import { $host } from ".";


export const getAll = async () => {
    try {
    const data = await $host.get('api/item')
    return data
    } catch (e) {
        return e
    }
}

export const getOne = async (id) => {
    try {
     const data = await $host.get(`api/item/${id}`)
     return data
    } catch (e) {
        return e
    }

   
}

