import axios from "../API"

export const AuthAPI = {
  getUserData: async (params) => {
    const { data } = await axios.post("/auth/login", params)

    return data
  },
  getMe: async () => {
    const { data } = await axios.get("/auth/me")

    return data
  },
}