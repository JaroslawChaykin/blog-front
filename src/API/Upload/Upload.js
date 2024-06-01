import axios from "../API"

export const UploadAPI = {
  uploadImage: async (file) => {
    const formData = new FormData()
    formData.append("image", file)

    const { data } = await axios.post("/upload", formData)

    return data
  },
}