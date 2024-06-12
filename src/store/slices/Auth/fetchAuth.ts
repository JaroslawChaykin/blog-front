import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI, IUser, LoginPropsTypes } from "../../../API/Auth/Auth"
import { AuthUser } from "./auth.ts"

interface fetchAuthPropsTypes extends LoginPropsTypes {
  shouldRemember: boolean
}

type fetchAuthReturn = {
  data: IUser
  shouldRemember: boolean
}

export const fetchAuth = createAsyncThunk<fetchAuthReturn, fetchAuthPropsTypes>(
  "auth/fetchAuth",
  async (params) => {
    const { shouldRemember, ...userData } = params

    return {
      data: await AuthAPI.getUserData(userData),
      shouldRemember,
    }
  }
)

export const fetchAuthBuilder = (builder: ActionReducerMapBuilder<AuthUser>) => {
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
