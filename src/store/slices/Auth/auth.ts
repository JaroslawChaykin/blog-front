import { createSlice } from "@reduxjs/toolkit"
import { fetchAuthBuilder } from "./fetchAuth"
import { fetchAuthMeBuilder } from "./fetchAuthMe"
import { fetchRegistrationBuilder } from "./fetchRegistration"
import { RootState } from "../../store"
import { IUser, UserWithOutToken } from "../../../API/Auth/Auth.ts"

export type AuthTypes<T> = {
  user: T | null
  status: "loading" | "loaded" | "error"
}

export type AuthUser = AuthTypes<IUser>
export type AuthUserMe = AuthTypes<UserWithOutToken>

const initialState: AuthTypes<IUser> = {
  user: null,
  status: "loading",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    fetchAuthBuilder(builder)
    fetchAuthMeBuilder(builder)
    fetchRegistrationBuilder(builder)
  },
})
export const isAuthSelector = (state: RootState) => Boolean(state.auth.user)
export const getUser = (state: RootState) => state.auth.user?.userData

export const { signOut } = authSlice.actions

export const authReducer = authSlice.reducer
