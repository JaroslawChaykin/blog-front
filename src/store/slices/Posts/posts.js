import { createSlice } from "@reduxjs/toolkit"
import { fetchPostBuilder } from "./fetchPost.js"

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
    fetchPostBuilder(builder)
  },
})

export const postsReducer = postsSlice.reducer