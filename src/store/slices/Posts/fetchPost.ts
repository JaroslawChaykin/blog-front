import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import { IPost, PostsAPI } from "../../../API/Posts/Posts.js"
import { PostState } from "./posts.ts"
import { StatusAPI } from "../../../types/enums/status.enum.ts"

export const fetchPosts = createAsyncThunk<IPost[]>("posts/fetchPosts", async () => {
  return await PostsAPI.getAllPosts()
})

export const fetchPostBuilder = (builder: ActionReducerMapBuilder<PostState>) => {
  builder.addCase(fetchPosts.pending, (state) => {
    state.posts.data = []
    state.posts.status = StatusAPI.LOADING
  })
  builder.addCase(fetchPosts.fulfilled, (state, action) => {
    state.posts.data = action.payload
    state.posts.status = StatusAPI.LOADED
  })
  builder.addCase(fetchPosts.rejected, (state) => {
    state.posts.data = []
    state.posts.status = StatusAPI.ERROR
  })
}
