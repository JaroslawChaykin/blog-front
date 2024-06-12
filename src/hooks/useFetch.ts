import { useState, useEffect } from "react"
import axios from "axios"

function useFetch<T>(url: string): { data: T | null; loading: boolean; error: string } {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError("")

    const source = axios.CancelToken.source()

    axios
      .get(url, { cancelToken: source.token })
      .then((res) => {
        setError("")
        setData(res.data)
      })
      .catch(() => {
        setError("Bad request on endpoint: " + url)
      })
      .finally(() => {
        setLoading(false)
        setError("")
      })

    return () => {
      source.cancel()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
