import { createAsyncThunk } from "@reduxjs/toolkit"
import { PostsAPI } from "../../../API/Posts/Posts.js"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await PostsAPI.getAllPosts()
})

export const fetchPostBuilder = (builder) => {
  builder.addCase(fetchPosts.pending, (state) => {
    state.posts.data = []
    state.posts.status = "loading"
  })
  builder.addCase(fetchPosts.fulfilled, (state, action) => {
    state.posts.data = action.payload
    state.posts.status = "loaded"
  })
  builder.addCase(fetchPosts.rejected, (state) => {
    state.posts.data = []
    state.posts.status = "error"
  })
}