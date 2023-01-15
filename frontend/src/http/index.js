import axios from "axios";

let baseUrl = 'http://localhost:7000/'


const $host = axios.create({
    baseURL: baseUrl
})

const $authHost = axios.create({
    baseURL: baseUrl
})


const authInterceptor = async config => {

    try {
        let check = await axios.get(`${baseUrl}api/user/auth`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(check.statusText === "OK") {
            localStorage.setItem('token', check.data.token)
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
            return config
        } else {
            return Promise.reject("undefined error")
        }
    } catch (error) {
        return Promise.reject(error)
    }
    
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}