import axios from "../API"

export interface IUserData {
  _id: string
  nickname: string
  email: string
  firstName: string
  birthday: string
  avatarUrl: string
  isAdmin: boolean
}

export interface IUser {
  userData: IUserData | null
  token: string
}

export type UserWithOutToken = Omit<IUser, "token">

export type LoginPropsTypes = {
  email: string
  password: string
}

export type RegistrationPropsTypes = {
  email: string
  nickname: string
  password: string
  firstName: string
  birthday: string
}

export type AuthAPIMethods = {
  getUserData: (params: LoginPropsTypes) => Promise<IUser>
  getMe: () => Promise<IUserData>
  registration: (params: RegistrationPropsTypes) => Promise<IUser>
}

export const AuthAPI: AuthAPIMethods = {
  getUserData: async (params) => {
    const { data } = await axios.post<IUser>("/auth/login", params)

    return data
  },
  getMe: async () => {
    const { data } = await axios.get<IUserData>("/auth/me")

    return data
  },
  registration: async (params) => {
    const { data } = await axios.post<IUser>("/auth/register", params)

    return data
  },
}
