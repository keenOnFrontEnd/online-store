import axios from "axios";

let baseUrl = 'http://localhost:7000/'


const $host = axios.create({
    baseURL: baseUrl
})

const $authHost = axios.create({
    baseURL: baseUrl
})


const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}