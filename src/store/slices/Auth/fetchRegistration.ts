import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI, IUser, RegistrationPropsTypes } from "../../../API/Auth/Auth"
import { AuthUser } from "./auth.ts"
import { StatusAPI } from "../../../types/enums/status.enum.ts"

export const fetchRegistration = createAsyncThunk<IUser, RegistrationPropsTypes>(
  "auth/fetchRegistration",
  async (params) => {
    return await AuthAPI.registration(params)
  }
)

export const fetchRegistrationBuilder = (builder: ActionReducerMapBuilder<AuthUser>) => {
  builder.addCase(fetchRegistration.pending, (state) => {
    state.user = null
    state.status = StatusAPI.LOADING
  })
  builder.addCase(fetchRegistration.fulfilled, (state, action) => {
    state.user = action.payload
    state.status = StatusAPI.LOADED

    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  })
  builder.addCase(fetchRegistration.rejected, (state) => {
    state.user = null
    state.status = StatusAPI.ERROR
  })
}
