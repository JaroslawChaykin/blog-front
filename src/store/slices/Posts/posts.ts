import { createSlice } from "@reduxjs/toolkit"
import { fetchPostBuilder } from "./fetchPost"
import { IPost, PostsAPI } from "../../../API/Posts/Posts"

export type PostState = {
  posts: {
    data: IPost[]
    status: "loading" | "loaded" | "error"
  }
}

const initialState: PostState = {
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
      state.posts.data = state.posts.data.filter((post) => post._id !== action.payload)
      PostsAPI.deletePost(action.payload)
    },
  },
  extraReducers: (builder) => {
    fetchPostBuilder(builder)
  },
})

export const { deletePost } = postsSlice.actions

export const postsReducer = postsSlice.reducer
