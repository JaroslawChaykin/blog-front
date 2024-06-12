import axios from "../API"

export type UploadImageData = {
  url: string
}

export type UploadAPIMethods = {
  uploadImage: (file: File) => Promise<UploadImageData>
}

export const UploadAPI: UploadAPIMethods = {
  uploadImage: async (file) => {
    const formData = new FormData()
    formData.append("image", file)

    const { data } = await axios.post("/upload", formData)

    return data
  },
}
