import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { PostsAPI } from "../../API/Posts/Posts.js"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await PostsAPI.getAllPosts()
})

const initialState = {
  posts: {
    data: [],
    status: "loading",
  },
  tags: {
    data: [],
    status: "loading",
  },
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, payload) => {
      state.posts.data = []
      state.posts.status = "loading"
    })
    builder.addCase(fetchPosts.fulfilled, (state, action, payload) => {
      state.posts.data = action.payload
      state.posts.status = "loaded"
    })
    builder.addCase(fetchPosts.rejected, (state, payload) => {
      state.posts.data = []
      state.posts.status = "error"
    })
  },
})

export const postsReducer = postsSlice.reducer