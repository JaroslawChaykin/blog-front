import { createSlice } from "@reduxjs/toolkit"
import { fetchAuthBuilder } from "./fetchAuth"
import { fetchAuthMeBuilder } from "./fetchAuthMe.js"
import { fetchRegistrationBuilder } from "./fetchRegistration.js"

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
    fetchRegistrationBuilder(builder)
  },
})
export const isAuthSelector = (state) => Boolean(state.auth.user)
export const getUser = (state) => state.auth.user?.userData

export const { signOut } = authSlice.actions

export const authReducer = authSlice.reducer