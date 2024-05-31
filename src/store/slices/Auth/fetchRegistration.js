import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI } from "../../../API/Auth/Auth.js"

export const fetchRegistration = createAsyncThunk("auth/fetchRegistration", async (params) => {
  return await AuthAPI.registration(params)
})

export const fetchRegistrationBuilder = (builder) => {
  builder.addCase(fetchRegistration.pending, (state) => {
    state.user = null
    state.status = "loading"
  })
  builder.addCase(fetchRegistration.fulfilled, (state, action) => {
    state.user = action.payload
    state.status = "loaded"

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  })
  builder.addCase(fetchRegistration.rejected, (state) => {
    state.user = null
    state.status = "error"
  })
}