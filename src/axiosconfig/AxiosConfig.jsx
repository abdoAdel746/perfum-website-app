import axios  from "axios"

export const AxiosConfig = axios.create({
    baseURL: "http://localhost:8000"
})