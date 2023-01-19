import { $authHost } from "."

export const CreateBrand = async (name) => {
    try {   
        let res = await $authHost.post('api/brand/create',{name})
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}
export const DeleteBrand = async (name) => {
    try {
        let res = await $authHost.delete(`api/brand/delete/${name}`)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export const CreateType = async (name) => {
    try {
        let res = await $authHost.post('api/type/create',{name})
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export const DeleteType = async (name) => {
    try {
        let res = await $authHost.delete(`api/type/delete/${name}`)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export const ItemCreate = async (data) => {
    try {
        let res = await $authHost.post(`api/item/create`, data,{
            headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export const DeleteItem = async ({name}) => {
    try {
        let res = await $authHost.delete(`api/item/delete/${name}`)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}