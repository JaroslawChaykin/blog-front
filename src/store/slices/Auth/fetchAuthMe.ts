import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI, IUserData } from "../../../API/Auth/Auth"
import { AuthUserMe } from "./auth"
import { StatusAPI } from "../../../types/enums/status.enum.ts"

export const fetchAuthMe = createAsyncThunk<IUserData, void>("auth/fetchAuthMe", async () => {
  return await AuthAPI.getMe()
})

export const fetchAuthMeBuilder = (builder: ActionReducerMapBuilder<AuthUserMe>) => {
  builder.addCase(fetchAuthMe.pending, (state) => {
    state.user = null
    state.status = StatusAPI.LOADING
  })
  builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
    state.user = { userData: action.payload }
    state.status = StatusAPI.LOADED
  })
  builder.addCase(fetchAuthMe.rejected, (state) => {
    state.user = null
    state.status = StatusAPI.ERROR
  })
}
