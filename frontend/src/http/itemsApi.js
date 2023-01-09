import axios from "axios";
import { $authHost } from ".";


export const getAll = async() => {
    const {data} = $authHost.get('api/')
    return data
}

export const getOne = (id) => {
    const {data} = $authHost.get(`api/${id}`)
    return data
}

