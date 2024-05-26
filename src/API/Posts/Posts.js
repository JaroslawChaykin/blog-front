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
}