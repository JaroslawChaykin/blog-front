import useFetch from "../../../hooks/useFetch.js"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useIsOwner } from "../../../hooks/useIsOwner.js"

const FullPost = () => {
  const params = useParams()
  const { data, loading, error } = useFetch("http://localhost:4444/posts/" + params.id)
  const isOwner = useIsOwner(data?.user?._id)

  if (error || !data) {
    return <p>Error</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <p>Full post {isOwner ? "owner" : ""}</p>

      <h1>{data.title}</h1>

      <ReactMarkdown>{data.text}</ReactMarkdown>
    </div>
  )
}

export default FullPost