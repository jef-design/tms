import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_PROD_SERVER_URL: import.meta.env.VITE_DEV_SERVER_URL,   
    withCredentials: true,
})