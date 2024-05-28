import useFetch from "../../../hooks/useFetch.js"
import { useParams } from "react-router-dom"

const FullPost = () => {
  const params = useParams()
  const { data, loading, error } = useFetch("http://localhost:4444/posts/" + params.id)

  if (error) {
    return <p>Error</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      Full post

      {JSON.stringify(data)}
    </div>
  )
}

export default FullPost