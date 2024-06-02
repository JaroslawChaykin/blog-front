import { createSlice } from "@reduxjs/toolkit"
import { fetchPostBuilder } from "./fetchPost.js"
import { PostsAPI } from "../../../API/Posts/Posts.js"

const initialState = {
  posts: {
    data: [],
    status: "loading",
  },
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost(state, action) {
      state.posts.data = state.posts.data.filter(post => post._id !== action.payload)
      PostsAPI.deletePost(action.payload)
    },
  },
  extraReducers: (builder) => {
    fetchPostBuilder(builder)
  },
})

export const { deletePost } = postsSlice.actions

export const postsReducer = postsSlice.reducer