import axios from "axios"
import { BASE_URL } from "../constants"

const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token") || sessionStorage.getItem("token")

  return config
})

export default instance
