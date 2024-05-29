import { configureStore } from "@reduxjs/toolkit"
import { postsReducer } from "./slices/Posts/posts"
import { authReducer } from "./slices/Auth/auth.js"

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
})

export default store
