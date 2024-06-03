import axios from "../API"

export const PostsAPI = {
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