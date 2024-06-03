import { useState, useEffect } from "react"
import axios from "axios"

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading("loading...")
    setData(null)
    setError(null)

    const source = axios.CancelToken.source()

    axios.get(url, { cancelToken: source.token })
      .then(res => {
        setError(null)
        setData(res.data)
      })
      .catch(() => {
        setError("Bad request on endpoint: " + url)
      })
      .finally(() => {
        setLoading(false)
        setError(null)
      })

    return () => {
      source.cancel()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch