import { useState, useEffect } from "react"
import axios from "../API/API"

function useFetch<T>(url: string): { data: T | null; loading: boolean; error: string } {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError("")

    axios
      .get(url)
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
  }, [url])

  return { data, loading, error }
}

export default useFetch
