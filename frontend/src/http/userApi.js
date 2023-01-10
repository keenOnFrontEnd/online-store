import { $host } from "./index";


export const registration = async ({ email, password, role }) => {
    try {
        const responce = await $host.post('api/user/registration', {
            email: email,
            password: password,
            role: role
        })
        return responce
    } catch (e) {
        return e
    }
}

export const login = async ({ email, password }) => {
    try {
        const responce = await $host.post('api/user/login',
            {
                email: email,
                password: password
            })
        return responce
    } catch (e) {
        return e
    }
}

export const check = async () => {
    const responce = await $host.post('api/user/auth/')
    return responce
}
