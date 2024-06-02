import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI } from "../../../API/Auth/Auth.js"

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  return await AuthAPI.getMe()
})

export const fetchAuthMeBuilder = (builder) => {
  builder.addCase(fetchAuthMe.pending, (state) => {
    state.user = null
    state.status = "loading"
  })
  builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
    state.user = { userData: action.payload }
    state.status = "loaded"
  })
  builder.addCase(fetchAuthMe.rejected, (state) => {
    state.user = null
    state.status = "error"
  })
}