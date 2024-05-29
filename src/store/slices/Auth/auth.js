import { createSlice } from "@reduxjs/toolkit"
import { fetchAuthBuilder } from "./fetchAuth"
import { fetchAuthMeBuilder } from "./fetchAuthMe.js"

const initialState = {
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
  },
})
export const isAuthSelector = (state) => Boolean(state.auth.user)

export const { signOut } = authSlice.actions

export const authReducer = authSlice.reducer