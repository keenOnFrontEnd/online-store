import { $host } from "./index";


export const registration = async (email, password,role="USER") => {
    const responce = await $host.post('api/auth/registration',{email,password, role})
    return responce
}

export const login = async ({email, password}) => {
    const responce = await $host.post('api/user/login',
    {email:email,
    password: password})
    return responce
}

export const check = async () => {
    const responce = await $host.post('api/auth/check')
    return responce
}
