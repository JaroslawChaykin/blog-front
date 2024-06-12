import { configureStore } from "@reduxjs/toolkit"
import { postsReducer } from "./slices/Posts/posts"
import { authReducer } from "./slices/Auth/auth"

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
