import axios from "../API"
import { IUserData } from "../Auth/Auth"

export interface IPost {
  _id: string
  title: string
  text: string
  tags: string[]
  viewsCount: number
  user: IUserData
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export type CreatePost = Omit<IPost, "viewsCount" | "user" | "_id">

export type PostAPIMethods = {
  getAllPosts: () => Promise<IPost[]>
  getPostById: (id: string) => Promise<IPost>
  createPost: (data: CreatePost) => Promise<IPost>
  updatePost: (id: string, data: CreatePost) => Promise<IPost>
  deletePost: (id: string) => void
}

export const PostsAPI: PostAPIMethods = {
  getAllPosts: async () => {
    const { data } = await axios.get("/posts")

    return data
  },
  getPostById: async (id) => {
    const { data } = await axios.get("/posts/" + id)

    return data
  },
  createPost: async (data) => {
    const { data: post } = await axios.post("/posts", data)

    return post
  },
  updatePost: async (id, data) => {
    const { data: post } = await axios.patch(`/posts/${id}`, data)

    return post
  },
  deletePost: async (id) => {
    await axios.delete("/posts/" + id)
  },
}
