import { createSlice } from "@reduxjs/toolkit"
import { fetchPostBuilder } from "./fetchPost"
import { IPost, PostsAPI } from "../../../API/Posts/Posts"
import { StatusAPI } from "../../../types/enums/status.enum.ts"
import { RootState } from "../../store"

export type PostState = {
  posts: {
    data: IPost[]
    status: StatusAPI
  }
}

const initialState: PostState = {
  posts: {
    data: [],
    status: StatusAPI.LOADING,
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

export const getPosts = (state: RootState) => state.posts.posts.data
export const getPostsStatus = (state: RootState) => state.posts.posts.status

export const { deletePost } = postsSlice.actions

export const postsReducer = postsSlice.reducer
