import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI } from "../../../API/Auth/Auth.js"

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  return await AuthAPI.getUserData(params)
})

export const fetchAuthBuilder = (builder) => {
  builder.addCase(fetchAuth.pending, (state) => {
    state.user = null
    state.status = "loading"
  })
  builder.addCase(fetchAuth.fulfilled, (state, action) => {
    state.user = action.payload
    state.status = "loaded"

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  })
  builder.addCase(fetchAuth.rejected, (state) => {
    state.user = null
    state.status = "error"
  })
}