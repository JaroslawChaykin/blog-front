import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI } from "../../../API/Auth/Auth.js"

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  return {
    data: await AuthAPI.getUserData(params),
    shouldRemember: params.shouldRemember,
  }
})

export const fetchAuthBuilder = (builder) => {
  builder.addCase(fetchAuth.pending, (state) => {
    state.user = null
    state.status = "loading"
  })
  builder.addCase(fetchAuth.fulfilled, (state, action) => {
    state.user = action.payload.data
    state.status = "loaded"

    if (!action.payload.shouldRemember) {
      sessionStorage.setItem("token", action.payload.data.token)
    }

    if (action.payload.data.token && action.payload.shouldRemember) {
      localStorage.setItem("token", action.payload.data.token)
    }
  })
  builder.addCase(fetchAuth.rejected, (state) => {
    state.user = null
    state.status = "error"
  })
}