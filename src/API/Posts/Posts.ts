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
  isPublic: boolean
}

export type CreatePost = Omit<IPost, "viewsCount" | "user" | "_id" | "createdAt" | "updatedAt">

export type PostAPIMethods = {
  getAllPosts: () => Promise<IPost[]>
  getPostById: (id: string) => Promise<IPost>
  createPost: (data: CreatePost) => Promise<IPost>
  updatePost: (id: string, data: CreatePost) => Promise<IPost>
  deletePost: (id: string) => void
  updateStatusPublicPost: (
    id: string,
    data: { isPublic: boolean }
  ) => Promise<Pick<IPost, "isPublic">>
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
  updateStatusPublicPost: async (id, data) => {
    const { data: post } = await axios.patch(`/posts/${id}/public`, data)

    return post
  },
}
