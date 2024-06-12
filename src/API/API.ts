import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:4444",
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token") || sessionStorage.getItem("token")

  return config
})

export default instance
